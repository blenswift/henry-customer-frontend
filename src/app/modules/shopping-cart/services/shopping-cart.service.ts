import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/modules/orders/models/order';
import { getApiUrl } from 'src/app/shared/utils/apiUtils';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private httpClient = inject(HttpClient);
  url = getApiUrl() + '/orders';

  public createOrder(qrCode: string, order: Order): Observable<{ redirectUrl: string; checkoutId: string; PaymentProvider: string }> {
    return this.httpClient.post<{ redirectUrl: string; checkoutId: string; PaymentProvider: string }>(this.url + '/' + qrCode, order);
  }
}
