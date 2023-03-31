import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { concatMap, exhaustMap, Observable, of, tap } from 'rxjs';
import { Order, OrderItem } from 'src/app/modules/orders/models/order';
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
  readonly fcmToke$ = this.select(state => state.fcmToken);

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
          console.log({
            ...state,
            items: [...items],
          });
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
      tap(console.log),
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
      } as OrderItem;

      item.product.extraGroups.forEach(extraGroup => {
        let extraIds: string[] = [];
        if (extraGroup.selectionType === 'CHECKBOX') {
          extraIds = extraGroup.extras.filter(extra => extra.selected).map(x => x.id);
        }
        if (extraGroup.selectionType === 'RADIO_GROUP' && extraGroup.selected) {
          extraIds.push(extraGroup.selected);
        }
        orderItem.extraIds = orderItem.extraIds.concat(extraIds);
      });

      order.totalPrice += orderItem.unitPrice * orderItem.quantity;
      order.orderItems.push(orderItem);
    });

    order.totalPrice += state.tip;
    return of(order);
  }
}
