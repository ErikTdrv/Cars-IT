import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddCarComponent } from './add-car/add-car.component';
import { CarRoutingModule } from './car-routing.module';



@NgModule({
  declarations: [
    AddCarComponent
  ],
  imports: [
    CommonModule,
    CarRoutingModule,
    RouterModule,
  ]
})
export class CarModule { }
