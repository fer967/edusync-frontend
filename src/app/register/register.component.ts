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

  if (!this.username || !this.password) {
    this.message = 'Todos los campos son obligatorios';
    return;
  }

  if (this.password.length < 6) {
    this.message = 'La contraseña debe tener al menos 6 caracteres';
    return;
  }

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


// if (!Regex.IsMatch(request.Password, @"^(?=.*[A-Z])(?=.*\d).{6,}$"))
//     return BadRequest("La contraseña debe tener al menos 6 caracteres, una mayúscula y un número");


