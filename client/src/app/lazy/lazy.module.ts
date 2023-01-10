import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { LazyRoutingModule } from './lazy.routing.module';
import { GlobalProfileComponent } from './global-profile/global-profile.component';


@NgModule({
  declarations: [
    ProfileInfoComponent,
    GlobalProfileComponent
  ],
  imports: [
    CommonModule,
    LazyRoutingModule,
  ]
})
export class LazyModule { }
