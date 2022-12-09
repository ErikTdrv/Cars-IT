import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { IUser } from '../shared/interfaces/user';
import {environment} from '../../environments/environment'
import { ICar } from '../shared/interfaces/car';
const API_URL = environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: null | IUser | undefined ;
  constructor(private http: HttpClient, private router: Router) {}

  get isLogged(): boolean {
    if(this.user){
      return true
    }else{
      return false
    }
  }

  getCarsFrom3rdApi(data: {}){
    return this.http.get(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=audi`, {headers: {
      'X-RapidAPI-Key': '453f9c1bd6msh32734b876f80c8bp1aac59jsn6f9ec78a981c',
      'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }})
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
    return this.http.post<IUser>(`${API_URL}/login`, data, ).pipe(
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
        if(user){
          this.user = user;
        }
      })
    )
  }
  getProfileCars(){
    return this.http.get<ICar[]>(`${API_URL}/cars/mycars`)
  }
}
