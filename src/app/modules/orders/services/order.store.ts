import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, filter, switchMap, withLatestFrom } from 'rxjs';
import { OrderTracking } from '../models/order-tracking';
import { ShoppingCartStore } from './../../../shared/services/shopping-cart.store';
import { OrderService } from './order.service';

export interface OrderState {
  orders: OrderTracking[];
}

@Injectable()
export class OrderStore extends ComponentStore<OrderState> {
  readonly orders$ = this.select(state => state.orders);

  constructor(private orderService: OrderService, private shoppingCartStore: ShoppingCartStore) {
    super({
      orders: [],
    });
  }

  cacheOrder = this.effect((trackingId$: Observable<string>) => {
    return trackingId$.pipe(
      withLatestFrom(this.orders$),
      filter(([trackingId, orders]) => !!trackingId && orders.filter(order => order.trackingId === trackingId).length === 0),
      switchMap(([trackingId]) =>
        this.orderService.getOrderTracking(trackingId).pipe(
          tapResponse(
            data => {
              this.cache(data);
              this.shoppingCartStore.clearShoppingCart(sessionStorage.getItem('qrcode')!);
            },
            err => {}
          )
        )
      )
    );
  });

  loadCache = this.updater((state, qrCode: string) => {
    const orders = JSON.parse(localStorage.getItem('ORDER' + qrCode) ?? '[]');
    return { orders };
  });

  cache = this.updater((state, orderTracking: OrderTracking) => {
    const orders = [...state.orders, orderTracking];
    localStorage.setItem('ORDER' + sessionStorage.getItem('qrcode'), JSON.stringify(orders));
    return {
      orders,
    };
  });
}
