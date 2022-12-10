import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';



@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent {
  car: any
  falseVin: boolean | null = null;
  constructor(private userService: UserService){}
  getVin(vin: string){
    this.userService.getCarsFrom3rdApi(vin).subscribe({
      next: (value) => {
        if(value?.errors?.length > 1){
          this.falseVin = true
          this.car = null;
        }else {
          this.falseVin = false;
          this.car = value.specs;
        }
      },
      error: (err) => console.log(err)
    })
  }
}
