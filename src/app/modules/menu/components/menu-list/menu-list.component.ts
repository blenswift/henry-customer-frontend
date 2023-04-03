import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Product } from 'src/app/shared/models/product';
import { Filter } from '../../services/restaurant.store';
import { MenuFilterSheetComponent } from './menu-filter-sheet/menu-filter-sheet.component';
import { ProductCardComponent } from './product-card/product-card.component';

@Component({
  selector: 'oxp-menu-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, MatIconModule, MatButtonModule, MenuFilterSheetComponent, MatChipsModule],
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuListComponent {
  @Input() products: Product[] | null = [];
  @Input() filters: Filter[] | null = [];
  @Output() openProductModal = new EventEmitter<Product>();
  @Output() filtersChange = new EventEmitter<Filter[]>();

  constructor(private _bottomSheet: MatBottomSheet) {}

  openFilterSheet(): void {
    const bottomSheetRef = this._bottomSheet.open(MenuFilterSheetComponent, {
      data: structuredClone(this.filters),
    });

    bottomSheetRef.afterDismissed().subscribe((filters: Filter[]) => {
      if (filters) {
        this.filtersChange.emit(filters);
      }
    });
  }

  removeFilter(filter: Filter) {
    filter.active = false;
    if (this.filters) {
      this.filtersChange.emit(this.filters);
    }
  }
}
