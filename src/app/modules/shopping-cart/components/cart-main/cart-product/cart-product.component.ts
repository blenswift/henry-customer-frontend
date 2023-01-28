import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductCart } from './../../../../../shared/models/product-cart';
import { SumOfProductPipe } from './../../../../../shared/pipes/sum-of-product.pipe';

@Component({
  selector: 'oxp-cart-product',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, SumOfProductPipe],
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss'],
})
export class CartProductComponent {
  @Input() productCart!: ProductCart;
  @Output() removeProduct = new EventEmitter<ProductCart>();
}
