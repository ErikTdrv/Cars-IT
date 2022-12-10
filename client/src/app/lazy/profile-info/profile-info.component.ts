import { Component } from '@angular/core';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent {
  info: any = null;
  constructor(private userService: UserService) {
    this.userService.getIPaddress().subscribe((value) => {this.info = value
    console.log(value)})
  }
}
