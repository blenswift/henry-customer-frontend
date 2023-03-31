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
  basePrice: number;
  unitPrice: number;
  quantity: number;
  extraIds: string[];
}

export type PaymentType = 'DIGITAL' | 'CASH';
