import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralDetailsComponent } from './general-details/general-details.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AccountComponent } from './account.component';
import {AccountRoutingModule} from "./account-routing.module";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    GeneralDetailsComponent,
    WishlistComponent,
    AccountComponent
  ],
    imports: [
        CommonModule,
        AccountRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class AccountModule { }
