import {Store} from '../../../../models/store';
import {StoreConfiguration} from '../../../../models/storeconfiguration';
import {Website} from '../../../../models/website';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: StoreConfiguration[], query1: string, query2: string, query3: string, query4: string) {
    const returnArr = [];
    if (items && items.length) {
      return items.filter(item => {
        if (query1 && item.websitename.toString().toLowerCase().indexOf(query1.toLowerCase()) === -1) {
          return false;
        }
        if (query2 && item.groupname.toString().toLowerCase().indexOf(query2.toLowerCase()) === -1) {
          return false;
        }
        if (query3 && item.storename.toString().toLowerCase().indexOf(query3.toLowerCase()) === -1) {
          return false;
        }
        if (query4 && item.root_category.toString().toLowerCase().indexOf(query4.toLowerCase()) === -1) {
          return false;
        }
        return true;
      }).sort((obj1, obj2) => {
        if (obj1.websitename > obj2.websitename) {
          return 1;
        }
        if (obj1.websitename < obj2.websitename) {
          return -1;
        }
        return 0;

      });
    } else {
      return items.sort((obj1, obj2) => {
        if (obj1.websitename > obj2.websitename) {
          return 1;
        }
        if (obj1.websitename < obj2.websitename) {
          return -1;
        }
        return 0;

      });
    }
  }
}
