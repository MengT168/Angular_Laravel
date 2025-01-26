import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { response } from 'express';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  name: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.name, this.password).subscribe({
      next: (response) => {
        console.log(response); 
        if (response.access_token) {
          this.authService.saveToken(response.access_token, response.username, response.role);
          this.router.navigate(['/main/home']);
        } else {
          this.errorMessage = 'Token not found in the response';
        }
      },
      error: (error) => {
        if (error.status === 403 && error.error.Message === 'Your account is not active. Please contact the administrator.') {
          this.errorMessage = 'Your account is not active. Please contact the administrator.';
        } else {
          this.errorMessage = 'Invalid username or password';
        }
      },
    });
  }
}
