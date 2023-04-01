import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { switchMap } from 'rxjs';
import { PageHeaderComponent } from './../../shared/components/page-header/page-header.component';
import { OrderService } from './../orders/services/order.service';

@Component({
  selector: 'oxp-order-detail',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, TranslateModule],
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  orderService = inject(OrderService);

  order$ = this.route.paramMap.pipe(switchMap(params => this.orderService.getOrderTracking(params.get('trackingId')!)));

  navigateToProducts() {
    this.router.navigate(['/products/' + sessionStorage.getItem('qrcode')]);
  }
}
