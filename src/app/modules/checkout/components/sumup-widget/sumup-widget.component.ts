import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeaderComponent } from 'src/app/shared/components/page-header/page-header.component';
import { GooglepayButtonComponent } from '../googlepay-button/googlepay-button.component';
declare let SumUpCard: any;

@Component({
  selector: 'oxp-sumup-widget',
  standalone: true,
  templateUrl: './sumup-widget.component.html',
  styleUrls: ['./sumup-widget.component.scss'],
  imports: [CommonModule, PageHeaderComponent, TranslateModule, GooglepayButtonComponent],
})
export default class SumupWidgetComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    SumUpCard.mount({
      id: 'sumup-card',
      checkoutId: this.route.snapshot.params['id'],
      onResponse: (type: any, body: any) => {
        if (type === 'auth-screen') {
          console.log('auth');
        }

        if (body['status'] === 'PAID') {
          this.router.navigate(['/orders'], { queryParams: { trackingId: body['checkout_reference'] } });
        }
      },
    });
  }
}
