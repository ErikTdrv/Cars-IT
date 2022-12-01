import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppInterceptor, appInterceptorProvider } from './app.interceptor';
import { CarModule } from './car/car.module';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    UserModule,
    HttpClientModule,
    CoreModule,
    CarModule,
  ],
  providers: [appInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
