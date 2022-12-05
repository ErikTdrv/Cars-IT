import { Component } from '@angular/core';
import { ICar } from 'src/app/shared/interfaces/car';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  cars: ICar[] | undefined
  get isLogged() {
    if (this.userService.user) {
      return true
    } else {
      return false
    }
  }
  constructor(private userService: UserService) { }
}
