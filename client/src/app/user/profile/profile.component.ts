import { Component } from '@angular/core';
import { ICar } from 'src/app/shared/interfaces/car';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  cars: ICar[] | any;
  isEmpty: boolean = false;
  isLoading: boolean = false;
  constructor(private userService: UserService) {
    this.getMyCars()
  }
  getMyCars() {
    this.isLoading = true;
    this.userService.getProfileCars().subscribe({
      next: (value) => {
        this.isLoading = false;
        this.cars = value
        if (value.length == 0) {
          this.isEmpty = true;
        }
      },
      error: (err) => console.log(err),

    })

  }

}
