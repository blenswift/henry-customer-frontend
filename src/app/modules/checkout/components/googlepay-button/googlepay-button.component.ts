import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { Observable, map, of, switchMap } from 'rxjs';
import { SumOfProductsPipe } from 'src/app/shared/pipes/sum-of-products.pipe';
import { ShoppingCartStore } from 'src/app/shared/services/shopping-cart.store';
declare let google: any;

@Component({
  selector: 'oxp-googlepay-button',
  standalone: true,
  imports: [CommonModule, GooglePayButtonModule],
  providers: [SumOfProductsPipe],
  templateUrl: './googlepay-button.component.html',
  styleUrls: ['./googlepay-button.component.scss'],
})
export class GooglepayButtonComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  httpClient = inject(HttpClient);
  shoppingCartStore = inject(ShoppingCartStore);
  sumOfProductsPipe = inject(SumOfProductsPipe);

  @ViewChild('autoSubmitForm') autoSubmitForm!: any;

  nextStep: any | null = null;

  paymentDataRequest$ = this.shoppingCartStore.vm$.pipe(
    map(x => this.sumOfProductsPipe.transform(x.items, x.tip)),
    switchMap(price => {
      return of({
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
          {
            type: 'CARD',
            parameters: {
              allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
              allowedCardNetworks: ['MASTERCARD', 'VISA'],
            },
            tokenizationSpecification: {
              type: 'PAYMENT_GATEWAY',
              parameters: {
                gateway: 'sumup',
                gatewayMerchantId: 'MCKL6CKF',
              },
            },
          },
        ],
        merchantInfo: {
          merchantId: 'BCR2DN4TR3IL7SSC',
          merchantName: 'Blenswift Technology Gmbh',
        },
        transactionInfo: {
          totalPriceStatus: 'FINAL',
          totalPriceLabel: 'Total',
          totalPrice: '' + price / 100,
          currencyCode: 'EUR',
          countryCode: 'DE',
        },
      } as google.payments.api.PaymentDataRequest);
    })
  );

  onLoadPaymentData(data: any) {
    const paymentData = {
      payment_type: 'google_pay',
      id: this.route.snapshot.params['id'],
      amount: 1.2,
      currency: 'EUR',
      google_pay: data['detail'],
    };

    this.createOrder(paymentData).subscribe(data => {
      console.log(data);
      if (data['checkout_reference']) {
        this.router.navigate(['/orders'], { queryParams: { trackingId: data['checkout_reference'] } });
      } else {
        this.nextStep = data.next_step;
        this.autoSubmitForm.nativeElement.submit();
      }
    });
  }

  public createOrder(paymentData: any): Observable<any> {
    return this.httpClient.put<any>('https://api.sumup.com/v0.1/checkouts/' + this.route.snapshot.params['id'], paymentData, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }
}
