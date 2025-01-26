import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppNavbar } from "./navbar/navbar.component";
import { log } from 'console';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppNavbar , FormsModule , NgIf , NgTemplateOutlet , CommonModule , NgFor],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Fixed the typo here
})
export class AppComponent {
  title = 'AngularII';
  imageUrl:string = 'https://web.dev/static/explore/angular/cover-wide.svg'
  isActive: boolean = true;

  username:string = 'Meng'
  userName:string=''
  txtValue = "My Text";
  keyUp(user:HTMLInputElement){
    console.log(user.value);
  }
  isLogin:boolean = true;

  users: Array<string> = ['meng','heng','king'];

  userObj: Array<any> = [
    {id: 1 , name: 'Meng',email: 'meng@gmail.com'},
    {id: 2 , name: 'Heng',email: 'heng@gmail.com'},
    {id: 3 , name: 'King',email: 'king@gmail.com'}
  ];

  onDelete(user:object){
    let index = this.userObj.indexOf(user);
    this.userObj.splice(index ,1);
  }
  name:string ='';
show(text:string){
  this.name = text;
}
}
export class AppMain {}
