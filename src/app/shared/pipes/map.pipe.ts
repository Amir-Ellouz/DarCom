import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'map',
  standalone: false,

})
export class MapPipe implements PipeTransform {
  transform(array: any[], expression: string): any[] {
    if (!Array.isArray(array)) {
      return array;
    }

    return array.map(item => this.evaluateExpression(item, expression));
  }

  private evaluateExpression(item: any, expression: string): any {
    const keys = expression.split('*').map(part => part.trim());

    if (keys.length === 2) {
      const leftKey = keys[0];
      const rightKey = keys[1];

      if (item && leftKey in item && rightKey in item) {
        const leftValue = item[leftKey];
        const rightValue = item[rightKey];

        return leftValue * rightValue;
      }
    }

    return undefined;
  }
}
