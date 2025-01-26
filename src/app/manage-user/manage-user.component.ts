import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [NgFor],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.css'
})
export class ManageUserComponent implements OnInit {
  User: Users[] = [];
  constructor(private apiService:ApiService){}

  ngOnInit(): void {
      this.fetchUser();
  }
  
  fetchUser(){
    this.apiService.getUserNotAccess().subscribe({
      next: (response)=>{
        console.log(response);
        if(response?.Users){
          this.User = response.Users
        }else{
          console.warn('Unexpected response structure:', response);
        }
      },
      error: (error)=>{
        console.error('Error fetching data from API:', error);  
      }
    });
  }

  OnAccess(userId: string) {
    this.apiService.accessUser(userId).subscribe({
      next: (response) => {
        console.log('User accessed successfully:', response);
        // Optionally, refresh the user list or update the UI
        this.fetchUser();
      },
      error: (error) => {
        console.error('Error accessing user:', error);
      }
    });
  }

}

interface Users {
  id: string;
  name: string;
  email: string;
  status: any;
  created_at: string;
  updated_at: string;
}
