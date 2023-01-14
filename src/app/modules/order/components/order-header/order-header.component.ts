import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { OrderHeaderCategoryCarouselComponent } from './order-header-category-carousel/order-header-category-carousel.component';
import { OrderHeaderSearchbarComponent } from './order-header-searchbar/order-header-searchbar.component';
import { OrderHeaderToolbarComponent } from './order-header-toolbar/order-header-toolbar.component';

@Component({
  selector: 'oxp-order-header',
  standalone: true,
  imports: [
    CommonModule,
    OrderHeaderToolbarComponent,
    OrderHeaderSearchbarComponent,
    OrderHeaderCategoryCarouselComponent,
  ],
  templateUrl: './order-header.component.html',
  styleUrls: ['./order-header.component.scss'],
})
export class OrderHeaderComponent {
  @Input() categories: any[] = [];
}
