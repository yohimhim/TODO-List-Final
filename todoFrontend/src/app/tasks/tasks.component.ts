import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit{
  private taskService = inject(TasksService);
  isAddingTask = false;
  error = signal('');
  private destroyRef = inject(DestroyRef);
  tasks = this.taskService.loadedTasks;

  ngOnInit() {
    const subscription = this.taskService.loadAvailableTasks().subscribe({
      error: (error: Error) => {
        this.error.set(error.message);
      }
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  
  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCancelAddTask() {
    this.isAddingTask = false;
  }
  
  onDeleteTask(id: string) {
    this.taskService.removeTask(id).subscribe({
      next: () => {
        console.log('Task deleted successfully');
      },
      error: (err) => {
        console.error('Delete failed:', err);
      }
    });  
  }

}
