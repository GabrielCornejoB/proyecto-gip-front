import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toFileArray',
  standalone: true,
})
export class ToFileArrayPipe implements PipeTransform {
  transform(value: FileList | null): File[] {
    if (value === null) return [];
    const result: File[] = [];
    for (let i = 0; i < value.length; i++) {
      result.push(value[i]);
    }
    return result;
  }
}
