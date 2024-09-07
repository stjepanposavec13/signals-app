import { Component, inject, OnDestroy } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { AddNewBookDialogComponent } from '../../presentation/add-new-book-dialog/add-new-book-dialog.component'
import { Subject, takeUntil } from 'rxjs'
import { BookListComponent } from '../../presentation/book-list/book-list.component'
import { BookSearchComponent } from '../../presentation/book-search/book-search.component'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [BookListComponent, BookSearchComponent, MatButtonModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnDestroy {
  private readonly dialogService = inject(MatDialog)

  private unsubscribe$ = new Subject<void>()

  addNewTodo () {
    this.dialogService
      .open(AddNewBookDialogComponent)
      .afterClosed()
      .pipe(
        takeUntil(this.unsubscribe$)
        // Add new book to store
      )
      .subscribe()
  }

  removeBook (id: string) {
    // Remove book from store
  }

  bookSearch (searchValue: string | null) {
    // Search for book
  }

  ngOnDestroy (): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
