import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Ensure this is 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getPosts() {
    const token = localStorage.getItem('auth_token');
    console.log('Token:', token); 
    
    // Check if token exists and include it in the headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,  // Add token to Authorization header
    });

    return this.http.get<any>(`${this.apiUrl}/get_brand`, { headers });
  }

  getUserNotAccess(){
    const token = localStorage.getItem('auth_token');
    console.log('Token:', token); 
    
    // Check if token exists and include it in the headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,  // Add token to Authorization header
    });

    return this.http.get<any>(`${this.apiUrl}/getNewUser`, { headers });
  }

  accessUser(userId: string): Observable<any> {
    const token = localStorage.getItem('auth_token'); // Retrieve the token from local storage
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Include the token in the Authorization header
    });
    return this.http.put(`${this.apiUrl}/access_user/${userId}`, {}, { headers });
  
  }
}



  // insertCard(card : any){
  //   return this.http.post<any>(this.apiUrl,card);
  // }

