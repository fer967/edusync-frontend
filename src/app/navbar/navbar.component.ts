import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }

  getUsername(): string | null {
    const token = this.authService.getToken();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  }
}
