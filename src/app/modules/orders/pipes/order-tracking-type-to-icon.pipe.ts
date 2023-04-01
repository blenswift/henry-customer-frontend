import { Pipe, PipeTransform } from '@angular/core';
import { OrderTrackingType } from './../models/order-tracking';

@Pipe({
  name: 'orderTrackingTypeToIcon',
  standalone: true,
})
export class OrderTrackingTypeToIconPipe implements PipeTransform {
  transform(value: OrderTrackingType): string {
    if (value === 'APPROVED') {
      return 'done';
    } else if (value === 'PAID') {
      return 'credit_card';
    } else if (value === 'CASH_PAYMENT') {
      return 'payments';
    } else if (value === 'CANCELED') {
      return 'close';
    } else if (value === 'PENDING') {
      return 'pending';
    } else {
      return value;
    }
  }
}
