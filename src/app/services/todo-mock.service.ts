import { Injectable } from '@angular/core'
import { delay, Observable, of } from 'rxjs'
import { Todo } from '../models/todo.model'

@Injectable({
  providedIn: 'root'
})
export class TodoMockService {
  getTodos (): Observable<Todo[]> {
    const todos: Todo[] = [
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

    return of(todos).pipe(delay(2000))
  }
}
