import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.sort(this.sortNumber);
  }

  sortNumber(a, b) {
    return a.position - b.position;
  }

}
