import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private router: Router) {}

  login(name: string, password: string): Observable<any> {
    const body = { name, password };
    return this.http.post(`${this.apiUrl}/loginSubmit`, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  signUp(name: string, email: string, password: string): Observable<any> {
    const body = { name, email, password };
    return this.http.post(`${this.apiUrl}/register`, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  saveToken(token: string, userName: string, role: string): void {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_name', userName);
    localStorage.setItem('user_role', role);
  }
  getUserName(): string | null {
    return localStorage.getItem('user_name');
  }

 

  getUserRole(): string | null {
    return localStorage.getItem('user_role');
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_role');
    this.router.navigate(['/login']);
  }
}
