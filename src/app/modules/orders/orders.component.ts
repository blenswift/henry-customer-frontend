import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { concatMap, switchMap } from 'rxjs';
import { OrderService } from './services/order.service';

@Component({
  selector: 'oxp-orders',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, TranslateModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orderService = inject(OrderService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  orders$ = this.route.queryParams.pipe(switchMap(() => this.orderService.items$));

  ngOnInit(): void {
    this.route.queryParams.pipe(concatMap(params => this.orderService.cacheOrder(params['trackingId']))).subscribe();
  }

  navigate() {
    this.router.navigate(['/products/' + sessionStorage.getItem('qrcode')]);
  }
}
