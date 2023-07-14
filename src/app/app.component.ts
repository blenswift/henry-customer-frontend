import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { environment } from './../environments/environment';
import { OrderStore } from './modules/orders/services/order.store';
import { ShoppingCartStore } from './shared/services/shopping-cart.store';
// import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import localeDeExtra from '@angular/common/locales/extra/de';
import localeEnExtra from '@angular/common/locales/extra/en';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { TranslateService } from '@ngx-translate/core';
import { getMessaging, getToken, Messaging, onMessage } from 'firebase/messaging';
import { filter, Observable, tap } from 'rxjs';

// eslint-disable-next-line no-var
declare var ApplePaySession: any;

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
  private route = inject(ActivatedRoute);
  private orderStore = inject(OrderStore);

  // das sollte in eine Initializer Datei ausgelagert werden...
  init$ = this.route.params.pipe(
    filter(params => !!params['qrcode']),
    tap(params => sessionStorage.setItem('qrcode', params['qrcode'])),
    tap(params => this.orderStore.loadCache(params['qrcode'])),
    tap(params => this.shoppingCartStore.loadCache(params['qrcode']))
  );

  constructor(private swPush: SwPush, private httpClient: HttpClient) {
    const language = navigator.language.substring(0, 2);
    const languageExists = ['de', 'en'].includes(language);
    this.translateService.use(languageExists ? language : 'en');
    if (language === 'de') {
      registerLocaleData(localeDe, 'de', localeDeExtra);
    } else {
      registerLocaleData(localeEn, 'en', localeEnExtra);
    }

    const paymentRequest = {
      countryCode: 'DE',
      currencyCode: 'EUR',
      merchantCapabilities: ['supports3DS'],
      supportedNetworks: ['visa', 'masterCard'],
      total: {
        label: 'Your Merchant Name',
        amount: '10.00',
      },
      // Fügen Sie hier die eindeutige Bestell-ID hinzu, die Sie vom Server erhalten haben
      applicationData: '123456',
    };

    if ((window as any).ApplePaySession && ApplePaySession.canMakePayments()) {
      const session = new ApplePaySession(1, paymentRequest);

      session.onvalidatemerchant = (event: any) => {
        // Rufen Sie Ihren Server auf, um das Merchant Validation Certificate zu erhalten
        const validationURL = event.validationURL;
        this.httpClient.get('https://your-server/validate-merchant?validationUrl=' + validationURL).subscribe(response => {
          session.completeMerchantValidation(response);
        });
      };

      session.onpaymentauthorized = (event: any) => {
        // Senden Sie das Zahlungstoken und die Bestell-ID an Ihren Server zur Verarbeitung
        const paymentToken = event.payment.token;
        this.httpClient
          .post('https://your-server/process-payment', { orderId: '123456', paymentToken: paymentToken })
          .subscribe(response => {
            session.completePayment(ApplePaySession.STATUS_SUCCESS);
          });
      };

      session.begin();
    } else {
      console.log('????');
      // Behandeln Sie den Fall, dass Apple Pay nicht verfügbar ist
    }
  }

  public createOrder(test: any): Observable<any> {
    return this.httpClient.post<any>('https://api.sumup.com/v0.1/checkouts', test, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
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
