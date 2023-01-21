import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './../models/product';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private items: Product[] = [];
  public itemCount$ = new BehaviorSubject<number>(0);
  public items$ = new BehaviorSubject<Product[]>([]);

  public add(item: Product) {
    this.items.push(item);
    this.itemCount$.next(this.itemCount$.value + 1);
    this.items$.next([...this.items]);
  }

  public remove(item: Product) {
    const indexOfItem = this.items.indexOf(item);
    if (indexOfItem > -1) {
      this.items.splice(indexOfItem, 1);
      this.itemCount$.next(this.itemCount$.value - 1);
      this.items$.next([...this.items]);
    }
  }
}
