import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SyncService {

  private apiUrl = 'https://edusync-backend-x316.onrender.com/api/StudentProgress/sync';
  // private apiUrl = 'https://localhost:7002/api/StudentProgress/sync';

  constructor(private http: HttpClient) {}

  sync(progressItems: any[]) {

    const token = localStorage.getItem('token');

    return this.http.post(
      this.apiUrl,
      progressItems, // 👈 se envía array directo
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`
        })
      }
    );
  }
}





