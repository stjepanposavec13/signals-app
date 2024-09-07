import { Component } from '@angular/core'
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { NewTodoForm } from '../../models/todo.model'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-add-new-todo-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './add-new-todo-dialog.component.html',
  styleUrl: './add-new-todo-dialog.component.scss'
})
export class AddNewTodoDialogComponent {
  public formGroup: FormGroup<NewTodoForm> = new FormGroup<NewTodoForm>({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    severity: new FormControl(0, Validators.required)
  })
}
