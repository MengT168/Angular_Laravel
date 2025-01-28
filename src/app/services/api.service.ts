import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}/get_brand`, { headers });
  }

  getCar():Observable<any>{
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.apiUrl}/get_car`,{headers});
  }

  creatPosts(brandName: string): Observable<any> { 
    const token = localStorage.getItem('auth_token');
    const body = { brandName }; 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.apiUrl}/creat_brand`, body, {headers});
  }

  updateBrand(brandId: string, updatedData: { brandName: string }): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.apiUrl}/update_brand/${brandId}`, updatedData, { headers });
  }

  getUserNotAccess(){
    const token = localStorage.getItem('auth_token');
    console.log('Token:', token); 
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,  
    });

    return this.http.get<any>(`${this.apiUrl}/getNewUser`, { headers });
  }

  accessUser(userId: string): Observable<any> {
    const token = localStorage.getItem('auth_token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    });
    return this.http.put(`${this.apiUrl}/access_user/${userId}`, {}, { headers });
  }

  deleteBrand(userId: string): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}/delete_brand/${userId}`, { headers });
  }


}
