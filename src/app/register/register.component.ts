import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService , private router: Router){}

  onRegister() {
    this.authService.signUp(this.name, this.email, this.password).subscribe({
      next: (response) => {
        console.log(response); // Log the entire response
        if (response.status === 200 && response.Message === 'Register Successful') {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'Registration failed';
        }
      },
      error: (error) => {
        this.errorMessage =error;
      },
    });
  }
}
