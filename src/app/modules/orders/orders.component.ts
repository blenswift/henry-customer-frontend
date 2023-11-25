import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Observable, map, switchMap, tap } from 'rxjs';
import { PageHeaderComponent } from 'src/app/shared/components/page-header/page-header.component';
import { ShoppingCartState, ShoppingCartStore } from 'src/app/shared/services/shopping-cart.store';
import { ToolbarBottomComponent } from '../../shared/components/toolbar-bottom/toolbar-bottom.component';
import { OrderComponent } from './components/order/order.component';
import { OrderTracking } from './models/order-tracking';
import { OrderStore } from './services/order.store';

@Component({
  selector: 'oxp-orders',
  standalone: true,
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    OrderComponent,
    PageHeaderComponent,
    ToolbarBottomComponent,
  ],
})
export default class OrdersComponent {
  orderStore = inject(OrderStore);
  route = inject(ActivatedRoute);
  router = inject(Router);
  translateService = inject(TranslateService);
  shoppingCartStore = inject(ShoppingCartStore);

  shoppingCart$: Observable<ShoppingCartState> = this.shoppingCartStore.vm$;

  orders$ = this.route.queryParams.pipe(
    tap(() => this.orderStore.loadCache()),
    tap(params => this.orderStore.cacheOrder(params['trackingId'])),
    switchMap(() => this.orderStore.orders$)
  );

  openOrders$ = this.orderStore.orders$.pipe(
    map(orders =>
      orders.filter((x: OrderTracking) => x.status !== 'COMPLETED' && moment(x.createdAt).isAfter(moment().subtract(1, 'days')))
    )
  );

  completedOrders$ = this.orderStore.orders$.pipe(
    map(orders =>
      orders.filter((x: OrderTracking) => x.status === 'COMPLETED' && moment(x.createdAt).isAfter(moment().subtract(1, 'days')))
    )
  );

  olderThanOneDay$ = this.orderStore.orders$.pipe(
    map(orders => orders.filter((x: OrderTracking) => moment(x.createdAt).isBefore(moment().subtract(1, 'days'))))
  );

  navigate() {
    this.router.navigate(['/menu/' + sessionStorage.getItem('qrcode') + '/' + sessionStorage.getItem('restaurantId')]);
  }

  navigateToOrder(order: OrderTracking) {
    this.router.navigate([
      '/order-details/' + order.trackingId + '/' + sessionStorage.getItem('qrcode') + '/' + sessionStorage.getItem('restaurantId'),
    ]);
  }
}
