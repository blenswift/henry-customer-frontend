import { Extra } from 'src/app/shared/models/product';

export interface Order {
  totalPrice: number;
  fcmToken: string | null;
  paymentMethod: PaymentType;
  tip: number;
  orderItems: OrderItem[];
  comment: string;
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

export type PaymentType = 'DIGITAL' | 'CASH';
