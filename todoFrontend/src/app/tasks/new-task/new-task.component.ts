import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { AuthService } from '../../oauth.service';
import { NewTaskData } from '../task.model';


@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
    @Output() cancel = new EventEmitter<void>();
    @Output() add = new EventEmitter<string>();

    enteredTitle='';
    enteredSummary='';
    enteredDate='';
    private tasksService = inject(TasksService);
    private authService = inject(AuthService);

    onSubmit() {
      const user = this.authService.userProfile();

      if (!user) {
        console.error('User not logged in');
        return;
      }

      const newTask: NewTaskData = {
        title: this.enteredTitle,
        summary: this.enteredSummary,
        dueDate: new Date(this.enteredDate).toISOString(),
        status: 'OPEN',
        userId: user.info.sub 
      };

      this.tasksService.addTask(newTask)?.subscribe({
        next: () => {
          this.cancel.emit();
        },
        error: (err) => {
          console.error('Failed to add task:', err);
        }
      });
    }

    onCancel() {
        this.cancel.emit();
    }
}