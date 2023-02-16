import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ProductCardComponent } from './product-card/product-card.component';

@Component({
  selector: 'oxp-menu-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
})
export class MenuListComponent {
  @Input() products: Product[] | null = [];
  @Output() openProductModal = new EventEmitter<Product>();
}
