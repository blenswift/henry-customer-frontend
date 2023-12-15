import { Category } from 'src/app/shared/models/category';
import { Product } from 'src/app/shared/models/product';
import { QrCodeType } from 'src/app/shared/models/qrCodeType';
export interface Menu {
  categories: Category[];
  filters: string[];
  products: Product[];
  qrCodeType: QrCodeType;
}
