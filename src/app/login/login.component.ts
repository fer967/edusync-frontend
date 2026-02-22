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
    const credentials = {
      username: this.username,
      password: this.password
    };

    this.authService.login(credentials)
      .subscribe({
        next: (response) => {
          this.authService.saveToken(response.token);
          this.router.navigate(['/courses']); // 👈 redirección
        },
        error: () => {
          this.message = 'Credenciales incorrectas';
        }
      });
  }
}



// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { AuthService } from '../services/auth.service';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './login.component.html'
// })
// export class LoginComponent {

//   username = '';
//   password = '';
//   message = '';

//   constructor(private authService: AuthService) { }

//   login() {
//     const credentials = {
//       username: this.username,
//       password: this.password
//     };

//     this.authService.login(credentials)
//       .subscribe({
//         next: (response) => {
//           this.authService.saveToken(response.token);
//           this.message = 'Login exitoso';
//         },
//         error: () => {
//           this.message = 'Credenciales incorrectas';
//         }
//       });
//   }

// }



