import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Add HttpClientModule here
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class AppData implements OnInit {
  brandData: Brand[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.apiService.getPosts().subscribe({
      next: (response) => {
        console.log('API Response:', response); // Log the entire response
        if (response?.Brand) {
          this.brandData = response.Brand; // Access the nested Brand array
        } else {
          console.warn('Unexpected response structure:', response);
        }
      },
      error: (error) => {
        console.error('Error fetching data from API:', error);
      }
    });
  }
  
}

interface Brand {
  id: string;
  brandName: string;
  authorId: string;
  created_at: string;
  updated_at: string;
}
