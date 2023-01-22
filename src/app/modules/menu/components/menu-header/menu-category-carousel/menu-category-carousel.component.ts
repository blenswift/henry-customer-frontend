import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../../../../shared/models/category';
import { CategoryComponent } from './category/category.component';

@Component({
  selector: 'oxp-menu-category-carousel',
  standalone: true,
  imports: [CommonModule, CategoryComponent],
  templateUrl: './menu-category-carousel.component.html',
  styleUrls: ['./menu-category-carousel.component.scss'],
})
export class MenuCategoryCarouselComponent {
  @Input() categories: Category[] | undefined = [];
  @Output() categoryClicked = new EventEmitter<Category>();
}
