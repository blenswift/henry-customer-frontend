import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Filter } from '../../../services/restaurant.store';

@Component({
  selector: 'oxp-menu-filter-sheet',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatChipsModule, TranslateModule],
  templateUrl: './menu-filter-sheet.component.html',
  styleUrls: ['./menu-filter-sheet.component.scss'],
})
export class MenuFilterSheetComponent {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<MenuFilterSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public filters: Filter[]
  ) {}

  filtern(event: MouseEvent): void {
    this._bottomSheetRef.dismiss(this.filters);
    event.preventDefault();
  }
}
