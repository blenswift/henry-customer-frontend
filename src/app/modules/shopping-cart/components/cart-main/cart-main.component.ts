import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { TranslateModule } from '@ngx-translate/core';
import { PaymentType } from 'src/app/modules/orders/models/order';
import { ProductCart } from 'src/app/shared/models/product-cart';
import { CartProductComponent } from './cart-product/cart-product.component';

@Component({
  selector: 'oxp-cart-main',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, FormsModule, MatChipsModule, CartProductComponent, MatRadioModule, TranslateModule],
  templateUrl: './cart-main.component.html',
  styleUrls: ['./cart-main.component.scss'],
})
export class CartMainComponent {
  @Input() products: ProductCart[] = [];
  @Output() removeProduct = new EventEmitter<ProductCart>();
  @Output() tipChanged = new EventEmitter<number | null>();
  @Output() paymentTypeChange = new EventEmitter<PaymentType>();

  addCustomTip() {
    console.log('POPUP FÜR EINGABE ÖFFNEN');
  }
}
