import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { map, switchMap, tap } from 'rxjs';
import { OrderComponent } from './components/order/order.component';
import { OrderTracking } from './models/order-tracking';
import { OrderStore } from './services/order.store';

@Component({
  selector: 'oxp-orders',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    OrderComponent,
  ],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrdersComponent {
  orderStore = inject(OrderStore);
  route = inject(ActivatedRoute);
  router = inject(Router);
  translateService = inject(TranslateService);

  orders$ = this.route.queryParams.pipe(
    tap(() => this.orderStore.loadCache()),
    tap(params => this.orderStore.cacheOrder(params['trackingId'])),
    switchMap(() => this.orderStore.orders$)
  );

  openOrders$ = this.orderStore.orders$.pipe(map(orders => orders.filter((x: OrderTracking) => x.status !== 'APPROVED')));

  approvedOrders$ = this.orderStore.orders$.pipe(map(orders => orders.filter((x: OrderTracking) => x.status === 'APPROVED')));

  navigate() {
    this.router.navigate(['/menu/' + sessionStorage.getItem('qrcode') + '/' + sessionStorage.getItem('restaurantId')]);
  }

  navigateToOrder(order: OrderTracking) {
    this.router.navigate([
      '/order-details/' + order.trackingId + '/' + sessionStorage.getItem('qrcode') + '/' + sessionStorage.getItem('restaurantId'),
    ]);
  }
}
