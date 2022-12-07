import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { IUser } from '../shared/interfaces/user';
import {environment} from '../../environments/environment'
import { ICar } from '../shared/interfaces/car';
const API_URL = environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: null | IUser | undefined;
  constructor(private http: HttpClient, private router: Router) { }

  get isLogged(): boolean {
    if(this.user){
      return true
    }else{
      return false
    }
  }
  register(data: {}){
    return this.http.post<IUser>(`${API_URL}/register`, data).pipe(
      tap((user) => {
        this.user = user
        localStorage.setItem('token', this.user.accessToken)
      })
    )
  }
  login(data: {}){
    return this.http.post<IUser>(`${API_URL}/login`, data).pipe(
      tap((user) => {
        this.user = user
        localStorage.setItem('token', this.user.accessToken)
      })
    )
  }
  logout(){
    this.user = null;
    return localStorage.removeItem('token')
  }
  getProfileData(){
    return this.http.get<IUser>(`${API_URL}/user`).pipe(
      tap((user) => {
        this.user = user;
      })
    )
  }
  getProfileCars(){
    return this.http.get<ICar[]>(`${API_URL}/cars/mycars`)
  }
}
