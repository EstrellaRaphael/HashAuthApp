import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
})
export class LoginComponent {
  form: FormGroup;
  showPassword = false;
  message = '';
  error = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    this.api.validate({ email, password }).subscribe({
      next: (res) => {
        this.message = res.message;
        this.error = false;

        this.snackBar.open(res.message, 'Fechar', {
          duration: 4000,
          panelClass: ['snackbar-success'],
        });

        // Simular redirecionamento pós-login
        if (res.message === 'Senha correta') {
          this.router.navigate(['/dashboard']);
        }

        this.form.reset();
      },
      error: (err) => {
        this.error = true;
        this.message = err.error?.message || 'Erro no login';

        this.snackBar.open(this.message, 'Fechar', {
          duration: 4000,
          panelClass: ['snackbar-error'],
        });
      },
    });
  }
}
