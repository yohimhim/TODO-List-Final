import { effect, inject, Injectable, signal } from "@angular/core";
import { NewTaskData, Task } from "./task/task.model";
import { AuthService } from "../oauth.service";

@Injectable({providedIn: 'root'})
export class TasksService {
  private authService = inject(AuthService);

  private tasks = signal<Task[]>([]);

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

  addTask(taskData: NewTaskData) {
    const user = this.authService.userProfile();
    const userEmail = user?.info.email;
    if (!userEmail) return;

    const newTask: Task = {
        id: Math.random().toString(),
        ...taskData,
        userId: userEmail
    };

    this.tasks.update(tasks => [...tasks, newTask]);
    this.saveTasks();
  }

  editTask(taskId: string, taskData: NewTaskData) {
    this.tasks.update(tasks => 
      tasks.map(task =>
        task.id === taskId ? { ...task, ...taskData } : task
      )
    )
    this.saveTasks();
  };

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

}