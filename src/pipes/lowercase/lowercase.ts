import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lowercase',
})
export class NewPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return value.toLowerCase();
  }
}