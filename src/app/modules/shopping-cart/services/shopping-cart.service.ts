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

  public createOrder(qrCode: string, order: Order): Observable<{ url: string }> {
    return this.httpClient.post<{ url: string }>(this.url + '/' + qrCode, order);
  }
}
