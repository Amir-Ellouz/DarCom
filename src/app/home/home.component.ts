import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false,
})
export class HomeComponent {


  constructor(private router : Router) {
  }


  navigate(category: string){
    this.router.navigate(["/shop"],{
      queryParams : {
        category : category
      }
    })
  }

}
