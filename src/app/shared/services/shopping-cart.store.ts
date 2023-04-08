import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, concatMap, exhaustMap, of, tap } from 'rxjs';
import { Order, OrderItem } from 'src/app/modules/orders/models/order';
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
  comment: string;
}

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartStore extends ComponentStore<ShoppingCartState> {
  readonly vm$ = this.select(state => state);

  constructor(private shoppingCartService: ShoppingCartService) {
    super({ items: [], paymentType: null, fcmToken: null, tip: 0, comment: '' });
  }

  addItem = this.effect((productCart$: Observable<ProductCart>) => {
    return productCart$.pipe(
      tap(productCart => {
        this.patchState(state => {
          const items = [...state.items, productCart];
          const qrCode = sessionStorage.getItem('qrcode');
          localStorage.setItem('ITEMS' + qrCode!, JSON.stringify(items));
          return {
            ...state,
            items,
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
          const qrCode = sessionStorage.getItem('qrcode');
          localStorage.setItem('ITEMS' + qrCode!, JSON.stringify(items));
          return {
            ...state,
            items: [...items],
          };
        });
      })
    );
  });

  createOrder = this.effect((shoppingCartState$: Observable<ShoppingCartState>) => {
    return shoppingCartState$.pipe(
      concatMap(shoppingCartState => this.getFinalOrder(shoppingCartState)),
      exhaustMap(order =>
        this.shoppingCartService.createOrder(sessionStorage.getItem('qrcode')!, order).pipe(
          tapResponse(
            data => {
              window.location.href = data.url;
            },
            () => {}
          )
        )
      )
    );
  });

  loadCache = this.updater((state, qrCode: string) => {
    const items = JSON.parse(localStorage.getItem('ITEMS' + qrCode) ?? '[]');
    return { ...state, items };
  });

  clearShoppingCart = this.updater((state, qrCode: string) => {
    localStorage.removeItem('ITEMS' + qrCode);
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

  private getFinalOrder(state: ShoppingCartState): Observable<Order> {
    const order = {
      fcmToken: state.fcmToken,
      orderItems: [],
      tip: state.tip,
      totalPrice: 0,
      paymentMethod: state.paymentType,
      comment: state.comment,
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
          extra.quantity = 1;
          extras.push(extra);
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
    return of(order);
  }
}
