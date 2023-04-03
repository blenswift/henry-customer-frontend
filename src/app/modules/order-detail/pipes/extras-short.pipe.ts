import { Pipe, PipeTransform } from '@angular/core';
import { Extra } from 'src/app/shared/models/product';

@Pipe({
  name: 'extrasShort',
  standalone: true,
})
export class ExtrasShortPipe implements PipeTransform {
  transform(extras: Extra[]): string {
    return extras.map(x => x.name).join(', ');
  }
}
