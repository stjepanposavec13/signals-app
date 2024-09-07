import { Component, inject, OnDestroy } from '@angular/core'
import { TodoListComponent } from '../../presentation/todo-list/todo-list.component'
import { TodoStore } from '../../store/todo.store'
import { MatDialog } from '@angular/material/dialog'
import { AddNewTodoDialogComponent } from '../../presentation/add-new-todo-dialog/add-new-todo-dialog.component'
import { filter, Subject, takeUntil, tap } from 'rxjs'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [TodoListComponent, MatButtonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  providers: [TodoStore]
})
export class TodoComponent implements OnDestroy {
  public readonly todoStore = inject(TodoStore)
  private readonly dialogService = inject(MatDialog)

  private unsubscribe$ = new Subject<void>()

  addNewTodo () {
    this.dialogService
      .open(AddNewTodoDialogComponent)
      .afterClosed()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(data => !!data),
        tap(data => this.todoStore.addTodo(data))
      )
      .subscribe()
  }

  removeTodo (id: string) {
    this.todoStore.removeTodo(id)
  }

  ngOnDestroy (): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
