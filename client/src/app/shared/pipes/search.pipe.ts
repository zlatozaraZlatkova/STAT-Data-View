import { Pipe, PipeTransform } from '@angular/core';
import { IRssNewsItem } from 'src/app/interfaces/rssNews';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(items: IRssNewsItem[], searchText: string): IRssNewsItem[] {
    if (!items || !searchText) {
      return items;
    }

    const normalizedSearch = searchText.toLowerCase().trim();

    const result = items.filter((item) => {
      const match = item.description.toLowerCase().includes(normalizedSearch);
      if (!match) {
        console.log('No Match found');
      }
      return match;
    });

    return result;
  }
}
