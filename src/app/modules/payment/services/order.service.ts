import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  url = environment.apiUrl + '/orders';

  constructor(private httpClient: HttpClient) {}

  public getMenu(qrCode: string, language: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      this.url + '/qrCode=' + qrCode + 'lang=' + language
    );
  }
}
