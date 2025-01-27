import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {getFullName} from "./general-details/Store/general-details.selector";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  standalone: false
})
export class AccountComponent {

  userName : Observable<string>

  constructor(private store : Store) {
    this.userName=this.store.select(getFullName)
  }

}
