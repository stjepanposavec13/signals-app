import { FormControl } from '@angular/forms'

export interface Book {
  id: string
  title: string
  author: string
  genre: string
}

export type NewBook = Omit<Book, 'id'>

export interface NewBookForm {
  title: FormControl<string | null>
  author: FormControl<string | null>
  genre: FormControl<string | null>
}
