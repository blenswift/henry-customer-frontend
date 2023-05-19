import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { RestaurantStore } from './../../services/restaurant.store';

@Component({
  selector: 'oxp-bottom-sheet',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, TranslateModule],
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
  providers: [RestaurantStore],
})
export class BottomSheetComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>, private restaurantStore: RestaurantStore) {}

  callService(event: MouseEvent): void {
    const qrcode = sessionStorage.getItem('qrcode');
    this.restaurantStore.callService(qrcode!);
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  showImpressum() {
    window.location.href = 'https://orderxpay.com/impressum';
  }

  showDatenschutz() {
    window.location.href = 'https://orderxpay.com/datenschutz';
  }
}
