import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const toastrService = inject(ToastrService);
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    return true;
  }
  else{
    toastrService.info("Sisteme giriş yapmalısınız");
    router.navigate(["login"]);
    return false
  }
};
