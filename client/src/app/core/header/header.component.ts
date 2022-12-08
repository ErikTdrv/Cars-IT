import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  get isLogged(): boolean{
    if(this.userService.user){
      return true
    }else {
      return false
    }
  }
  constructor(private userService: UserService, private router: Router){}

  logout(){
    const token = localStorage.getItem('token')
    if(token){
      this.userService.logout()
      this.router.navigate(['/'])
    }
  }
}
