import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Menu } from './../models/menu';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  url = environment.apiUrl + '/menu';

  constructor(private httpClient: HttpClient, private translateService: TranslateService) {}

  public getMenu(qrCode: string): Observable<Menu> {
    console.log(navigator.language);
    return this.httpClient.get<Menu>(this.url + '?qrCode=' + qrCode + '&lang=' + this.translateService.currentLang);
  }
}
