import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order, OrderItem } from 'src/app/modules/orders/models/order';
import { ProductCart } from '../models/product-cart';
import { priceOfProduct } from '../utils/priceUtils';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private items = new BehaviorSubject<ProductCart[]>([]);
  public items$ = this.items.asObservable();

  public add(item: ProductCart) {
    const products = this.items.value;
    products.push(item);
    this.items.next(products);
  }

  public remove(item: ProductCart) {
    const products = this.items.value;
    const indexOfItem = products.indexOf(item);
    if (indexOfItem > -1) {
      products.splice(indexOfItem, 1);
      this.items.next(products);
    }
  }

  public getOrder(tip: number): Order {
    const order = {
      totalPrice: 0,
      tip,
      orderItems: [] as OrderItem[],
    } as Order;

    this.items.value.forEach(item => {
      const orderItem = {
        productId: item.product.id,
        price: item.product.basePrice,
        subTotal: priceOfProduct(item),
        quantity: item.quantity,
        extraIds: [],
      } as OrderItem;

      item.product.extraGroups.forEach(extraGroup => {
        const extraIds = extraGroup.extras
          .filter(extra => extra.selected)
          .map(x => x.id);
        orderItem.extraIds = orderItem.extraIds.concat(extraIds);
      });

      order.totalPrice += orderItem.subTotal;
      order.orderItems.push(orderItem);
    });
    return order;
  }
}
