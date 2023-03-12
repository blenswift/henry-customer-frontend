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
  paymentType: PaymentType;
  fcmToken: string | null;
  tip: number;
}

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartStore extends ComponentStore<ShoppingCartState> {
  readonly vm$ = this.select(state => state);

  constructor(private shoppingCartService: ShoppingCartService) {
    super({ items: [], paymentType: 'DIGITAL_PAYMENT', fcmToken: null, tip: 0 });
  }

  addItem = this.effect((productCart$: Observable<ProductCart>) => {
    return productCart$.pipe(
      tap(productCart => {
        console.log(productCart);
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

  removeItem = this.effect((productCart$: Observable<ProductCart>) => {
    return productCart$.pipe(
      tap(productCart => {
        this.patchState(state => {
          const indexOfItem = state.items.indexOf(productCart);
          const items = state.items;
          if (indexOfItem > -1) {
            items.splice(indexOfItem, 1);
          }
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
      items: [],
      paymentType: 'DIGITAL_PAYMENT',
      fcmToken: state.fcmToken,
      tip: 0,
      totalPrice: 0,
    };
  });

  setTip = this.updater((state, tip: number) => ({
    ...state,
    tip,
  }));

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
    } as Order;

    state.items.forEach(item => {
      const orderItem = {
        productId: item.product.id,
        price: item.product.basePrice,
        subTotal: priceOfProduct(item) * item.quantity,
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

      order.totalPrice += orderItem.subTotal;
      order.orderItems.push(orderItem);
    });

    order.totalPrice += state.tip;
    return of(order);
  }
}
