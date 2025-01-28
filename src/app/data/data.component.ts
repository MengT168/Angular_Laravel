import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ApiService } from '../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Brand } from './brand.model';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule], // Add FormsModule here
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class AppData implements OnInit {
  brandData: Brand[] = [];
  userRole: string | null = '';
  selectedBrand: Brand = { id: '', brandName: '', authorId: '', created_at: '', updated_at: '' }; 

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.fetchData();
    this.userRole = this.authService.getUserRole();
  }

  fetchData(): void {
    this.apiService.getPosts().subscribe({
      next: (response) => {
        console.log('API Response:', response);
        if (response?.Brand) {
          this.brandData = response.Brand;
        } else {
          console.warn('Unexpected response structure:', response);
        }
      },
      error: (error) => {
        console.error('Error fetching data from API:', error);
      }
    });
  }

  onDelete(brandId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteBrand(brandId).subscribe({
          next: (response) => {
            Swal.fire(
              'Deleted!',
              'The brand has been deleted.',
              'success'
            );
            this.fetchData();
          },
          error: (error) => {
            console.error('Error deleting brand:', error);
            Swal.fire(
              'Error!',
              'There was an error deleting the brand.',
              'error'
            );
          }
        });
      }
    });
  }

  openUpdateModal(brand: Brand): void {
    this.selectedBrand = { ...brand };
    if (typeof window !== 'undefined') {
      import('bootstrap').then((bootstrap) => {
        const modalElement = document.getElementById('updateBrandModal');
        if (modalElement) {
          const modal = new bootstrap.Modal(modalElement);
          modal?.show();
        }
      });
    }
  }

  closeModal(): void {
    if (typeof window !== 'undefined') {
      import('bootstrap').then((bootstrap) => {
        const modalElement = document.getElementById('updateBrandModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal?.hide();
        }
      });
    }
  }

  onUpdate(): void {
    const updatedData = { brandName: this.selectedBrand.brandName };
    this.apiService.updateBrand(this.selectedBrand.id, updatedData).subscribe({
      next: () => {
        Swal.fire('Updated!', 'The brand has been updated.', 'success');
        this.fetchData();
        this.closeModal();
      },
      error: (error) => {
        console.error('Error updating brand:', error);
        Swal.fire('Error!', 'There was an error updating the brand.', 'error');
      }
    });
  }
}
