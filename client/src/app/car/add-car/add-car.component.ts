import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CarService } from '../car.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent{
  
  errors: string | undefined = undefined;
  constructor(private carService: CarService, private router: Router){}

  addCar(form: NgForm){
    this.carService.addCar(form.value).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.errors = err?.error?.error
      }
    })
  }
}
