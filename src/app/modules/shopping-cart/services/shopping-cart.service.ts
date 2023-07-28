import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/modules/orders/models/order';
import { Checkout } from 'src/app/shared/models/checkout';
import { getApiUrl } from 'src/app/shared/utils/apiUtils';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private httpClient = inject(HttpClient);
  url = getApiUrl() + '/orders';

  public createOrder(qrCode: string, order: Order): Observable<Checkout> {
    return this.httpClient.post<Checkout>(this.url + '/' + qrCode, order);
  }
}
