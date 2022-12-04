import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddCarComponent } from "./add-car/add-car.component";
import { AllCarsComponent } from "./all-cars/all-cars.component";
import { CarDetailsComponent } from "./car-details/car-details.component";

const routes: Routes = [
    {
        path: 'add',
        component: AddCarComponent,
    },
    {
        path: 'all-cars',
        component: AllCarsComponent,
    },
    {
        path: ':id',
        component: CarDetailsComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CarRoutingModule { }