import { Component } from '@angular/core';
import { CarService } from 'src/app/car/car.service';
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
  constructor(private userService: UserService, private carService: CarService) { 
    this.getTopCars()
  }
  getTopCars(){
    this.carService.getTop3Cars().subscribe({
      next: (value) => this.cars = value,
      error: (err) => console.log(err)
    })
  }
}
