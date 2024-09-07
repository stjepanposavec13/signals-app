import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { TodoComponent } from './container/todo/todo.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
