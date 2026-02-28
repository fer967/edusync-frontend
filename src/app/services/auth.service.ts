import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = 'https://edusync-backend-x316.onrender.com/api';

  // private apiUrl = 'https://localhost:7002/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  register(credentials: any) {
  return this.http.post(`${this.apiUrl}/register`, credentials);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getRole(): string | null {
  const token = this.getToken();
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  }

}





