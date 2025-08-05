import { Component, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { TasksComponent } from "./tasks/tasks.component";
import { AuthService } from './oauth.service';


@Component({
  selector: 'app-root',
  imports: [HeaderComponent, TasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  protected readonly title = signal('TODO-APP');

  constructor(private readonly google: AuthService) {}

}
