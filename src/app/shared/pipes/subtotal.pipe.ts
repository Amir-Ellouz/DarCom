// subtotal.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subtotal',
  standalone: false,

})
export class SubtotalPipe implements PipeTransform {
  transform(values: number[]): number {
    return values.reduce((sum, value) => sum + value, 0);
  }
}
