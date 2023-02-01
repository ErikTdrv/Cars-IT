import { Component } from '@angular/core';
import { ICar } from 'src/app/shared/interfaces/car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-all-cars',
  templateUrl: './all-cars.component.html',
  styleUrls: ['./all-cars.component.css']
})
export class AllCarsComponent {
  p: Number | any = 1;
  cars: ICar[] | undefined
  carsLength: any 
  isEmpty: boolean = false;
  constructor(private carService: CarService){
    this.getAllCars()
  }

  getAllCars(){
    this.cars = undefined;
    this.carService.getAllCars().subscribe({
      next: (cars) => {
        this.cars = cars
        this.carsLength = cars.length || 0
        if(cars.length == 0){
          this.isEmpty = true;
        }
      }
    })
  }
}
