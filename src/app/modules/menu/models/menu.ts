import { Category } from 'src/app/shared/models/category';
import { Product } from 'src/app/shared/models/product';
export interface Menu {
  categories: Category[];
  filters: string[];
  products: Product[];
  qrCodeType: 'MENU' | 'DINE_IN' | 'TAKEAWAY';
}
