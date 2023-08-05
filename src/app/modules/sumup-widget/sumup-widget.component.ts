import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { PageHeaderComponent } from 'src/app/shared/components/page-header/page-header.component';
declare let SumUpCard: any;
declare let ApplePaySession: any;

@Component({
  selector: 'oxp-sumup-widget',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, TranslateModule],
  templateUrl: './sumup-widget.component.html',
  styleUrls: ['./sumup-widget.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class SumupWidgetComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  httpClient = inject(HttpClient);

  navigateToCart() {
    this.router.navigate(['/shoppingcart']);
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
  }

  public testApplePay() {
    const paymentRequest = {
      currencyCode: 'EUR',
      countryCode: 'DE',
      merchantCapabilities: ['supports3DS'],
      supportedNetworks: ['masterCard', 'visa'],
      total: {
        label: 'Diplomatic Consulting Ltd.',
        amount: '1.20',
        type: 'final',
      },
    };

    if ((window as any).ApplePaySession && ApplePaySession.canMakePayments()) {
      const session = new ApplePaySession(3, paymentRequest);

      session.onvalidatemerchant = (event: any) => {
        // Rufen Sie Ihren Server auf, um das Merchant Validation Certificate zu erhalten
        const validationURL = event.validationURL;
        console.log("validation: " + validationURL);

        //{"target":"https://apple-pay-gateway.apple.com/paymentservices/startSession","context":"pay.sumup.io"}
        /*const merchantSession = {
          target: validationURL,
          context: 'www.dev.orderxpay.eu',
        };

        this.createMerchantSession(this.route.snapshot.params['id'], merchantSession).subscribe(console.log);*/

        const merchantSession = {
          merchantIdentifier: "merchant.com.blenswift-technology.orderxpay",
          displayName: "QSkip",
          initiative: "web",
          initiativeContext: "www.dev.orderxpay.eu"
        };
        console.log(merchantSession);
        this.createMerchantSessionOxp(this.route.snapshot.params['id'], merchantSession)
        .subscribe((ms:any) => {
          console.log('onvalidatemerchant');
          session.completeMerchantValidation(ms);
        });

        // this.httpClient.get('https://your-server/validate-merchant?validationUrl=' + validationURL).subscribe(response => {
        //   session.completeMerchantValidation(response);
        // });
      };

      session.onpaymentauthorized = (event: any) => {
        // Senden Sie das Zahlungstoken und die Bestell-ID an Ihren Server zur Verarbeitung
        console.log('onpaymentauthorized')
        console.log(event);
        const paymentToken = event.payment.token;
        this.processCheckout(this.route.snapshot.params['id'], paymentToken).subscribe(()=>session.completePayment({status: 0}),console.log);
        //console.log(event);
       /* this.httpClient
          .post('https://your-server/process-payment', { orderId: '123456', paymentToken: paymentToken })
          .subscribe(response => {
            session.completePayment(ApplePaySession.STATUS_SUCCESS);
          });*/
      };

      session.begin();
    } else {
      console.log('????');
      // Behandeln Sie den Fall, dass Apple Pay nicht verfügbar ist
    }
  }
  

  public createMerchantSession(checkoutId: string, merchantSession: any): Observable<any> {
    return this.httpClient.put<any>(`https://api.sumup.com/v0.1/checkouts/${checkoutId}/apple-pay-session`, merchantSession);
  }

  public createMerchantSessionOxp(checkoutId: string, merchantSession: any): Observable<any> {
    return this.httpClient.post<any>(`https://www.dev.orderxpay.eu/apple/orders/${checkoutId}/apple-pay-session`, merchantSession);
  }

  public processCheckout(checkoutId: string, token: any): Observable<any> {
    return this.httpClient.put<any>(`https://api.sumup.com/v0.1/checkouts/${checkoutId}`, {
      "payment_type": "apple_pay",
  "id": "9be2da07-a7bd-4877-bc0a-e16cd909a876",
  "amount": 1.2,
  "currency": "EUR",
  "apple_pay": {
    token: token 
    }});
  }
}
