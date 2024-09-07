import { Component, input, output } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button'
import { Book } from '../../models/book.model'

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [MatIconModule, MatTableModule, MatButtonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {
  public books = input.required<Book[]>()
  public removeBook = output<string>()

  displayedColumns: string[] = ['title', 'author', 'genre', 'options']
}
