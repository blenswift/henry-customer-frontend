import { OrderItem } from './order';

export interface OrderTracking {
  id: string;
  createdAt: Date;
  table: string;
  qrCode: string;
  totalPrice: number;
  status: string;
  orderItems: OrderItem[];
}
