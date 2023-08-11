import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { Category } from 'src/app/shared/models/category';
import { CategoryComponent } from './category/category.component';

@Component({
  selector: 'oxp-menu-category-carousel',
  standalone: true,
  imports: [
    CommonModule,
    CategoryComponent,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    MatBadgeModule,
  ],
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
  @Input()
  public filterCtrl!: FormControl;

  @Output() categoryClicked = new EventEmitter<Category>();

  categorySelected: Category | null = null;

  showSearch = false;

  clicked(category: Category) {
    if (this.categorySelected) {
      this.categorySelected.selected = false;
    }
    this.categorySelected = category;
    this.categorySelected.selected = true;
    this.categoryClicked.emit(category);
    this.categories = structuredClone(this.categories);
  }

  focus() {
    // setTimeout(() => {
    // this will make the execution after the above boolean has changed
    document.getElementById('filterCtrl')?.focus();
    // }, 0);
  }
}
