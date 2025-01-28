import { NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule , NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class AppSidebar implements AfterViewInit  {
  constructor(private renderer: Renderer2, private el: ElementRef , private authService: AuthService) {}

  userName: string | null = '';
  userRole: string | null = '';

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
    this.userRole = this.authService.getUserRole();
  }

  ngAfterViewInit(): void {
    const sidebarCollapseButton = this.el.nativeElement.querySelector('#sidebarCollapse');
    const sidebar = this.el.nativeElement.querySelector('#sidebar');
    if (sidebarCollapseButton && sidebar) {
      this.renderer.listen(sidebarCollapseButton, 'click', () => {
        if (sidebar.classList.contains('active')) {
          this.renderer.removeClass(sidebar, 'active');
        } else {
          this.renderer.addClass(sidebar, 'active');
        }
      });
    }
  }

  logout(): void {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      text: 'You will need to log in again to access your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
      }
    });
  }
 
  
  


}
