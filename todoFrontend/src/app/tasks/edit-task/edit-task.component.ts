import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TasksService } from '../tasks.service';
import { FormsModule } from '@angular/forms';
import { Task } from '../task.model';



@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent {
    @Input({ required: true }) task!: Task;

    @Output() cancel = new EventEmitter<void>();
    @Output() save = new EventEmitter<string>();

    enteredTitle='';
    enteredSummary='';
    enteredDate='';
      
    private tasksService = inject(TasksService);

    //getting prexisting data
    ngOnInit() {
      this.enteredTitle = this.task.title;
      this.enteredSummary = this.task.summary;
      this.enteredDate = this.task.dueDate;
    }

    onSave() {
      this.tasksService.editTask(this.task.id, {
        title: this.enteredTitle,
        summary: this.enteredSummary,
        dueDate: this.enteredDate
      })
      this.cancel.emit();
    }

    onCancel() {
        this.cancel.emit();
    }
}