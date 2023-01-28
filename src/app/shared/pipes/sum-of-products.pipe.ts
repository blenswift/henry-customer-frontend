import { Pipe, PipeTransform } from '@angular/core';
import { ProductCart } from './../models/product-cart';

@Pipe({
  name: 'sumOfProducts',
  standalone: true,
})
export class SumOfProductsPipe implements PipeTransform {
  transform(items: ProductCart[], tip: number | null): number {
    let price = 0;

    items.forEach(item => {
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
    });

    return (price + (tip ?? 0)) / 100;
  }
}
