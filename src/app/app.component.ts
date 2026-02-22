import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {}


// import { Component } from '@angular/core';
// import { RouterOutlet, RouterLink } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { AuthService } from './services/auth.service';
// import { NavbarComponent } from './navbar/navbar.component';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, RouterLink, CommonModule, NavbarComponent],
//   templateUrl: './app.component.html',
//   template: `
//     <app-navbar></app-navbar>
//     <router-outlet></router-outlet>
//   `
// })
// export class AppComponent {

//   constructor(public authService: AuthService) {}
// }






  



