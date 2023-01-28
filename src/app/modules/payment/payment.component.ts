import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ShoppingCartService } from './../../shared/services/shopping-cart.service';
import { OrderService } from './services/order.service';

@Component({
  selector: 'oxp-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  shoppingcartService = inject(ShoppingCartService);
  orderService = inject(OrderService);

  ngOnInit(): void {
    const order = this.shoppingcartService.getOrder(0);
    this.orderService
      .createOrder('55c410d0-3abb-442e-855c-d13dd04018a9', order)
      .subscribe(data => {
        window.location.href = data.url;
      });

    console.log(JSON.stringify(this.shoppingcartService.getOrder(0)));
  }
}
