import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';

const fadeInOutSlow = trigger('fadeInOutSlow', [
  transition(':enter', [
    query('h3', [
      style({
        opacity: '0',
      }), 
      stagger(300,[
        animate('2s',
        style({ opacity: 1, transform: 'none' }))
      ])
    ])
  ])
])
@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css'],
  animations: [fadeInOutSlow]
})
export class DictionaryComponent {
  car: any
  falseVin: boolean | null = null;
  isLoading: boolean = false;
  constructor(private userService: UserService){}
  getVin(vin: string){
    this.isLoading = true
    this.car = null;
    this.falseVin = null;
    this.userService.getCarsFrom3rdApi(vin).subscribe({
      next: (value) => {
        this.isLoading = false;
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
