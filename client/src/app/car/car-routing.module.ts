import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddCarComponent } from "./add-car/add-car.component";

const routes: Routes = [
    {
        path: 'add',
        component: AddCarComponent,
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CarRoutingModule { }