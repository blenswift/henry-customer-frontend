import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CounterButtonComponent } from 'src/app/shared/components/counter-button/counter-button.component';
import { Product } from './../../shared/models/product';
import { ShoppingCartService } from './../../shared/services/shopping-cart.service';

@Component({
  selector: 'oxp-shopping-cart-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    CounterButtonComponent,
    MatDialogModule,
    FormsModule,
    MatIconModule,
    RouterModule,
    MatChipsModule,
  ],
  templateUrl: './shopping-cart-dialog.component.html',
  styleUrls: ['./shopping-cart-dialog.component.scss'],
})
export class ShoppingCartDialogComponent {
  constructor(public shoppingcartService: ShoppingCartService) {}

  addCustomTip() {
    console.log('POPUP FÜR EINGABE ÖFFNEN');
  }

  removeProduct(product: Product) {
    this.shoppingcartService.remove(product);
  }
}
