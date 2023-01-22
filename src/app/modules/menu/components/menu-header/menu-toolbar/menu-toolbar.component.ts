import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Restaurant } from './../../../models/restaurant';

@Component({
  selector: 'oxp-menu-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatBadgeModule,
  ],
  templateUrl: './menu-toolbar.component.html',
  styleUrls: ['./menu-toolbar.component.scss'],
})
export class MenuToolbarComponent {
  _itemCount: number | null = 0;
  @Input() set itemCount(value: number | null) {
    this._itemCount = value;
  }

  get itemCount(): number {
    return this._itemCount ?? 0;
  }

  @Input() restaurant: Restaurant | null = null;
}
