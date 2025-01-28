import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup ,Validators  } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insert',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class AppInsert implements OnInit {
  constructor(private apiService: ApiService ,  private fb :FormBuilder , private router:Router) {}
  form!:FormGroup;
    ngOnInit(): void {
      this.form = this.fb.group({
        brandName: ['', Validators.required],
      });
    }

  
    btnSave() {
      if (this.form.valid) {
        console.log('Form data:', this.form.value); // Debug log for form data
        const brandName = this.form.value.brandName.trim(); // Ensure no leading or trailing spaces
        console.log('Processed brand name:', brandName); // Debug log for processed brand name
  
        this.apiService.creatPosts(brandName).subscribe({
          next: (response) => {
            console.log('Brand created successfully:', response);
            this.form.reset();
            this.router.navigate(['/main/data']); // Navigate after successful creation
          },
          error: (error) => {
            console.error('Error creating brand:', error);
          },
          complete: () => {
            console.log('Brand creation process completed.');
          }
        });
      } else {
        console.warn('Form is invalid');
      }
    }
}
