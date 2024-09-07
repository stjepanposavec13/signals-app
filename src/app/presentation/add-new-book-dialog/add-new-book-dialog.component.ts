import { Component } from '@angular/core'
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { NewBookForm } from '../../models/book.model'

@Component({
  selector: 'app-add-new-book-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './add-new-book-dialog.component.html',
  styleUrl: './add-new-book-dialog.component.scss'
})
export class AddNewBookDialogComponent {
  public formGroup: FormGroup<NewBookForm> = new FormGroup<NewBookForm>({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    genre: new FormControl('', Validators.required)
  })
}
