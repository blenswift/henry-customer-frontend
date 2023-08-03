import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import * as moment from 'moment';
import { Observable, filter, map, switchMap, timer, withLatestFrom } from 'rxjs';
import { ShoppingCartStore } from './../../../shared/services/shopping-cart.store';
import { OrderTracking } from './../models/order-tracking';
import { OrderService } from './order.service';

export interface OrderState {
  orders: OrderTracking[];
}

@Injectable()
export class OrderStore extends ComponentStore<OrderState> {
  readonly orders$ = this.select(state => state.orders);

  constructor(private orderService: OrderService, private shoppingCartStore: ShoppingCartStore, private swPush: SwPush) {
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
              this.shoppingCartStore.clearShoppingCart(sessionStorage.getItem('restaurantId')!);
            },
            err => {}
          )
        )
      )
    );
  });

  checkOrderStatus = this.effect($ => {
    return timer(0, 60000).pipe(
      withLatestFrom(this.orders$),
      map(([, orders]) => orders.filter(x => x.status !== 'APPROVED' && moment(x.createdAt).add(1, 'days').isAfter(moment()))),
      filter(orders => orders.length > 0),
      map(orders => orders.map(order => order.trackingId)),
      switchMap(orderIds => this.orderService.getStatusOfOrders(orderIds)),
      map(orders => {
        orders.map(order => {
          this.updateOrder(order);
          if (order.status === 'APPROVED') {
            this.orderService.showSnackbarWhenOrderFinished(order);
          }
        });
      })
    );
  });

  updateOrder = this.updater((state, order: OrderTracking) => {
    const orders = state.orders;
    const newOrders = orders.filter(x => x.id != order.id);
    newOrders.push(order);
    localStorage.setItem('ORDER' + sessionStorage.getItem('restaurantId'), JSON.stringify(newOrders));
    return { ...state, orders: newOrders };
  });

  loadCache = this.updater(state => {
    const orders = JSON.parse(localStorage.getItem('ORDER' + sessionStorage.getItem('restaurantId')) ?? '[]');
    return { orders };
  });

  cache = this.updater((state, orderTracking: OrderTracking) => {
    const orders = [orderTracking, ...state.orders];
    localStorage.setItem('ORDER' + sessionStorage.getItem('restaurantId'), JSON.stringify(orders));
    return {
      orders,
    };
  });
}
