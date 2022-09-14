import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any[], filterText: string): any[] {
    if(!value || !filterText || filterText === '') {
      return value;
    }
    filterText = filterText.toLowerCase();
    return value.filter(item => item.name.toLowerCase().includes(filterText));
  }

}
