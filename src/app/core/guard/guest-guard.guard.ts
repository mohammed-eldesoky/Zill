import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';


export const guestGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);


  if (auth.isLoggedIn()) {
    router.navigate(['/app']);
    return false;
  }


  return true;
};
