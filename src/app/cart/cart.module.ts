import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { CartComponent } from './cart.component';
import {RouterModule} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {NgxStripeModule} from "ngx-stripe";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    CartComponent,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: "", component: CartComponent}]),
        SharedModule,
        MatFormFieldModule,
        NgxStripeModule,

    ],
  providers : [DatePipe]
})
export class CartModule { }
