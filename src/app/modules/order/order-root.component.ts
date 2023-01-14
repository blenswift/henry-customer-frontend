import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrderHeaderComponent } from './components/order-header/order-header.component';
import { OrderProductListComponent } from './components/order-product-list/order-product-list.component';

@Component({
  selector: 'oxp-order-root',
  standalone: true,
  imports: [CommonModule, OrderProductListComponent, OrderHeaderComponent],
  templateUrl: './order-root.component.html',
  styleUrls: ['./order-root.component.scss'],
})
export class OrderRootComponent {
  products = ['1', '2', '3', '4', '5', '6', '7'];

  categories = [
    {
      selected: true,
      src: 'https://cdn-icons-png.flaticon.com/512/1404/1404945.png',
      title: 'Pizza',
    },
    {
      selected: false,
      src: 'https://cdn-icons-png.flaticon.com/512/184/184559.png',
      title: 'Salat',
    },
    {
      selected: false,
      src: 'https://cdn-icons-png.flaticon.com/512/706/706850.png',
      title: 'Pommes',
    },
    {
      selected: false,
      src: 'https://cdn-icons-png.flaticon.com/512/3654/3654864.png',
      title: 'Nachtisch',
    },
    {
      selected: false,
      src: 'https://cdn-icons-png.flaticon.com/512/2719/2719909.png',
      title: 'Getränke',
    },
  ];
}
