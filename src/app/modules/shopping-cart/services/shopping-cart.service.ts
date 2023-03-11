import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/modules/orders/models/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private httpClient = inject(HttpClient);
  url = environment.apiUrl + '/orders';

  public createOrder(qrCode: string, order: Order): Observable<{ url: string }> {
    return this.httpClient.post<{ url: string }>(this.url + '/' + qrCode, order);
  }
}
