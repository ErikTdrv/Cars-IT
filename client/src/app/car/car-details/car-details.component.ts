import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  token: string | null = localStorage.getItem('token')
  isAuthor: boolean = false;

  constructor(private carService: CarService, private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) {
    this.getCar()
  }
  
  getCar(): void {
    this.car = undefined;
    const id = this.activatedRoute.snapshot.params['id'];
    this.carService.getOneCar(id).subscribe({
      next: (car) => {
        this.car = car
        if(this.userService.user?._id == car.owner._id){
          this.isAuthor = true
        }else {
          this.isAuthor = false;
        }
      },
      error: (err) => {
        console.log(err)
        this.router.navigate(['**'])
      }
    })
  }
  editCar(form: NgForm) {
    if(this.userService.user?._id != this.car?.owner._id || !this.token){
      this.router.navigate(['**'])
    }
    const id = this.car?._id;
    this.carService.editCar(id, form.value).subscribe({
      next: (car) => {
        this.car = car
        this.inEditMode = false;
      },
      error: (err) => console.log(err)
    })
  }
  delete(){
    if(this.userService.user?._id != this.car?.owner._id || !this.token){
      this.router.navigate(['**'])
    }
    const id = this.car?._id;
    this.carService.deleteCar(id).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => console.log(err)
    })
  }
}
