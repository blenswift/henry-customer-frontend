import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeaderComponent } from 'src/app/shared/components/page-header/page-header.component';
declare let SumUpCard: any;

@Component({
  selector: 'oxp-sumup-widget',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, TranslateModule],
  templateUrl: './sumup-widget.component.html',
  styleUrls: ['./sumup-widget.component.scss'],
})
export default class SumupWidgetComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);

  navigateToCart() {
    this.router.navigate(['/shoppingcart']);
  }

  ngOnInit(): void {
    SumUpCard.mount({
      id: 'sumup-card',
      checkoutId: this.route.snapshot.params['id'],
      onResponse: (type: any, body: any) => {
        if (body['status'] === 'PAID') {
          this.router.navigate(['/orders'], { queryParams: { trackingId: body['reference'] } });
        }
      },
    });
  }
}
