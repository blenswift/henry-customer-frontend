import { Pipe, PipeTransform } from '@angular/core';
import { ExtraGroup } from 'src/app/shared/models/product';
import { Extra } from './../../../shared/models/product';

@Pipe({
  name: 'checkable',
  standalone: true,
  pure: false,
})
export class CheckablePipe implements PipeTransform {
  transform(extraGroup: ExtraGroup, extra: Extra): boolean {
    if (extra.selected) {
      return true;
    }

    const amountSelected = extraGroup.extras.filter(x => x.selected).length;
    // sollte schon die maximale Auswahl an checkboxen erreicht sein, so darf nicht mehr ausgewählt werden
    if (amountSelected === extraGroup.maxSelections) {
      return false;
    }

    return true;
  }
}
