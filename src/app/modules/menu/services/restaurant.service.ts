import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getApiUrl } from 'src/app/shared/utils/apiUtils';
import { Restaurant } from '../models/restaurant';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  url = getApiUrl() + '/restaurant-infos';
  urlServiceStaff = getApiUrl() + '/service-staff';

  constructor(private httpClient: HttpClient) {}

  public getRestaurant(qrCode: string): Observable<Restaurant> {
    return this.httpClient.get<Restaurant>(this.url + '?qrCodeId=' + qrCode);
  }

  public callService(qrCode: string): Observable<void> {
    return this.httpClient.post<void>(this.urlServiceStaff, { qrCode });
  }
}
