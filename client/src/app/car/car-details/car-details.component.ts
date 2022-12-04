import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICar } from 'src/app/shared/interfaces/car';
import { UserService } from 'src/app/user/user.service';
import { CarService } from '../car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent {
  car: ICar | undefined;

  constructor(private carService: CarService, private activatedRoute: ActivatedRoute){
    this.getCar()
  }

  getCar(): void {
    this.car = undefined;
    const id = this.activatedRoute.snapshot.params['id'];
    this.carService.getOneCar(id).subscribe(car => this.car = car)
  }
}
