import { Pipe, PipeTransform } from '@angular/core';
import { Extra, ExtraGroup } from 'src/app/shared/models/product';

@Pipe({
  name: 'extras',
  standalone: true,
})
export class ExtrasPipe implements PipeTransform {
  transform(extraGroups: ExtraGroup[]): Extra[] {
    let extras: Extra[] = [];
    extraGroups.map(extraGroup => {
      if (extraGroup.selectionType === 'CHECKBOX') {
        extras = extras.concat(extraGroup.extras.filter(extra => extra.selected));
      } else if (extraGroup.selectionType === 'RADIO_GROUP') {
        extras = extras.concat(extraGroup.extras.filter(extra => extra.id === extraGroup.selected));
      }
      return extraGroup;
    });
    return extras;
  }
}
