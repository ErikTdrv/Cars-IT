import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { LazyRoutingModule } from './lazy.routing.module';



@NgModule({
  declarations: [
    ProfileInfoComponent
  ],
  imports: [
    CommonModule,
    LazyRoutingModule,
  ]
})
export class LazyModule { }
