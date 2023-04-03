import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { getApiUrl } from 'src/app/shared/utils/apiUtils';
import { Menu } from './../models/menu';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  url = getApiUrl() + '/menu';

  constructor(private httpClient: HttpClient, private translateService: TranslateService) {}

  public getMenu(qrCode: string): Observable<Menu> {
    return this.httpClient.get<Menu>(this.url + '?qrCode=' + qrCode + '&lang=' + this.translateService.currentLang);
  }
}
