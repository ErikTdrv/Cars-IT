import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private http: HttpClient){}
  ngOnInit(): void {
    this.http.get('http://localhost:3030').subscribe({
      next: (value) => {
        console.log(value)
      }
    })
  }
  title = 'client';
}
