import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ProductCardComponent } from './product-card/product-card.component';

@Component({
  selector: 'oxp-order-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './order-product-list.component.html',
  styleUrls: ['./order-product-list.component.scss'],
})
export class OrderProductListComponent {
  @Input() products: Product[] = [];
  @Output() openProductModal = new EventEmitter<Product>();
}
