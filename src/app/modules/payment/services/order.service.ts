import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  url = environment.apiUrl + '/orders';

  constructor(private httpClient: HttpClient) {}

  public createOrder(
    qrCode: string,
    order: Order
  ): Observable<{ url: string }> {
    return this.httpClient.post<{ url: string }>(
      this.url + '/' + qrCode,
      order
    );
  }
}
