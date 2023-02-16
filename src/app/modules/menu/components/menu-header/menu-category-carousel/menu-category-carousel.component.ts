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
  _categories: Category[] | undefined = [];
  @Input()
  public set categories(value: Category[] | undefined) {
    if (value) {
      this.categorySelected = value?.[0] ?? null;
      this.categorySelected.selected = true;
      this._categories = value;
    }
  }

  public get categories(): Category[] | undefined {
    return this._categories;
  }

  @Output() categoryClicked = new EventEmitter<Category>();

  categorySelected: Category | null = null;

  clicked(category: Category) {
    if (this.categorySelected) {
      this.categorySelected.selected = false;
    }
    this.categorySelected = category;
    this.categorySelected.selected = true;
    this.categoryClicked.emit(category);
  }
}
