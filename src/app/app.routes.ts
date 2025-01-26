import { Routes } from '@angular/router';
import { AppHome } from './home/home.component';
import { AppAbout } from './about/about.component';
import { AppData } from './data/data.component';
import { AppInsert } from './insert/insert.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';
import { AppNavbar } from './navbar/navbar.component';
import { AppMain } from './app.component';
import { RegisterComponent } from './register/register.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { 
    path: 'main', 
    component: AppNavbar, 
    canActivate: [authGuard],
    children: [
      { path: 'home', component: AppHome },
      { path: 'data', component: AppData },
      { path: 'insert', component: AppInsert },
      { path: 'about', component: AppAbout },
      { 
        path: 'manageNotAccessUser', 
        component: ManageUserComponent, 
        canActivate: [roleGuard] 
      },
    ]
  },
];
