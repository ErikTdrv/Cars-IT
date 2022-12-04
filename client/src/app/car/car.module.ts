import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddCarComponent } from './add-car/add-car.component';
import { CarRoutingModule } from './car-routing.module';
import { AllCarsComponent } from './all-cars/all-cars.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddCarComponent,
    AllCarsComponent
  ],
  imports: [
    CommonModule,
    CarRoutingModule,
    RouterModule,
    FormsModule,
  ]
})
export class CarModule { }
