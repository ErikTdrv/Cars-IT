import { Component } from '@angular/core';
import { CarService } from 'src/app/car/car.service';
import { ICar } from 'src/app/shared/interfaces/car';
import { UserService } from '../user.service';

@Component({
  selector: 'app-favourite-cars',
  templateUrl: './favourite-cars.component.html',
  styleUrls: ['./favourite-cars.component.css']
})
export class FavouriteCarsComponent {
  cars: ICar[] | any = null;;
  isEmpty: boolean = false;
  isLoading: boolean = false;
  p: Number | any = 1;
  constructor(private carService: CarService) {
    this.getFavouriteCars()
  }
  getFavouriteCars() {
    this.isLoading = true;
    this.carService.getFavouriteCars().subscribe({
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
