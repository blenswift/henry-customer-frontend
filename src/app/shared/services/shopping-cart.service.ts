import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductCart } from '../models/product-cart';

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
}
