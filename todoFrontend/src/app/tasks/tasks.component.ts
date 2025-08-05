import { Component, computed, inject } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { TasksService } from './tasks.service';
import { AuthService } from '../oauth.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  private taskService = inject(TasksService);
  private authService = inject(AuthService);

  isAddingTask = false;

  tasks = this.taskService.getTasks;
  userProfile = this.authService.userProfile;

  userTasks = computed(() => {
    const user = this.userProfile();
    console.log(user);
    if (!user) return [];

    return this.tasks().filter(task => task.userId === user.info.email);
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
