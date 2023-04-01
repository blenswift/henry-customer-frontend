import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';

@Pipe({
  name: 'moment',
  standalone: true,
})
export class MomentPipe implements PipeTransform {
  transform(date: Moment, format: string): string {
    return moment(date).format(format);
  }
}
