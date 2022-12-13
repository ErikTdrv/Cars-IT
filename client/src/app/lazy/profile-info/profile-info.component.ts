import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';
import { Component } from '@angular/core';
import { UserService } from 'src/app/user/user.service';

const fadeInOutSlow = trigger('fadeInOutSlow', [
  transition(':enter', [
    query('h3', [
      style({
        opacity: '0',
      }), 
      stagger(300,[
        animate('2s',
        style({ opacity: 1, transform: 'none' }))
      ])
    ])
  ])
])
const fadeInOutFast = trigger('fadeInOutFast', [
  transition(':enter', [
    query('h3', [
      style({
        opacity: '0',
      }), 
      stagger(30,[
        animate('2s',
        style({ opacity: 1, transform: 'none' }))
      ])
    ])
  ])
])

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css'],
  animations: [fadeInOutFast, fadeInOutSlow]
})
export class ProfileInfoComponent {
  info: any = false;
  currUser: any;
  isLoading = false;
  constructor(private userService: UserService) {
    this.isLoading = true;
    this.userService.getIPaddress().subscribe((value) => {
      this.info = value
      this.isLoading = false
    })
    this.currUser = userService.user
  }
}
