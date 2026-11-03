
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth';
import { map, take } from 'rxjs';

export const adminAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.usuario$.pipe(
    take(1),
    map(usuario => {
      if (usuario && authService.esAdministrador(usuario.uid)) {
        return true;
      }

      return router.createUrlTree(['/admin/login']);
    })
  );
};
