import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { handleError } from 'src/app/shared/errorHandler';
import { ICar } from 'src/app/shared/interfaces/car';
import { UserService } from 'src/app/user/user.service';
import { CarService } from '../car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent {
  car: ICar | undefined;
  inEditMode: boolean = false;
  token: string | null = localStorage.getItem('token')
  isAuthor: boolean = false;
  errors: Object | undefined;
  alreadyFavourite: boolean = false;
  index: any = 0;
  isLoading: boolean = false;
  constructor(private carService: CarService, private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) {
    this.getCar()
  }
  getCar(): void {
    this.isLoading = true;
    this.car = undefined;
    const id = this.activatedRoute.snapshot.params['id'];
    this.carService.getOneCar(id).subscribe({
      next: (car) => {
        this.car = car
        this.alreadyFavourite = car.addedBy.some((user) => user.username == this.userService.user?.username)
        this.isLoading = false
        if(this.userService.user?._id == car.owner._id){
          this.isAuthor = true
        }else {
          this.isAuthor = false;
        }
      },
      error: (err) => {
        this.errors = handleError(err.error?.error)
        console.log(err)
      }
    })
  }
  
  delete(){
    if(this.userService.user?._id != this.car?.owner._id || !this.token){
      this.router.navigate(['**'])
    }
    const id = this.car?._id;
    this.carService.deleteCar(id).subscribe({
      next: () => this.router.navigate(['/cars']),
      error: (err) => {
        this.errors = handleError(err.error?.error)
      }
    })
  }
  addToFavourite(){
    let id = this.car?._id
    let isLogged = this.userService.isLogged
    if(!isLogged){
      this.router.navigate(['login'])
    }else {
      this.carService.addToFavourite(id).subscribe({
        next: () => {
          this.alreadyFavourite = true;
        }
      })
    }
  }
  removeFromFavourites(){
    let id = this.car?._id;
    let isLogged = this.userService.isLogged
    if(!isLogged){
      this.router.navigate(['login'])
    }else {
      this.carService.removeFromFavourites(id).subscribe({
        next: () => {
          this.alreadyFavourite = false;
        }
      })
    }
  }
  changeImage(how: string){
    let length: any = this.car?.carImages.length
    if(how == 'previous' && this.index > 0){
      how == 'previous' ? this.index-- : this.index++
    }else if(how == 'next' && this.index < length - 1){
      how == 'next' ? this.index++ : this.index--
    }
  }
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
  // editCar(form: NgForm) {
  //   if(this.userService.user?._id != this.car?.owner._id || !this.token){
  //     this.router.navigate(['**'])
  //   }
  //   const id = this.car?._id;
  //   this.carService.editCar(id, form.value).subscribe({
  //     next: (car) => {
  //       this.car = car
  //       this.inEditMode = false;
  //     },
  //     error: (err) => {
  //       this.errors = handleError(err.error?.error)
  //     }
  //   })
  // }
  async editCar(form: NgForm, imageUrl: any): Promise<any>{

    this.isLoading = true;
    console.log('here')
    if(this.userService.user?._id != this.car?.owner._id){
      return this.router.navigate(['**'])
    }
    const id = this.car?._id;
    const file: any = imageUrl.files;
    let base64: any = [];
    if(file){
      for(let el of file) {
        base64.push(await this.convertToBase64(el))
      }
      form.value.base64 = base64
    }
    this.carService.editCar(id, form.value).subscribe({
      next: (car) => {
        this.isLoading = false
        this.car = car
        this.inEditMode = false;
      },
      error: (err) => {
        this.errors = handleError(err.error?.error)
      }
    })
    
  }
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
  }
  onChange(input: any){
    if(input.value == 'ImageURL'){
      let imageInput: any = document.getElementById('url');
      imageInput.style.display = 'block'
      let fileInput: any = document.getElementById('file');
      fileInput.style.display = 'none'
    }else if(input.value == 'UploadFile') {
      let imageInput: any = document.getElementById('url');
      imageInput.style.display = 'none'
      let fileInput: any = document.getElementById('file');
      fileInput.style.display = 'block'
    }
  }
}
