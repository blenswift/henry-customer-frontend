export interface Order {
  totalPrice: number;
  fcmToken: string | null;
  paymentMethod: PaymentType;
  tip: number;
  orderItems: OrderItem[];
}

export interface OrderItem {
  productId: string;
  price: number;
  subTotal: number;
  quantity: number;
  extraIds: string[];
}

export type PaymentType = 'DIGITAL_PAYMENT' | 'CASH_PAYMENT';
