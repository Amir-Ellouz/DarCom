import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'total',
  standalone: false,

})
export class TotalPipe implements PipeTransform {
  transform(subtotal: number, additionalCost: number): number {
    return subtotal + additionalCost;
  }
}
