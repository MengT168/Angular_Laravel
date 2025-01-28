import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { Cars } from './car.model';
import { response } from 'express';
import { log } from 'console';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class AppHome implements OnInit {

  carData: Cars[] = [];

  constructor(private apiService: ApiService) {}

  
  ngOnInit(): void {
      this.fetchCar()
  }
  

  fetchCar(){
    this.apiService.getCar().subscribe({
      next: (response)=>{
        console.log(response);
        if(response?.Cars){
          this.carData = response.Cars;
        }else{
          console.warn('Unexpected response structure:', response);
        }
        
      },
      error: (error)=>{
        console.error('Error fetching data from API:', error);
      }
    });
  }

  getImageUrl(imageName: string): string {
    const baseUrl = 'http://127.0.0.1:8000/upload';
    return `${baseUrl}/${imageName}`;
  }
  


}
