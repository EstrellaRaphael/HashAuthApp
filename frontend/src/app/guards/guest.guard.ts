import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isAuthenticated = !!localStorage.getItem('auth');

  if (isAuthenticated) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
