import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { TasksService } from '../tasks.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Task, TaskStatus } from '../task.model';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [EditTaskComponent, DatePipe, CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
    @Input({ required: true }) task!: Task;
    @Output() delete = new EventEmitter<string>();

    isEditingTask = false;

    private tasksService = inject(TasksService);

    onCompleteTask() {
      const updatedTask = {
        ...this.task,
        status: this.task.status === 'COMPLETED' ? 'OPEN' : 'COMPLETED' as TaskStatus
      };
            console.log(this.task.status);


      this.tasksService.editTask(updatedTask).subscribe({
        error: (err) => {
          console.error('Failed to complete task:', err);
        }
      });
    }

    onDeleteTask() {
      this.delete.emit(this.task.id?.toString());
    }

    onEditTask() {
      this.isEditingTask = true;
    }

    onCancelEdit() {
      this.isEditingTask = false;
    }

    onSaveEdit(updatedTask: Task) {
      this.tasksService.editTask(updatedTask).subscribe({
        next: () => {
          this.isEditingTask = false;
        },
        error: (err) => {
          console.error('Failed to update task:', err);
        }

      });
    }
}