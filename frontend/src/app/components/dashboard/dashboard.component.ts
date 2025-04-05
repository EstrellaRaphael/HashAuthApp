import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  email: string | null = null;
  hash: string | null = null;
  message: string | null = null;

  showHash = false;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.email = localStorage.getItem('auth');
    if (!this.email) {
      this.router.navigate(['/login']);
      return;
    }

    this.api.getHash(this.email).subscribe({
      next: (res) => {
        this.hash = res.hash ?? null;
        this.message = null;
      },
      error: (err) => {
        this.hash = null;
        this.message = err.error?.message || 'Erro ao consultar o hash.';
      },
    });
  }

  toggleHash(): void {
    this.showHash = !this.showHash;
  }

  logout(): void {
    localStorage.removeItem('auth');
    this.router.navigate(['/login']);
  }
}
