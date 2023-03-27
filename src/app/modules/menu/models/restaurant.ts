import { PaymentType } from '../../orders/models/order';

export interface Restaurant {
  name: string;
  coverUrl: string;
  open: boolean;
  acceptedPaymentMethods: PaymentType[];
}
