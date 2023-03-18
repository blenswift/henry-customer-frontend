import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProductCart } from 'src/app/shared/models/product-cart';
import { SumOfProductsPipe } from 'src/app/shared/pipes/sum-of-products.pipe';
import { ShoppingCartState, ShoppingCartStore } from 'src/app/shared/services/shopping-cart.store';
import { PaymentType } from '../orders/models/order';
import { RestaurantStore } from './../menu/services/restaurant.store';
import { CartHeaderComponent } from './components/cart-header/cart-header.component';
import { CartMainComponent } from './components/cart-main/cart-main.component';

@Component({
  selector: 'oxp-shopping-cart-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    CartHeaderComponent,
    CartMainComponent,
    SumOfProductsPipe,
    RouterModule,
    TranslateModule,
    MatSnackBarModule,
  ],
  templateUrl: './shopping-cart-dialog.component.html',
  styleUrls: ['./shopping-cart-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RestaurantStore],
})
export class ShoppingCartDialogComponent {
  private shoppingCartStore = inject(ShoppingCartStore);
  private restaurantStore = inject(RestaurantStore);
  router = inject(Router);
  translateService = inject(TranslateService);

  public shoppingCartVm$ = this.shoppingCartStore.vm$;
  public restaurantInfoVm$ = this.restaurantStore.info$;

  constructor() {
    this.shoppingCartStore.loadCache(sessionStorage.getItem('qrcode')!);
    this.restaurantStore.load(sessionStorage.getItem('qrcode')!);
  }

  bezahlen(cart: ShoppingCartState) {
    this.shoppingCartStore.createOrder(cart);
  }

  removeProduct(product: ProductCart) {
    this.shoppingCartStore.removeItem(product);
  }

  paymentTypeChanged(paymentType: PaymentType) {
    this.shoppingCartStore.setPaymentType(paymentType);
  }

  tipChanged(tip: number) {
    this.shoppingCartStore.setTip(tip);
  }
}
