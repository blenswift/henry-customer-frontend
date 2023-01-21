import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'oxp-order-header-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatBadgeModule,
  ],
  templateUrl: './order-header-toolbar.component.html',
  styleUrls: ['./order-header-toolbar.component.scss'],
})
export class OrderHeaderToolbarComponent {
  _itemCount: number | null = 0;
  @Input() set itemCount(value: number | null) {
    this._itemCount = value;
  }

  get itemCount(): number {
    return this._itemCount ?? 0;
  }
}
