import { Product } from './product';
import { QrCodeType } from './qrCodeType';

export interface ProductCart {
  quantity: number;
  qrCodeType: QrCodeType;
  product: Product;
}
