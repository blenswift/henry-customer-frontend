import { Moment } from 'moment';
import { OrderItem, PaymentType } from './order';

export interface OrderTracking {
  id: string;
  trackingId: string;
  createdAt: Moment;
  orderNumber: string;
  table: string;
  qrCode: string;
  totalPrice: number;
  notes: string;
  receiptUrl?: string;
  status: OrderTrackingType;
  paymentChannel: PaymentType;
  orderItems: OrderItem[];
}

export type OrderTrackingType = 'CREATED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLING' | 'CANCELLED';
