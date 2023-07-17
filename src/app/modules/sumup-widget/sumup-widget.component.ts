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
      merchantId: 'BCR2DN4TR3IL7SSC',
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

  onLoadPaymentData(data: any) {
    console.log(data);

    const temp = {
      payment_type: 'google_pay',
      id: this.route.snapshot.params['id'],
      amount: 1.2,
      currency: 'EUR',
      google_pay: data['detail'],
    };

    console.log(temp);

    this.createOrder(temp, this.route.snapshot.params['id']).subscribe(data => console.log(data));
  }

  navigateToCart() {
    this.router.navigate(['/shoppingcart']);
  }

  httpClient = inject(HttpClient);

  public createOrder(test: any, checkoutId: string): Observable<any> {
    return this.httpClient.put<any>('https://api.sumup.com/v0.1/checkouts/' + checkoutId, test, {
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
