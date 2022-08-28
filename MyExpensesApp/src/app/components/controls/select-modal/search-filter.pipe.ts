import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any[], text: string): any[] {
    if(!value || !text || text === '') {
      return value;
    }
    text = text.toLowerCase();
    console.log(text);
    return value.filter(item => item.name.toLowerCase().includes(text));
  }

}
