import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, UserRole } from './auth';

/**
 * Bloqueia o acesso à rota se o usuário não estiver logado.
 * Use direto em canActivate, ou combine com data: { role: 'cliente' | 'frentista' }
 * para também restringir por tipo de usuário.
 *
 * Exemplo no app.routes.ts:
 *
 * {
 *   path: 'cliente',
 *   component: ClientePainelComponent,
 *   canActivate: [authGuard],
 *   data: { role: 'cliente' }
 * },
 * {
 *   path: 'frentista',
 *   component: FrentistaPainelComponent,
 *   canActivate: [authGuard],
 *   data: { role: 'frentista' }
 * }
 */
export const authGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }

  const requiredRole = route.data?.['role'] as UserRole | undefined;
  if (requiredRole && auth.currentRole !== requiredRole) {
    // Usuário logado, mas tentando acessar a área de outro papel.
    router.navigate(['/' + auth.currentRole]);
    return false;
  }

  return true;
};