import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Product } from 'src/app/shared/models/product';
import { CartProductComponent } from './cart-product/cart-product.component';

@Component({
  selector: 'oxp-cart-main',
  standalone: true,
  imports: [
    CommonModule,

    MatFormFieldModule,
    FormsModule,

    MatChipsModule,
    CartProductComponent,
  ],
  templateUrl: './cart-main.component.html',
  styleUrls: ['./cart-main.component.scss'],
})
export class CartMainComponent {
  @Input() products: Product[] = [];
  @Output() removeProduct = new EventEmitter<Product>();

  addCustomTip() {
    console.log('POPUP FÜR EINGABE ÖFFNEN');
  }
}
