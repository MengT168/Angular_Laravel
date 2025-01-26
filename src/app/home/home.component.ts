import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
})
export class AppHome {
  constructor(private authService: AuthService) {}

  // Logout method
  logout(): void {
    this.authService.logout(); // Call logout from AuthService
  }
}
