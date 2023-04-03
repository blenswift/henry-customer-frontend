import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
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
export class OrdersComponent {
  orderStore = inject(OrderStore);
  route = inject(ActivatedRoute);
  router = inject(Router);
  translateService = inject(TranslateService);

  orders$ = this.route.queryParams.pipe(
    tap(() => this.orderStore.loadCache(sessionStorage.getItem('qrcode')!)),
    tap(params => this.orderStore.cacheOrder(params['trackingId'])),
    switchMap(() => this.orderStore.orders$)
  );

  ordersOlderThanAWeek$ = this.orders$.pipe(
    map(orders => orders.filter((x: OrderTracking) => moment(x.createdAt).add(7, 'days').isBefore(moment())))
  );
  ordersLastWeek$ = this.orders$.pipe(
    map(orders => orders.filter((x: OrderTracking) => moment(x.createdAt).add(7, 'days').isAfter(moment())))
  );

  navigate() {
    this.router.navigate(['/products/' + sessionStorage.getItem('qrcode')]);
  }

  navigateToOrder(order: OrderTracking) {
    this.router.navigate(['/order-details/' + order.trackingId]);
  }
}
