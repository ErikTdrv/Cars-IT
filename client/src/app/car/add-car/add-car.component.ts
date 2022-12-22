import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { handleError } from 'src/app/shared/errorHandler';
import { CarService } from '../car.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css'],
  
})
export class AddCarComponent{
  
  errors: string | undefined = undefined;
  constructor(private carService: CarService, private router: Router){}
  
  convertToBase64(file: any){
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }
  async addCar(form: NgForm, imageUrl: any){
    const file: File = imageUrl.files[0];
    let base64 = await this.convertToBase64(file)
    this.carService.addCar(form.value, base64).subscribe({
      next: () => this.router.navigate(['/cars']),
      error: (err) => {
        this.errors = handleError(err?.error?.error)
      }
    })
  }
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    console.log(file)
  }
}
