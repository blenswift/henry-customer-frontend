import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Category } from './../../../../../shared/models/category';
import { CategoryComponent } from './category/category.component';

@Component({
  selector: 'oxp-order-header-category-carousel',
  standalone: true,
  imports: [CommonModule, CategoryComponent],
  templateUrl: './order-header-category-carousel.component.html',
  styleUrls: ['./order-header-category-carousel.component.scss'],
})
export class OrderHeaderCategoryCarouselComponent {
  @Input() categories: Category[] = [];
}
