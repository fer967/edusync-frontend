import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7002/api/auth';

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
}





