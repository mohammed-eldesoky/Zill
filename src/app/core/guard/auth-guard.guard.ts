import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';


export const authGuardGuard: CanActivateChildFn = (childRoute, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (childRoute.routeConfig?.path === 'send/:nickName') {
    return true;
  }

  
  if (auth.isLoggedIn()) {
    return true;
  }


  router.navigate(['/login']);
  return false;
};
