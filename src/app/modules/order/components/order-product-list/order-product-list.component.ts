import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';

@Component({
  selector: 'oxp-order-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './order-product-list.component.html',
  styleUrls: ['./order-product-list.component.scss'],
})
export class OrderProductListComponent {
  @Input() products: string[] = [];
}
