import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState
} from '@ngrx/signals'
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { NewTodo, Todo } from '../models/todo.model'
import { computed, inject } from '@angular/core'
import { TodoMockService } from '../services/todo-mock.service'
import { pipe, switchMap, tap } from 'rxjs'
import { tapResponse } from '@ngrx/operators'

type TodoState = {
  todos: Todo[]
  isLoading: boolean
}

const initialState: TodoState = {
  todos: [],
  isLoading: false
}

export const TodoStore = signalStore(
  //   { providedIn: 'root' },
  withState(initialState),
  withComputed(store => ({
    todosCount: computed(() => store.todos().length)
  })),
  withMethods((store, todoService = inject(TodoMockService)) => ({
    addTodo (todo: NewTodo) {
      const newTodo: Todo = {
        ...todo,
        id: crypto.randomUUID()
      }
      const updatedTodos = [...store.todos(), newTodo]
      patchState(store, { todos: updatedTodos })
    },
    removeTodo (id: string) {
      const updatedTodos = store.todos().filter(todo => todo.id !== id)
      patchState(store, { todos: updatedTodos })
    },
    fetchTodos: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() =>
          todoService.getTodos().pipe(
            tapResponse({
              next: todos => patchState(store, { todos, isLoading: false }),
              error: error => {
                patchState(store, { isLoading: false }), console.error(error)
              }
            })
          )
        )
      )
    )
  })),
  withHooks({
    onInit (store) {
      store.fetchTodos()
    }
  })
)
