import { Pipe, PipeTransform } from '@angular/core';
import { PaymentType } from '../models/order';

@Pipe({
  name: 'orderPaymentTypeToIcon',
  standalone: true,
})
export class OrderPaymentTypeToIconPipe implements PipeTransform {
  transform(value: PaymentType): string {
    if (value === 'DIGITAL') {
      return 'credit_card';
    } else if (value === 'PHYSICAL') {
      return 'payments';
    } else {
      return value;
    }
  }
}
