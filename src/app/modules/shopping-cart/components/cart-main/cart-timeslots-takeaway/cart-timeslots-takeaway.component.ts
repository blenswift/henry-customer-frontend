import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { PreorderStatus } from '../../../models/PreorderStatus';
import { TimeslotsPipe } from '../../../pipes/timeslots.pipe';

@Component({
  selector: 'oxp-cart-timeslots-takeaway',
  standalone: true,
  imports: [CommonModule, TranslateModule, TimeslotsPipe],
  templateUrl: './cart-timeslots-takeaway.component.html',
  styleUrls: ['./cart-timeslots-takeaway.component.scss'],
})
export class CartTimeslotsTakeawayComponent {
  preorderSettings: PreorderStatus | null = null;
  @Input() formCtrl = new FormControl<Date | null>(null);

  @Input() set preorderStatus(value: PreorderStatus | null) {
    if (value) {
      if (value.openingHours.today.isOpen) {
        const firstInterval = value.openingHours.today.intervals[0];
        firstInterval.start = firstInterval.start > moment() ? firstInterval.start : moment();
        firstInterval.start.add(value.currentStatus.preparationTimeMinutes, 'minutes');
        const minutesToNext5MinutesStartToAdd =
          firstInterval.start.get('minutes') % 5 > 0 ? 5 - (firstInterval.start.get('minutes') % 5) : 0;
        firstInterval.start.add(minutesToNext5MinutesStartToAdd, 'minutes');
        firstInterval.start = firstInterval.start < firstInterval.end ? firstInterval.start : firstInterval.end;
      }
      this.preorderSettings = value;
    }
  }

  selectedDay: 'today' | 'tomorrow' = 'today';

  translateService = inject(TranslateService);

  today = moment().toDate();
  tomorrow = moment().add(1, 'days').toDate();

  selectDay(day: 'today' | 'tomorrow') {
    this.selectedDay = day;
    this.formCtrl.setValue(null);
  }

  selectTime(value: Date) {
    this.formCtrl.setValue(value);
  }
}
