import {Component, Input, OnDestroy} from '@angular/core';
import {Store} from "@ngrx/store";
import {
  getRecommendations,
  getRecommendationsError,
  getRecommendationsLoading,
  RecommendationsState
} from "./store/recommendations.reducer";
import {Router} from "@angular/router";
import {Product} from "../../../core/models/base-models/product/product";
import {Observable} from "rxjs";
import {clearRecommendationError, recommendationStartFetching} from "./store/recommedations.action";
import {GenericComponent} from "../../../shared/generic/generic.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css'],
  standalone: false,
})
export class RecommendationsComponent extends GenericComponent implements OnDestroy{


  @Input() category! : string
  products$ : Observable<Product[]>
  loading$ : Observable<boolean>


  constructor(private store : Store<RecommendationsState>,private router : Router,private dialog : MatDialog) {
    super(store.select(getRecommendationsError),store,dialog,clearRecommendationError)
    this.store.dispatch(recommendationStartFetching({category: this.category}))
    this.products$=this.store.select(getRecommendations)
    this.loading$=this.store.select(getRecommendationsLoading)
  }

  ngOnDestroy(): void {
        this.destroySubscription()
  }


  viewMore(){
    this.router.navigate(["/shop"],{
      queryParams : {
        category : this.category,
      }
    })
  }




}
