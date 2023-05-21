import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable, switchMap } from 'rxjs';
import { MomentPipe } from 'src/app/shared/pipes/moment.pipe';
import { OrderTracking } from '../orders/models/order-tracking';
import { OrderTrackingTypeToIconPipe } from '../orders/pipes/order-tracking-type-to-icon.pipe';
import { PageHeaderComponent } from './../../shared/components/page-header/page-header.component';
import { OrderService } from './../orders/services/order.service';
import { ExtrasShortPipe } from './pipes/extras-short.pipe';

@Component({
  selector: 'oxp-order-detail',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    TranslateModule,
    MatCardModule,
    ExtrasShortPipe,
    MatListModule,
    MatIconModule,
    MatChipsModule,
    OrderTrackingTypeToIconPipe,
    MomentPipe,
    MatProgressSpinnerModule,
  ],
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export default class OrderDetailComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  orderService = inject(OrderService);
  translateService = inject(TranslateService);

  order$: Observable<OrderTracking> = this.route.paramMap.pipe(
    switchMap(params => this.orderService.getOrderTracking(params.get('trackingId')!))
  );

  navigateToProducts() {
    this.router.navigate(['/products/' + sessionStorage.getItem('qrcode')]);
  }

  downloadBill() {
    console.log('BILLDOWNLOAD');
  }

  updateStatus() {
    this.order$ = this.orderService.getOrderTracking(this.route.snapshot.params['trackingId']!);
  }
}
