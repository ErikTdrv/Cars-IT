import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  inEditMode: boolean = false;
  get isAuthor(): boolean{
    if(this.car?.owner == this.userService.user?.username){
      return true
    }else {
      return false;
    }
  }
  constructor(private carService: CarService, private activatedRoute: ActivatedRoute, private userService: UserService) {
    this.getCar()
  }

  getCar(): void {
    this.car = undefined;
    const id = this.activatedRoute.snapshot.params['id'];
    this.carService.getOneCar(id).subscribe(car => this.car = car)
  }
  editCar(form: NgForm) {
    const id = this.car?._id;
    this.carService.editCar(id, form.value).subscribe({
      next: (car) => {
        this.car = car
        this.inEditMode = false;
      },
      error: (err) => console.log(err)
    })
  }
}
