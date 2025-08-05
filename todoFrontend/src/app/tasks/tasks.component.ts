import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { TasksService } from './tasks.service';
import { AuthService } from '../oauth.service';
import { Task } from './task.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit{
  private taskService = inject(TasksService);
  private authService = inject(AuthService);

  tasks = signal<Task[] | undefined>(undefined);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    const subscription = this.httpClient
    .get< Task[] >('http://localhost:8080/tasks')
    .subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
        console.log(tasks);
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }


  isAddingTask = false;

  tasks1 = this.taskService.getTasks;
  userProfile = this.authService.userProfile;

  userTasks = computed(() => {
    const user = this.userProfile();
    console.log(user);
    if (!user) return [];

    return this.tasks1().filter(task => task.userId === user.info.email);
  });

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCancelAddTask() {
    this.isAddingTask = false;
  }
  
  onDeleteTask(id: string) {
    return this.taskService.removeTask(id);
  }

}
