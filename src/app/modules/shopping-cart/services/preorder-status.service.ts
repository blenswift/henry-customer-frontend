import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { getApiUrl } from 'src/app/shared/utils/apiUtils';
import { PreorderStatus } from '../models/PreorderStatus';

@Injectable({
  providedIn: 'root',
})
export class PreorderStatusService {
  private httpClient = inject(HttpClient);
  url = getApiUrl() + '/restaurants/preorder-status';

  public getPreorderStatus(qrCode: string): Observable<PreorderStatus> {
    return of({
      currentStatus: {
        isOpen: true,
        preparationTimeMinutes: 22,
      },
      openingHours: {
        today: {
          isOpen: true,
          intervals: [
            {
              start: moment(),
              end: moment().add(10, 'hours'),
            },
          ],
        },
        tomorrow: {
          isOpen: true,
          intervals: [
            {
              start: moment().add(1, 'days').add(-3, 'hours'),
              end: moment().add(1, 'days').add(-3, 'hours').add(2, 'hours'),
            },
          ],
        },
      },
    } as PreorderStatus);
    // return this.httpClient.get<PreorderStatus>(this.url + '/' + qrCode);
  }
}
