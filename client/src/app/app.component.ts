import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  constructor(private http: HttpClient, private userService: UserService){
    if(localStorage.getItem('token')){
      userService.getProfileData().subscribe()
    }
  }

}
