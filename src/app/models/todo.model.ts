import { FormControl } from '@angular/forms'

export interface Todo {
  id: string
  title: string
  description: string
  severity: number
}

export type NewTodo = Omit<Todo, 'id'>

export interface NewTodoForm {
  title: FormControl<string | null>
  description: FormControl<string | null>
  severity: FormControl<number | null>
}
