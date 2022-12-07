import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { ErrorComponent } from "../user/error/error.component";
import { AddCarComponent } from "./add-car/add-car.component";
import { AllCarsComponent } from "./all-cars/all-cars.component";
import { CarDetailsComponent } from "./car-details/car-details.component";

const routes: Routes = [
    {
        path: 'add',
        component: AddCarComponent,
        canActivate: [AuthGuard],
        data: {
            'authenticationRequired': true,
        }
    },
    {
        path: 'cars',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: AllCarsComponent,
            },
            {
                path: ':id',
                component: CarDetailsComponent,
            }
        ]
    },
    {
        path: 'error',
        component: ErrorComponent,
    },
    {
        path: '**',
        redirectTo: 'error',
    }

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CarRoutingModule { }