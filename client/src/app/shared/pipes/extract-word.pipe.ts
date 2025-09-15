import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractWord'
})
export class ExtractWordPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    const acronymMatch = value.match(/\b[A-Z]{2,}\b/);

    if (acronymMatch) {
      return acronymMatch[0];
    }
    
    return value.split(' ')[0];
  }

}
