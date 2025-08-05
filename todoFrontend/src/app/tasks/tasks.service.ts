import { DestroyRef, effect, inject, Injectable, signal } from "@angular/core";
import { AuthService } from "../oauth.service";
import { NewTaskData, Task } from "./task.model";
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class TasksService {
  private authService = inject(AuthService);
  private tasks = signal<Task[]>([]);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  constructor() {
    const localTasks = localStorage.getItem('tasks'); //loads previous tasks stored in localStorage

    if (localTasks) {
      try {
        this.tasks.set(JSON.parse(localTasks));
      } catch (err) {
        console.log('cannot parse from local storage...');
      }
    }

    effect(() => {
      localStorage.setItem('tasks', JSON.stringify(this.tasks())); //saves task to localStorage as JSON string
    });

  }

  getTasks = this.tasks.asReadonly();

  removeTask(id: string) {
    this.tasks.update(tasks => tasks.filter(task => task.id != id));
    this.saveTasks();
  }

  addTask(task: NewTaskData) {
    return this.httpClient.post<Task>('http://localhost:8080/newTask', task);
  }

  editTask(task: Task) {
    return this.httpClient.put<Task>(`http://localhost:8080/task/${task.id}`, task)
  }

  updateTaskStatus(taskId: string) {
    this.tasks.update(tasks => 
      tasks.map(task =>
        task.id === taskId ? { 
          ...task,
          status: task.status === 'COMPLETED' ? 'OPEN' : 'COMPLETED'
        } : task 
      )
    );
    this.saveTasks();
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }

  loadAvailableTasks() {
    return this.fetchTasks('http://localhost:8080/tasks', 'Something went wrong fetching your tasks...');
  }

  private fetchTasks(url: string, errorMessage: string) {
    return this.httpClient
    .get< Task[] >(url)
    .pipe(
      catchError((error) => {
        console.log(error);
        return throwError(
          () => 
            new Error(errorMessage)
        );
      })
    )
  }

}