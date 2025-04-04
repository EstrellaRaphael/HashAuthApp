import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-validate',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './validate.component.html',
  styleUrl: './validate.component.css',
  standalone: true,
})
export class ValidateComponent {
  form!: FormGroup;
  showPassword = false;

  message: string | null = null;
  error: boolean = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    this.api.validate({ email, password }).subscribe({
      next: (res) => {
        this.message = res.message;
        this.error = false;
        this.form.reset();
      },
      error: (err) => {
        this.message = err.error?.message || 'Erro na validação.';
        this.error = true;
      },
    });
  }
}
