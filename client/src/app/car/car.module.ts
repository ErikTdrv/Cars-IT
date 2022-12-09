import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddCarComponent } from './add-car/add-car.component';
import { CarRoutingModule } from './car-routing.module';
import { AllCarsComponent } from './all-cars/all-cars.component';
import { FormsModule } from '@angular/forms';
import { CarDetailsComponent } from './car-details/car-details.component';
import { DictionaryComponent } from './dictionary/dictionary.component';



@NgModule({
  declarations: [
    AddCarComponent,
    AllCarsComponent,
    CarDetailsComponent,
    DictionaryComponent
  ],
  imports: [
    CommonModule,
    CarRoutingModule,
    RouterModule,
    FormsModule,
  ]
})
export class CarModule { }
