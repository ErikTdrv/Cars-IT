import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICar } from 'src/app/shared/interfaces/car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent {
  car: ICar | undefined;
  constructor(private carService: CarService, private activatedRoute: ActivatedRoute){}

  getCar(): void {
    this.car = undefined;
    const id = this.activatedRoute.snapshot.params['id'];
    this.carService.getOneCar(id).subscribe(car => this.car = car)
  }
}
