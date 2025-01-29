import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscountComponent } from './discount.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [DiscountComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: DiscountComponent }]),
    SharedModule,
    MatProgressSpinnerModule,
  ],
})
export class DiscountModule {}
