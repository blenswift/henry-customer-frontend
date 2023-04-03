import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getApiUrl } from 'src/app/shared/utils/apiUtils';
import { OrderTracking } from '../models/order-tracking';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  url = getApiUrl() + '/orders';

  constructor(private httpClient: HttpClient) {}

  public getOrderTracking(trackingId: string): Observable<OrderTracking> {
    return this.httpClient.get<OrderTracking>(this.url + '/' + trackingId);
  }
}
