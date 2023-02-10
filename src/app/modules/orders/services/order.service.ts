import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';
import { OrderTracking } from '../models/order-tracking';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  url = environment.apiUrl + '/orders';

  private items = new BehaviorSubject<OrderTracking[]>([]);
  public items$ = this.items.asObservable();

  constructor(private httpClient: HttpClient, private shoppingCartService: ShoppingCartService) {
    const items: string | null = localStorage.getItem('orderTracking');

    if (items) {
      this.items.next(JSON.parse(items));
    }

    this.items$.subscribe((items: OrderTracking[]) => localStorage.setItem('orderTracking', JSON.stringify(items)));
  }

  public cacheOrder(trackingId: string): Observable<OrderTracking> {
    if (trackingId) {
      this.shoppingCartService.clearShoppingCart();
      return this.httpClient.get<OrderTracking>(this.url + '/' + trackingId).pipe(
        tap(item => {
          const orders = this.items.value;
          orders.push(item);
          this.items.next(orders);
        })
      );
    }
    return of();
  }

  public createOrder(qrCode: string, order: Order): Observable<{ url: string }> {
    return this.httpClient.post<{ url: string }>(this.url + '/' + qrCode, order);
  }

  public getOrderTracking(trackingId: string): Observable<OrderTracking> {
    return this.httpClient.get<OrderTracking>(this.url + '/' + trackingId);
  }
}
