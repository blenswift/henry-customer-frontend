import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { environment } from './../environments/environment';
import { OrderStore } from './modules/orders/services/order.store';
import { ShoppingCartStore } from './shared/services/shopping-cart.store';
// import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import localeDeExtra from '@angular/common/locales/extra/de';
import localeEnExtra from '@angular/common/locales/extra/en';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { TranslateService } from '@ngx-translate/core';
import { getMessaging, getToken, Messaging, onMessage } from 'firebase/messaging';

@Component({
  selector: 'oxp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, MatSnackBarModule],
  providers: [OrderStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private translateService = inject(TranslateService);
  private shoppingCartStore = inject(ShoppingCartStore);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private orderStore = inject(OrderStore);

  constructor(private swPush: SwPush) {
    const language = navigator.language.substring(0, 2);
    const languageExists = ['de', 'en'].includes(language);
    this.translateService.use(languageExists ? language : 'en');
    if (language === 'de') {
      registerLocaleData(localeDe, 'de', localeDeExtra);
    } else {
      registerLocaleData(localeEn, 'en', localeEnExtra);
    }
  }

  subscribeToNotifications() {
    this.swPush
      .requestSubscription({
        serverPublicKey: environment.firebase.vapidKey,
      })
      .then()
      .catch(err => {
        console.error('Could not subscribe to notifications', err);
        // long polling für den Status der Bestellungen sollte keine Push Notifications möglich sein
        this.orderStore.checkOrderStatus();
      });
  }

  ngOnInit(): void {
    this.requestPermission();
    this.subscribeToNotifications();
  }

  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: environment.firebase.vapidKey })
      .then(currentToken => {
        if (currentToken) {
          this.shoppingCartStore.setFcmToken(currentToken);
          this.listen(messaging);
        }
      })
      .catch(err => {
        console.log('An error occurred while retrieving token. ', err);
      });
  }

  listen(messaging: Messaging) {
    onMessage(messaging, payload => {
      navigator.vibrate([100, 30, 100, 30, 100, 30, 200, 30, 200, 30, 200, 30, 100, 30, 100, 30, 100]);
      const snackBarRef = this.snackBar.open(payload.data?.['body'] ?? '', this.translateService.instant('ANZEIGEN'), {
        duration: 30000,
        verticalPosition: 'top',
      });
      snackBarRef.onAction().subscribe(() => {
        this.router.navigate(['/order-details/' + payload.data?.['trackingId']]);
      });
    });
  }
}
