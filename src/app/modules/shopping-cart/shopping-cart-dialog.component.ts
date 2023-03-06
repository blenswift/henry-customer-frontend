import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { concatMap, exhaustMap, of, Subject, tap } from 'rxjs';
import { ProductCart } from 'src/app/shared/models/product-cart';
import { SumOfProductsPipe } from 'src/app/shared/pipes/sum-of-products.pipe';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { PaymentType } from '../orders/models/order';
import { OrderService } from '../orders/services/order.service';
import { CartHeaderComponent } from './components/cart-header/cart-header.component';
import { CartMainComponent } from './components/cart-main/cart-main.component';

@Component({
  selector: 'oxp-shopping-cart-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, CartHeaderComponent, CartMainComponent, SumOfProductsPipe, RouterModule, TranslateModule],
  templateUrl: './shopping-cart-dialog.component.html',
  styleUrls: ['./shopping-cart-dialog.component.scss'],
})
export class ShoppingCartDialogComponent implements OnInit {
  shoppingcartService = inject(ShoppingCartService);
  translateService = inject(TranslateService);
  orderService = inject(OrderService);
  router = inject(Router);
  angularFireMessaging = inject(AngularFireMessaging);
  paymentType: PaymentType = 'DIGITAL_PAYMENT';

  bezahlenTrigger = new Subject<void>();

  public items$ = this.shoppingcartService.items$;
  public tip = 0;

  ngOnInit(): void {
    this.bezahlenTrigger
      .pipe(
        concatMap(() => {
          const order = this.shoppingcartService.getOrder(this.tip);
          order.paymentMethod = this.paymentType;
          order.fcmToken = this.shoppingcartService.fcmToken.value;
          return of(order);
        }),
        exhaustMap(order =>
          this.orderService.createOrder(sessionStorage.getItem('qrcode')!, order).pipe(tap(data => (window.location.href = data.url)))
        )
      )
      .subscribe();
  }

  removeProduct(product: ProductCart) {
    this.shoppingcartService.remove(product);
  }

  paymentTypeChanged(paymentType: PaymentType) {
    this.paymentType = paymentType;
  }
}
