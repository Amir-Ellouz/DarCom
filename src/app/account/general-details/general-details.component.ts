import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../../core/models/base-models/user";
import {Store} from "@ngrx/store";
import {getLoadingState, getUserError, selectUser} from "./Store/general-details.selector";
import * as GeneralDetailsAction from "./Store/general-details.action"
import {GenericComponent} from "../../shared/generic/generic.component";
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {clearUserError} from "./Store/general-details.action";


@Component({
  selector: 'app-general-details',
  templateUrl: './general-details.component.html',
  styleUrls: ['./general-details.component.css'],
  standalone: false
})
export class GeneralDetailsComponent extends GenericComponent{


  form : FormGroup
  loading$ : Observable<boolean>

  constructor(private store : Store<{user : User}>,private dialog : MatDialog) {
    super(store.select(getUserError),store,dialog,clearUserError)
    this.form=new FormGroup({
      firstName : new FormControl(),
      lastName : new FormControl(),
      address : new FormControl(),
      phoneNumber : new FormControl(),
      email : new FormControl()
    })
    this.loading$=this.store.select(getLoadingState)
    this.store.select(selectUser).subscribe(
      (data)=>{
        this.form.patchValue({
          firstName : data?.firstName,
          lastName : data?.lastName,
          address : data?.address,
          phoneNumber : data?.phoneNumber,
          email : data?.email
        })
      }
    )
  }


  onSubmit(){
    this.store.dispatch(GeneralDetailsAction.updateUserStart({
      userData : {
        firstName: this.form.get("firstName")!.value,
        lastName :this.form.get("lastName")!.value,
        address : this.form.get("address")!.value,
        phoneNumber :this.form.get("phoneNumber")!.value,
        email : this.form.get("email")!.value,
      }
    }))
  }

}





