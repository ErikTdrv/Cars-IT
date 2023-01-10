import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { LazyRoutingModule } from './lazy.routing.module';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ProfileInfoComponent
  ],
  imports: [
    NgxPaginationModule,
    CommonModule,
    LazyRoutingModule,
  ]
})
export class LazyModule { }
