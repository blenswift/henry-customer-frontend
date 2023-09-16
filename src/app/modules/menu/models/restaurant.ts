import { PaymentType } from '../../orders/models/order';

export interface Restaurant {
  id: string;
  name: string;
  coverUrl: string;
  open: boolean;
  acceptedPaymentChannels: PaymentType[];
}
