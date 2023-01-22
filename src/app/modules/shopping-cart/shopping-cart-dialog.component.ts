import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Product } from './../../shared/models/product';
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
  ],
  templateUrl: './shopping-cart-dialog.component.html',
  styleUrls: ['./shopping-cart-dialog.component.scss'],
})
export class ShoppingCartDialogComponent {
  constructor(public shoppingcartService: ShoppingCartService) {}

  removeProduct(product: Product) {
    this.shoppingcartService.remove(product);
  }
}
