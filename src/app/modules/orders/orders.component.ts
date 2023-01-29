import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { OrderService } from './services/order.service';

@Component({
  selector: 'oxp-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  orderService = inject(OrderService);
  route = inject(ActivatedRoute);

  orderTracking$ = this.route.queryParams.pipe(
    tap(console.log),
    switchMap(params =>
      this.orderService.getOrderTracking(params['trackingId'])
    )
  );
}
