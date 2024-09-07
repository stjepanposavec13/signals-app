import {
  Component,
  computed,
  inject,
  OnDestroy,
  Signal,
  signal,
  WritableSignal
} from '@angular/core'
import { TodoListComponent } from '../../presentation/todo-list/todo-list.component'
import { MatDialog } from '@angular/material/dialog'
import { AddNewTodoDialogComponent } from '../../presentation/add-new-todo-dialog/add-new-todo-dialog.component'
import { filter, Subject, takeUntil, tap } from 'rxjs'
import { MatButtonModule } from '@angular/material/button'
import { Todo } from '../../models/todo.model'

const INITIAL_TODOS = [
  {
    id: '1',
    title: 'First todo',
    description: 'This is first todo',
    severity: 4
  },
  {
    id: '2',
    title: 'Second todo',
    description: 'This is second todo',
    severity: 2
  },
  {
    id: '3',
    title: 'Third todo',
    description: 'This is third todo',
    severity: 4
  },
  {
    id: '4',
    title: 'Fourth todo',
    description: 'This is fourth todo',
    severity: 1
  }
]

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [TodoListComponent, MatButtonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnDestroy {
  todos: WritableSignal<Todo[]> = signal(INITIAL_TODOS)
  todosCounter: Signal<number> = computed(() => {
    // console.log('counter Signal')

    return this.todos().length
  })
  // get todosCounterNormal () {
  //   console.log('counter Normal')

  //   return this.todos().length
  // }

  private readonly dialogService = inject(MatDialog)

  private unsubscribe$ = new Subject<void>()

  addNewTodo () {
    this.dialogService
      .open(AddNewTodoDialogComponent)
      .afterClosed()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(data => !!data),
        tap(newTodo => this.todos.update(todos => [...todos, newTodo]))
      )
      .subscribe()
  }

  removeTodo (id: string) {
    this.todos.update(todos => todos.filter(todo => todo.id !== id))
  }

  ngOnDestroy (): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
