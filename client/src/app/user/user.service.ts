import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { IUser } from '../shared/interfaces/user';
import {environment} from '../../environments/environment'
const API_URL = environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: null | IUser = null;
  constructor(private http: HttpClient, private router: Router) { }

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
}
