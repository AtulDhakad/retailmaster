import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gridFilter'
})
export class GridFilterPipe implements PipeTransform {
  transform(items: any, filter: any, defaultFilter: boolean): any {
    if (!filter){
      return items;
    }
    console.log('filter',filter);
    console.log('items',items);
    if (!Array.isArray(items)){
      return items;
    }

    if (filter && Array.isArray(items)) {
      let filterKeys = Object.keys(filter);

      if (defaultFilter) {
        return items.filter(item =>
            filterKeys.reduce((x, keyName) =>
                (x && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] == "", true));
      }
      else {
        // let filtered= items.filter(item => {                        
        //   return filterKeys.some((keyName) => {
        //       if(item[keyName]==='undefined' || item[keyName].trim()==='' ) return true;
        //     return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] == "";
        //   });
        // }); 
        
        let filtered= filterKeys.reduce( (t,f)=>{
            if(filter[f]==='undefined' || (filter[f] && filter[f].trim()==='') ) return items;
            return this.filterNow(t,filter,f);
        },items);

        console.log('filtered',filtered);
        if(filtered.length===0){
            return items;
        }
        return filtered;
      }
    }
  }

  filterNow(items,filter,keyName){    
    return items.filter(item => {         
          return new RegExp(filter[keyName], 'gi').test(item[keyName]);        
      }); 
  }
}