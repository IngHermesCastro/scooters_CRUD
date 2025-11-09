import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar si está autenticado
  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  // Obtener rol requerido desde la configuración de la ruta
  const requiredRole = route.data['role'] as string;
  const currentUser = authService.getCurrentUser();

  // Verificar si el usuario tiene el rol requerido
  if (currentUser && currentUser.role === requiredRole) {
    return true;
  }

  // Si no tiene permisos, redirigir según el rol
  if (currentUser?.role === 'admin') {
    router.navigate(['/admin/dashboard']);
  } else if (currentUser?.role === 'alumno') {
    router.navigate(['/student/my-courses']);
  } else {
    router.navigate(['/login']);
  }

  return false;
};
