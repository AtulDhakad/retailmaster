import {Customer} from '../../../../../models/customer';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filtercustomer'
})
export class FiltercustomerPipe implements PipeTransform {
  transform(items: Customer[], query1: string) {
    if (!items) {
      return [];
    }
    if (!query1) {
      return items;
    }
    return items.filter(item => {
      if (query1.length > 3) {
        return item.name.toLowerCase().includes(query1.toLowerCase()) || item.telephone.toLowerCase().includes(query1.toLowerCase());
      }
    }).sort((obj1, obj2) => {
      if (obj1.name > obj2.name) {
        return 1;
      }
      if (obj1.name < obj2.name) {
        return -1;
      }
      return 0;

    });
  }
}

