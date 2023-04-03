import { Moment } from 'moment';
import { OrderItem } from './order';

export interface OrderTracking {
  id: string;
  trackingId: string;
  createdAt: Moment;
  table: string;
  qrCode: string;
  totalPrice: number;
  status: OrderTrackingType;
  orderItems: OrderItem[];
}

export type OrderTrackingType = 'PENDING' | 'PAID' | 'CASH_PAYMENT' | 'CANCELING' | 'CANCELED' | 'APPROVED';
