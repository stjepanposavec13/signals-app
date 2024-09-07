import { Component, input, output } from '@angular/core'
import { Todo } from '../../models/todo.model'
import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [MatIconModule, MatTableModule, MatButtonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  public todos = input.required<Todo[]>()
  public removeTodo = output<string>()

  displayedColumns: string[] = ['title', 'description', 'severity', 'options']
}
