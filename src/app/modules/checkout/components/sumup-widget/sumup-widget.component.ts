import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, tap } from 'rxjs';
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

  @ViewChild('submitButton') submitButton!: ElementRef;

  nextStepSubject = new BehaviorSubject<any>(null);
  nextStep$ = this.nextStepSubject.asObservable().pipe(
    tap(data => {
      if (data) {
        setTimeout(() => document.getElementById('submitButton')?.click());
      }
    })
  );

  ngOnInit(): void {
    SumUpCard.mount({
      id: 'sumup-card',
      checkoutId: this.route.snapshot.params['id'],
      onResponse: (type: any, body: any) => {
        if (type === 'auth-screen') {
          this.nextStepSubject.next(body.next_step);
        }

        if (body['status'] === 'PAID') {
          this.router.navigate(['/orders'], { queryParams: { trackingId: body['checkout_reference'] } });
        }
      },
    });
  }
}
