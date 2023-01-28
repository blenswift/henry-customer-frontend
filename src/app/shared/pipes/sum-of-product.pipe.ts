import { Pipe, PipeTransform } from '@angular/core';
import { ProductCart } from './../models/product-cart';

@Pipe({
  name: 'sumOfProduct',
  standalone: true,
  pure: false,
})
export class SumOfProductPipe implements PipeTransform {
  transform(item: ProductCart): number {
    let price = 0;

    let singleItemPrice = 0;
    singleItemPrice = item.product.basePrice;
    item.product.extraGroups.forEach(extraGroup => {
      extraGroup.extras.forEach(extra => {
        if (extra.selected) {
          singleItemPrice += extra.price ?? 0;
        }
      });
    });
    singleItemPrice *= item.quantity;
    price += singleItemPrice;

    return price / 100;
  }
}
