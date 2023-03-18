import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { switchMap, tap } from 'rxjs';
import { OrderStore } from './services/order.store';

@Component({
  selector: 'oxp-orders',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, TranslateModule, MatProgressSpinnerModule],
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

  navigate() {
    this.router.navigate(['/products/' + sessionStorage.getItem('qrcode')]);
  }
}
