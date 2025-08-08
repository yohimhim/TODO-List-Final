import { DestroyRef, effect, inject, Injectable, signal } from "@angular/core";
import { AuthService } from "../oauth.service";
import { NewTaskData, Task } from "./task.model";
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class TasksService {
  private authService = inject(AuthService);
  private tasks = signal<Task[]>([]);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  loadedTasks = this.tasks.asReadonly();

  constructor() {

  }

  getTasks = this.tasks.asReadonly();

  removeTask(id: string) {
    return this.httpClient.delete(
      `http://localhost:8080/task/${id}`, 
      this.getAuthHeaders()
    ).pipe(
      tap(() => {
        this.tasks.update(tasks => tasks.filter(task => task.id?.toString() !== id));
      }),
      catchError((error) => {
        console.error('Failed to delete task:', error);
        return throwError(() => new Error('Could not delete task'));
      })
    );
  }

  addTask(taskData: NewTaskData) {
  const user = this.authService.userProfile();

  if (!user) return;

  const newTask: Task = {
    ...taskData,
    userId: user.info.sub 
  };

  return this.httpClient.post<Task>(
    'http://localhost:8080/newTask',
    newTask,
    this.getAuthHeaders()
  ).pipe(
    tap((createdTask) => {
      this.tasks.update(prev => [...prev, createdTask]);
    }),
    catchError((error) => {
      console.error('Failed to add task:', error);
      return throwError(() => new Error('Could not create task'));
    })
  );
}



  editTask(task: Task) {
    return this.httpClient.put<Task>(
      `http://localhost:8080/task/${task.id}`, 
      task,
      this.getAuthHeaders()
    ).pipe(
      tap((updatedTask) => {
        this.tasks.update(prevTasks =>
          prevTasks.map(t =>
            t.id === updatedTask.id ? updatedTask : t
          )
        );
      }),
      catchError((error) => {
        console.error('Failed to update task:', error);
        return throwError(() => new Error('Could not update task'));
      })
    );
  }

  loadAvailableTasks() {
    return this.fetchTasks('http://localhost:8080/tasks', 'Something went wrong fetching your tasks...')
    .pipe(tap({
      next: (tasks) => this.tasks.set(tasks)
    }))
    ;
  }

  private fetchTasks(url: string, errorMessage: string) {
  return this.httpClient
    .get<Task[]>(url, this.getAuthHeaders()) 
    .pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }


  private getAuthHeaders() {
  const token = this.authService.idToken; 
  console.log('Using ID Token in header:', token);
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
}

}