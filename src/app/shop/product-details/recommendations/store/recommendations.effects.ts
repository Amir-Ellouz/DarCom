import {Injectable} from "@angular/core";
import {ProductRepositoryService} from "../../../../core/repositories/product-repository.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, of, switchMap} from "rxjs";
import {
  recommendationsError,
  recommendationsFetchedSuccess,
  recommendationStartFetching
} from "./recommedations.action";
import {HttpErrorResponse} from "@angular/common/http";


@Injectable()
export class RecommendationsEffects{


  constructor(private productsRepository : ProductRepositoryService,private action : Actions) {
  }

  fetchingRecommendations=createEffect(
    ()=>{
      return this.action.pipe(
        ofType(recommendationStartFetching),
        switchMap((value)=>{
          return this.productsRepository.getProducts(
            {category : value.category,page : null}
          ).pipe(
            map((value)=>{
              console.log("Reccommendation",value)
              return recommendationsFetchedSuccess({products : value})
            }),
            catchError((err : HttpErrorResponse) => of(recommendationsError({error: err.error.message.toString()})))
          )
        })
      )
    }
  )


}
