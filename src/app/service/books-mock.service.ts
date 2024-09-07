import { Injectable } from '@angular/core'
import { delay, Observable, of } from 'rxjs'
import { Book } from '../models/book.model'

@Injectable({
  providedIn: 'root'
})
export class BooksMockService {
  getBooks (): Observable<Book[]> {
    const books: Book[] = [
      {
        id: '1',
        title: 'First book',
        author: 'John Doe',
        genre: 'Crime'
      },
      {
        id: '2',
        title: 'Second book',
        author: 'Albert Einstein',
        genre: 'Biography'
      },
      {
        id: '3',
        title: 'Third Book',
        author: 'J. R. Tolkien',
        genre: 'Fantasy'
      }
    ]

    return of(books).pipe(delay(2000))
  }
}
