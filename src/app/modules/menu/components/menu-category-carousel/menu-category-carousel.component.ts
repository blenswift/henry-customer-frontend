import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Category } from 'src/app/shared/models/category';
import { CategoryComponent } from './category/category.component';

@Component({
  selector: 'oxp-menu-category-carousel',
  standalone: true,
  imports: [CommonModule, CategoryComponent, MatDividerModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './menu-category-carousel.component.html',
  styleUrls: ['./menu-category-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuCategoryCarouselComponent {
  _categories: Category[] | null = [];
  @Input()
  public set categories(value: Category[] | null) {
    if (value) {
      this.categorySelected = value.filter(x => x.selected)[0] ?? null;
      this._categories = value;
    }
  }

  public get categories(): Category[] | null {
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
    this.categories = structuredClone(this.categories);
  }
}
