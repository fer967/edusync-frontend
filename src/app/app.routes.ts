import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CoursesComponent } from './courses/courses.component';
import { authGuard } from './guards/auth.guard';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { adminGuard } from './guards/admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'courses', component: CoursesComponent, canActivate: [authGuard] },
    { path: 'courses/:id', component: CourseDetailComponent},
    { path: 'register', component: RegisterComponent },
    { path: 'admin', component: AdminComponent, canActivate: [adminGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] }
];




