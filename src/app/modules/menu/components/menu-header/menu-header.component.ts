import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Category } from '../../../../shared/models/category';
import { Restaurant } from './../../models/restaurant';
import { MenuCategoryCarouselComponent } from './menu-category-carousel/menu-category-carousel.component';
import { MenuSearchbarComponent } from './menu-searchbar/menu-searchbar.component';
import { MenuToolbarComponent } from './menu-toolbar/menu-toolbar.component';

@Component({
  selector: 'oxp-menu-header',
  standalone: true,
  imports: [CommonModule, MenuToolbarComponent, MenuSearchbarComponent, MenuCategoryCarouselComponent],
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuHeaderComponent {
  @Input() categories: Category[] | null = [];
  @Input() itemCount = 0;
  @Input() orderCount = 0;
  @Input() restaurant: Restaurant | null = null;
  @Input() filterCtrl!: FormControl;
  @Input() scrolling: boolean | null = false;
  @Output() categoryClick = new EventEmitter<Category>();
}
