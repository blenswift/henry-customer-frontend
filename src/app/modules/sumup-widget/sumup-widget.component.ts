import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { PageHeaderComponent } from 'src/app/shared/components/page-header/page-header.component';
declare let SumUpCard: any;
declare let google: any;

@Component({
  selector: 'oxp-sumup-widget',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, TranslateModule, GooglePayButtonModule],
  templateUrl: './sumup-widget.component.html',
  styleUrls: ['./sumup-widget.component.scss'],
})
export default class SumupWidgetComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);

  baseRequest = {
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
            gatewayMerchantId: 'exampleGatewayMerchantId',
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'Demo Merchant',
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: '1.20',
      currencyCode: 'EUR',
      countryCode: 'DE',
    },
  };

  obj = {
    payment_type: 'google_pay',
    id: '76e79bd9-236f-4dce-af33-1ffcdc392120',
    amount: 1.2,
    currency: 'EUR',
    google_pay: {
      apiVersionMinor: 0,
      apiVersion: 2,
      paymentMethodData: {
        description: 'Visa •••• 8020',
        tokenizationData: {
          type: 'PAYMENT_GATEWAY',
          token:
            '{"signature":"MEQCIENii/wopYL1IX/1AZsdU/iKNyoiJJM0DM5zQtrvojf+AiBvpxPALUMW9eLYx7NU0G/lBhpwbQ4Kn4BFd784BeXnfQ\u003d\u003d","intermediateSigningKey":{"signedKey":"{"keyValue":"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAExGM+HkzIK7vAqc1HQgfQKSpK9w9zmZvn+w68Fn9FrVFUijDEg0R3REHWYKnNSEI2odK3lw1C9qlEXIXrPhPiWg\\u003d\\u003d","keyExpiration":"1690055951355"}","signatures":["MEQCIAeTbtrW1rJH+fbT9NMYzcn13oxeHU6lGqz9JA6l8tqJAiBMbeEjKwfHe/Hv65k0o6yiGp0bw5DLA2y0XJqjW1lDew\u003d\u003d"]},"protocolVersion":"ECv2","signedMessage":"{"encryptedMessage":"CdZqf5HZ6NUqrh56wA/uA5ATosipH/DiafAduv5AI79SnhjLPFaw0LM09N+oBb2vWEc4jJwBAwt/J4Ert5cs5uiaU0+joR39eugbI+pRMPzHNEBM0M5ZHPe5lTbZnb0iQs9XpUi+/sIAwcOrc9+tPB+ojc246fZ2LFnhK5a8L6DpE6msKxDGllsAO1Kn+hNlsUhj/aNqwwv5EV1dN+CmJccZtan9kZaaivQ3Ahh8TFvu0AARE8zXdiyPaFer5x6+TXz17iU6MagJn0yW4TCD106vNOLBR3MZvL57jCHot2Bq58M8OpDwexwWt5SPrPU3iG4yUnCRS2YG2+noz1qB3KVgwwRd3OMLPNw8tcFRaIDxxZOO0V2Ld5t6SP7VrR3w1C15J710VKyJG0TcYY8U9UxHKvNLxqGHBO5eG2b6bJnrsAmfSpvR5lEFkSEVWX1J4JQhpVkRm44Bt8HJNj3HpcpLPvQBzw2AAMUqgINYtiKYDd2/QwvaEvx3jCM0kzYcq8bHh5Z/liR1/WKmWVNzDKiIvucxQJTVsCBlaohmbSucxncQQ6IguGPJv4Xu3lhLjSiO/smO29L2Apu0PZQ9vTyPJaH+I3E\\u003d","ephemeralPublicKey":"BCG/uGY1gFCMNcDvFZSazmbmPKf39BEACtJAvKnbV90127oC0ZNKhVIABETeXrmqXahF0JGZS8fxjYxY7t8I3pA\\u003d","tag":"nQHvUwGc3N24NJvItBXEJGK5I2Kqga8wDHscLqcLuSI\\u003d"}"}',
        },
        type: 'CARD',
        info: {
          cardNetwork: 'VISA',
          cardDetails: '8020',
        },
      },
    },
  };

  onLoadPaymentData(data: any) {
    console.log(data);
  }

  navigateToCart() {
    this.router.navigate(['/shoppingcart']);
  }

  httpClient = inject(HttpClient);

  public createOrder(test: any): Observable<any> {
    return this.httpClient.put<any>('https://api.sumup.com/v0.1/checkouts/76e79bd9-236f-4dce-af33-1ffcdc392120', test, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  ngOnInit(): void {
    SumUpCard.mount({
      id: 'sumup-card',
      checkoutId: this.route.snapshot.params['id'],
      onResponse: (type: any, body: any) => {
        if (body['status'] === 'PAID') {
          this.router.navigate(['/orders'], { queryParams: { trackingId: body['checkout_reference'] } });
        }
      },
    });

    this.createOrder(this.obj).subscribe(
      data => console.log(data),
      err => console.log(err)
    );

    // const paymentsClient = new google.payments.api.PaymentsClient({
    //   environment: 'TEST',
    // });

    // const isReadyToPayRequest = Object.assign({}, baseRequest);
    // isReadyToPayRequest.allowedPaymentMethods = baseRequest.allowedPaymentMethods;

    // paymentsClient
    //   .isReadyToPay(isReadyToPayRequest)
    //   .then(function (response: any) {
    //     if (response.result) {
    //       // add a Google Pay payment button
    //       const button = paymentsClient.createButton({ onClick: () => console.log('TODO: click handler'), allowedPaymentMethods: [] });
    //       document.getElementById('container')!.appendChild(button);

    //       baseRequest.allowedPaymentMethods[0]['merchantInfo'] = {
    //         merchantId: 'your_merchant_id',
    //         merchantName: 'your_merchant_name',
    //       };

    //       baseRequest.allowedPaymentMethods[0]['transactionInfo'] = {
    //         totalPriceStatus: 'FINAL',
    //         totalPriceLabel: 'Total',
    //         totalPrice: '1.20',
    //         currencyCode: 'EUR',
    //         countryCode: 'DE',
    //       };

    //       paymentsClient
    //         .loadPaymentData(baseRequest)
    //         .then(function (paymentData: any) {
    //           // if using gateway tokenization, pass this token without modification
    //           const paymentToken = paymentData.paymentMethodData.tokenizationData.token;
    //           console.log(paymentData);
    //         })
    //         .catch(function (err: any) {
    //           // show error in developer console for debugging
    //           console.error(err);
    //         });
    //     }
    //   })
    //   .catch(function (err: any) {
    //     // show error in developer console for debugging
    //     console.error(err);
    //   });
  }
}
