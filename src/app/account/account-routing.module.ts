import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AccountComponent} from "./account.component";
import {GeneralDetailsComponent} from "./general-details/general-details.component";
import {WishlistComponent} from "./wishlist/wishlist.component";


const routes : Routes = [
  {
    path : "" , component : AccountComponent,
    children : [
      {
        path : "general-details" , component : GeneralDetailsComponent
      },
      {
        path : "wishlist" , component : WishlistComponent
      },
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports : [RouterModule]
})
export class AccountRoutingModule { }
