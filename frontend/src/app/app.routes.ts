import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { ValidateComponent } from './components/validate/validate.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'validate', component: ValidateComponent },
  { path: '', redirectTo: 'register', pathMatch: 'full' },
];
