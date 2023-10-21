import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, concatMap, exhaustMap, of, tap } from 'rxjs';
import { Order, OrderItem } from 'src/app/modules/orders/models/order';
import { LoadingStatus } from '../models/loading-status';
import { Extra } from '../models/product';
import { priceOfProduct } from '../utils/priceUtils';
import { PaymentType } from './../../modules/orders/models/order';
import { ShoppingCartService } from './../../modules/shopping-cart/services/shopping-cart.service';
import { ProductCart } from './../models/product-cart';

export interface ShoppingCartState {
  items: ProductCart[];
  paymentType: PaymentType | null;
  fcmToken: string | null;
  tip: number;
  notes: string;
  order: Order | null;
  state: LoadingStatus;
}

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartStore extends ComponentStore<ShoppingCartState> {
  readonly vm$ = this.select(state => state);
  readonly order$ = this.select(state => state.order);

  constructor(
    private shoppingCartService: ShoppingCartService,
    private router: Router,
    private snackBar: MatSnackBar,
    private translateService: TranslateService
  ) {
    super({ items: [], paymentType: null, fcmToken: null, tip: 0, notes: '', order: null, state: 'DATA' });
  }

  addItem = this.effect((productCart$: Observable<ProductCart>) => {
    return productCart$.pipe(
      tap(productCart => {
        this.patchState(state => {
          const items = [...state.items, productCart];
          const restaurantId = sessionStorage.getItem('restaurantId');
          localStorage.setItem('ITEMS' + restaurantId!, JSON.stringify(items));
          const order = this.prepareOrder({
            ...state,
            items,
          });
          return {
            ...state,
            items,
            order,
          };
        });
      })
    );
  });

  removeItem = this.effect((itemIndex$: Observable<number>) => {
    return itemIndex$.pipe(
      tap(itemIndex => {
        this.patchState(state => {
          const items = state.items;
          items.splice(itemIndex, 1);
          const restaurantId = sessionStorage.getItem('restaurantId');
          localStorage.setItem('ITEMS' + restaurantId!, JSON.stringify(items));
          const order = this.prepareOrder({
            ...state,
            items,
          });
          return {
            ...state,
            items: [...items],
            order,
          };
        });
      })
    );
  });

  createOrder = this.effect((shoppingCartState$: Observable<ShoppingCartState>) => {
    return shoppingCartState$.pipe(
      tap(() => this.patchState(state => ({ ...state, state: 'LOADING' }))),
      concatMap(shoppingCartState => this.getFinalOrder(shoppingCartState)),
      exhaustMap(order =>
        this.shoppingCartService.createOrder(sessionStorage.getItem('qrcode')!, order).pipe(
          tapResponse(
            data => {
              if (data.redirectUrl) {
                window.location.href = data.redirectUrl;
              } else {
                this.router.navigate(['checkout/' + data.checkoutId]);
              }
            },
            (err: any) => {
              console.log(err);
              this.patchState(state => ({ ...state, state: 'DATA' }));
              this.openSnackBar(err.error.message);
            }
          )
        )
      )
    );
  });

  loadCache = this.updater(state => {
    const items = JSON.parse(localStorage.getItem('ITEMS' + sessionStorage.getItem('restaurantId')) ?? '[]');
    const order = this.prepareOrder({
      ...state,
      items,
    });
    return { ...state, items, order };
  });

  clearShoppingCart = this.updater((state, restaurantId: string) => {
    localStorage.removeItem('ITEMS' + restaurantId);
    return {
      ...state,
      items: [],
      fcmToken: state.fcmToken,
      tip: 0,
      totalPrice: 0,
    };
  });

  setPaymentType = this.updater((state, paymentType: PaymentType) => ({
    ...state,
    paymentType,
  }));

  setFcmToken = this.updater((state, fcmToken: string) => ({
    ...state,
    fcmToken,
  }));

  private prepareOrder(state: ShoppingCartState): Order {
    const order = {
      fcmToken: state.fcmToken,
      orderItems: [],
      tip: state.tip,
      totalPrice: 0,
      paymentChannel: state.paymentType,
      notes: state.notes,
    } as Order;

    state.items.forEach(item => {
      const orderItem = {
        productId: item.product.id,
        basePrice: item.product.basePrice,
        unitPrice: priceOfProduct(item),
        quantity: item.quantity,
        extraIds: [],
        productName: item.product.name,
        imageUrl: item.product.imageUrl,
        extras: [],
      } as OrderItem;

      item.product.extraGroups.forEach(extraGroup => {
        let extras: Extra[] = [];
        if (extraGroup.selectionType === 'CHECKBOX') {
          extras = extraGroup.extras
            .filter(extra => extra.selected)
            .map(x => {
              x.quantity = 1;
              return x;
            });
        }
        if (extraGroup.selectionType === 'RADIO_GROUP' && extraGroup.selected) {
          const extra = extraGroup.extras.filter(x => x.id === extraGroup.selected)[0];
          if (extra) {
            extra.quantity = 1;
            extras.push(extra);
          }
        }
        if (extraGroup.selectionType === 'MULTI_SELECT') {
          extras = extraGroup.extras.filter(extra => extra.quantity > 0);
        }
        orderItem.extras = orderItem.extras.concat(extras);
      });

      order.totalPrice += orderItem.unitPrice * orderItem.quantity;
      order.orderItems.push(orderItem);
    });

    order.totalPrice += state.tip;
    return order;
  }

  private getFinalOrder(state: ShoppingCartState): Observable<Order> {
    const order = {
      fcmToken: state.fcmToken,
      orderItems: [],
      tip: state.tip,
      totalPrice: 0,
      paymentChannel: state.paymentType,
      notes: state.notes,
    } as Order;

    state.items.forEach(item => {
      const orderItem = {
        productId: item.product.id,
        basePrice: item.product.basePrice,
        unitPrice: priceOfProduct(item),
        quantity: item.quantity,
        extraIds: [],
        productName: item.product.name,
        imageUrl: item.product.imageUrl,
        extras: [],
      } as OrderItem;

      item.product.extraGroups.forEach(extraGroup => {
        let extras: Extra[] = [];
        if (extraGroup.selectionType === 'CHECKBOX') {
          extras = extraGroup.extras
            .filter(extra => extra.selected)
            .map(x => {
              x.quantity = 1;
              return x;
            });
        }
        if (extraGroup.selectionType === 'RADIO_GROUP' && extraGroup.selected) {
          const extra = extraGroup.extras.filter(x => x.id === extraGroup.selected)[0];
          if (extra) {
            extra.quantity = 1;
            extras.push(extra);
          }
        }
        if (extraGroup.selectionType === 'MULTI_SELECT') {
          extras = extraGroup.extras.filter(extra => extra.quantity > 0);
        }
        orderItem.extras = orderItem.extras.concat(extras);
      });

      order.totalPrice += orderItem.unitPrice * orderItem.quantity;
      order.orderItems.push(orderItem);
    });

    this.patchState(state => ({ ...state, order }));

    order.totalPrice += state.tip;
    return of(order);
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, undefined, { duration: 3000 });
  }
}
