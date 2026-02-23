import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  username = '';
  password = '';
  message = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login() {

  if (!this.username || !this.password) {
    this.message = 'Todos los campos son obligatorios';
    return;
  }

  this.authService.login({
    username: this.username,
    password: this.password
  })
  .subscribe({
    next: (response) => {
      this.authService.saveToken(response.token);
      this.router.navigate(['/courses']);
    },
    error: (err) => {
      if (err.status === 401) {
        this.message = 'Usuario o contraseña incorrectos';
      } else {
        this.message = 'Error al iniciar sesión';
      }
    }
  });
}

}


  // login() {
  //   const credentials = {
  //     username: this.username,
  //     password: this.password
  //   };

  //   this.authService.login(credentials)
  //     .subscribe({
  //       next: (response) => {
  //         this.authService.saveToken(response.token);
  //         this.router.navigate(['/courses']); // 👈 redirección
  //       },
  //       error: () => {
  //         this.message = 'Credenciales incorrectas';
  //       }
  //     });
  // }







