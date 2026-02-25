import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { LayoutModule, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule,
    MatIconModule, MatSidenavModule, LayoutModule],
  templateUrl: './navbar.component.html'
})

export class NavbarComponent {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  isMobile = false;

  constructor(
    public authService: AuthService,
    private observer: BreakpointObserver
  ) {
    this.observer.observe(['(max-width: 768px)'])
      .subscribe(result => {
        this.isMobile = result.matches;
      });
  }

  toggleMenu() {
    this.sidenav.toggle();
  }

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
