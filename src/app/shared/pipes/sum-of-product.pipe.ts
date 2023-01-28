import { Pipe, PipeTransform } from '@angular/core';
import { priceOfProduct } from '../utils/priceUtils';
import { ProductCart } from './../models/product-cart';

@Pipe({
  name: 'sumOfProduct',
  standalone: true,
  pure: false,
})
export class SumOfProductPipe implements PipeTransform {
  transform(item: ProductCart): number {
    return priceOfProduct(item);
  }
}
