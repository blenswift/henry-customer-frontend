import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { getApiUrl } from 'src/app/shared/utils/apiUtils';
import { OrderTracking } from '../models/order-tracking';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  url = getApiUrl() + '/orders';
  httpClient = inject(HttpClient);
  translateService = inject(TranslateService);
  snackBar = inject(MatSnackBar);
  router = inject(Router);

  public getOrderTracking(trackingId: string): Observable<OrderTracking> {
    return this.httpClient.get<OrderTracking>(this.url + '?trackingId=' + trackingId + '&lang=' + this.translateService.currentLang);
  }

  public getStatusOfOrders(trackingIds: string[]): Observable<OrderTracking[]> {
    return this.httpClient.post<OrderTracking[]>(this.url, trackingIds);
  }

  showSnackbarWhenOrderFinished(order: OrderTracking) {
    navigator.vibrate([100, 30, 100, 30, 100, 30, 200, 30, 200, 30, 200, 30, 100, 30, 100, 30, 100]);
    const snackBarRef = this.snackBar.open('Your order is ready (' + order.orderNumber + ')!', this.translateService.instant('ANZEIGEN'), {
      duration: 30000,
      verticalPosition: 'top',
    });
    snackBarRef.onAction().subscribe(() => {
      this.router.navigate(['/order-details/' + order.trackingId]);
    });
  }
}
