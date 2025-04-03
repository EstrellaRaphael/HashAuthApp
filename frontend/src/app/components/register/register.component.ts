import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService, AuthRequest } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true,
})
export class RegisterComponent {
  form: FormGroup;
  message: string | null = null;
  error: boolean = false;

  constructor(private fb: FormBuilder, private api: ApiService) {
    // vai inicializar o formulário com as validações
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,}$'
          ),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const data: AuthRequest = this.form.value;
    this.api.register(data).subscribe({
      next: (res) => {
        this.message = res.message;
        this.error = false;
        this.form.reset();
      },
      error: (err) => {
        this.message = err.message || 'Erro desconhecido';
        this.error = true;
      },
    });
  }
}
