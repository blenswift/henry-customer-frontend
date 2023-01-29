import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { SumOfProductsPipe } from 'src/app/shared/pipes/sum-of-products.pipe';
import { OrderService } from '../orders/services/order.service';
import { ProductCart } from './../../shared/models/product-cart';
import { ShoppingCartService } from './../../shared/services/shopping-cart.service';
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
  ],
  templateUrl: './shopping-cart-dialog.component.html',
  styleUrls: ['./shopping-cart-dialog.component.scss'],
})
export class ShoppingCartDialogComponent {
  shoppingcartService = inject(ShoppingCartService);
  orderService = inject(OrderService);
  router = inject(Router);

  public items$ = this.shoppingcartService.items$;
  public tip = 0;

  removeProduct(product: ProductCart) {
    this.shoppingcartService.remove(product);
  }

  navigateToPayment() {
    const order = this.shoppingcartService.getOrder(this.tip);
    this.orderService
      .createOrder('55c410d0-3abb-442e-855c-d13dd04018a9', order)
      .subscribe(data => {
        window.location.href = data.url;
      });
  }
}
