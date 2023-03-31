import { Pipe, PipeTransform } from '@angular/core';
import { priceOfProducts } from '../utils/priceUtils';
import { ProductCart } from './../models/product-cart';

@Pipe({
  name: 'sumOfProducts',
  standalone: true,
})
export class SumOfProductsPipe implements PipeTransform {
  transform(items: ProductCart[], tip: number | undefined): number {
    const price = priceOfProducts(items);

    return price + (tip || 0);
  }
}
