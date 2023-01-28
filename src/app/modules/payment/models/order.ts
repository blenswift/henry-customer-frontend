export interface Order {
  totalPrice: number;
  fcmToken: string;
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
