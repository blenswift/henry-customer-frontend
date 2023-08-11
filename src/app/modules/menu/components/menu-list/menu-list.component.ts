import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Product } from 'src/app/shared/models/product';
import { Filter } from '../../services/restaurant.store';
import { ProductCardComponent } from './product-card/product-card.component';

@Component({
  selector: 'oxp-menu-list',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    TranslateModule,
    MatDividerModule,
    ScrollingModule,
    TranslateModule,
  ],
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuListComponent {
  @Input() products: Product[] | null = [];
  @Input() filters: Filter[] | null = [];
  @Output() openProductModal = new EventEmitter<Product>();
}
