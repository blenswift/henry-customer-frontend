import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { SumOfProductsPipe } from 'src/app/shared/pipes/sum-of-products.pipe';
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
  public items$ = this.shoppingcartService.items$;
  public tip = 0;

  constructor(
    public shoppingcartService: ShoppingCartService,
    private router: Router
  ) {}

  removeProduct(product: ProductCart) {
    this.shoppingcartService.remove(product);
  }

  payment() {
    this.router.navigate(['/payment']);
  }
}
