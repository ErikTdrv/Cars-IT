import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment'
import { ICar } from '../shared/interfaces/car';
const API_URL = environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }
  addCar(data: {}){
    return this.http.post(`${API_URL}/cars`, data)
  }
  getAllCars(){
    return this.http.get<ICar[]>(`${API_URL}/cars`)
  }
  getOneCar(id: string){
    return this.http.get<ICar>(`${API_URL}/cars/${id}`, {withCredentials: true})
  }
  editCar(id: string | undefined, data: {}){
    return this.http.put<ICar>(`${API_URL}/cars/${id}`, data)
  }
  deleteCar(id: string | undefined){
    return this.http.delete(`${API_URL}/cars/${id}`)
  }
}
