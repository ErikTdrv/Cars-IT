import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DictionaryComponent } from './car/dictionary/dictionary.component';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './core/home/home.component';
import { ErrorComponent } from './user/error/error.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './user/register/register.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,

  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard],
    data: {
      'guest': true,
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: {
      'guest': true,
    },

  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {
      'guest': false,
    }
  },
  {
    path: 'dictionary',
    component: DictionaryComponent,
  },
  {
    path: 'profile-info',
    loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule)
  }
  // {
  //   path: '**',
  //   component: ErrorComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
