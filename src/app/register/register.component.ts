import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  username = '';
  password = '';
  message = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {
    const credentials = {
      username: this.username,
      password: this.password
    };

    this.authService.register(credentials)
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.message = err.error;
        }
      });
  }
}