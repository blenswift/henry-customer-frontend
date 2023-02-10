import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Menu } from './../models/menu';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  url = environment.apiUrl + '/menu';

  constructor(private httpClient: HttpClient) {}

  public getMenu(qrCode: string, language: string): Observable<Menu> {
    return this.httpClient.get<Menu>(this.url + '?qrCode=' + qrCode + '&lang=' + language);
  }
}
