import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(private api: ApiService) {
    this.api.getHash('naoexiste@email.com').subscribe({
      next: (res) => console.log('API funcionando:', res),
      error: (err) => console.log('Erro da API:', err)
    });
  }
}
