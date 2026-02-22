import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {

    const authService = inject(AuthService);
    const router = inject(Router);

    const role = authService.getRole();

    if (authService.isAuthenticated() && role === 'Admin') {
        return true;
    }

    router.navigate(['/courses']);
    return false;
};