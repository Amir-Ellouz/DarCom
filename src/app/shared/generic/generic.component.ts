import {Action, Store} from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { DialogComponent } from '../components/dialog/dialog.component';

export class GenericComponent {
  subscription: Subscription;

  constructor(
    public error$: Observable<string | null>,
    private genericStore: Store,
    private genericDialog: MatDialog,
    private action : Action
  ) {
    this.subscription = this.error$.subscribe((value) => {
      if (value) {
        this.openDialog(value);
      }
    });
  }

  openDialog(msg: string): void {
    this.genericDialog.open(DialogComponent, {
      data: {
        message: msg,
        action: this.action,
        store: this.genericStore,
      },
    });
  }

  destroySubscription() {
    this.subscription.unsubscribe();
  }
}
