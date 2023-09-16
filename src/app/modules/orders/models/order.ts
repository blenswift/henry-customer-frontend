import { Extra } from 'src/app/shared/models/product';

export interface Order {
  totalPrice: number;
  fcmToken: string | null;
  paymentChannel: PaymentType;
  tip: number;
  orderItems: OrderItem[];
  notes: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  basePrice: number;
  unitPrice: number;
  quantity: number;
  imageUrl: string;
  extras: Extra[];
}

export type PaymentType = 'DIGITAL' | 'PHYSICAL';
