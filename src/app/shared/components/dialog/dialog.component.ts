import {Component, Inject, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Action, Store} from "@ngrx/store";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  standalone: false,

})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataInterface
  ) {
    this.dialogRef.afterClosed().subscribe(
      ()=>{
        this.data.store.dispatch(this.data.action)
      }
    )
  }




  onCloseClick(): void {
    this.dialogRef.close();
  }
}


export interface DialogDataInterface{
  store : Store
  action : Action
  message : string
}
