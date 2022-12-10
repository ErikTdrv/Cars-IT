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
  constructor(private userService: UserService){
    this.getMyCars()
  }
  getMyCars(){
    this.userService.getProfileCars().subscribe({
      next: (value) => {this.cars = value},
      error: (err) => console.log(err),
      
    })

  }

}
