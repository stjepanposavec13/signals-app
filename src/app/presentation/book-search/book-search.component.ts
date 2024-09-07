import { Component, OnDestroy, OnInit, output, Output } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  takeUntil,
  tap
} from 'rxjs'

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.scss'
})
export class BookSearchComponent implements OnInit, OnDestroy {
  searchValueChanged = output<string | null>()

  searchValue = new FormControl('')

  valueChanges$ = this.searchValue.valueChanges.pipe(
    distinctUntilChanged(),
    debounceTime(500),
    tap(value => this.searchValueChanged.emit(value))
  )

  unsubscribe$ = new Subject<void>()

  ngOnInit (): void {
    this.valueChanges$.pipe(takeUntil(this.unsubscribe$)).subscribe()
  }

  ngOnDestroy (): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
