import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  constructor(private api: ApiService) {
    // teste rápido para ver se o serviço está ok
    this.api.getHash('naoexiste@email.com').subscribe({
      next: (res) => console.log('API funcionando:', res),
      error: (err) => console.log('Erro da API:', err)
    });
  }
}
