import {Component, OnInit} from '@angular/core';
import {Product} from "../../core/models/base-models/product/product";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {selectWishlist} from "./Store/wishlist.selector";
import {loadWishlist, removeFromWishlist} from "./Store/wishlist.actions";


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  standalone: false
})
export class WishlistComponent implements OnInit{

  wishList$ : Observable<Product[]| null>

  constructor(private store : Store<{wishlist : Product[]}>) {
  this.wishList$ = this.store.select(selectWishlist)
  }
  ngOnInit() {
    this.store.dispatch(loadWishlist())
  }


  removeFromWishlist(id : number){
    this.store.dispatch(removeFromWishlist({id : id}))
  }


}
