import { Pipe, PipeTransform } from '@angular/core';
import { Interval } from '../models/PreorderStatus';

@Pipe({
  name: 'timeslots',
  standalone: true,
})
export class TimeslotsPipe implements PipeTransform {
  transform(value: Interval): Date[] | [] {
    if (value.start < value.end) {
      const minutesToNext5MinutesStartToAdd = value.start.get('minutes') % 5 > 0 ? 5 - (value.start.get('minutes') % 5) : 0;
      value.start.add(minutesToNext5MinutesStartToAdd, 'minutes');
      value.start = value.start < value.end ? value.start : value.end;
      const timeslots = [];
      const current = value.start.clone();
      while (current <= value.end) {
        timeslots.push(current.clone().toDate());
        current.add(5, 'minutes');
      }
      return timeslots;
    }

    return [];
  }
}
