import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'price',
  pure : true,
  standalone: false,

})
export class PricePipe implements PipeTransform {

  transform(value: number, percent : number): number {
    return +(value * (1 - percent/100)).toFixed(2);
  }

}
