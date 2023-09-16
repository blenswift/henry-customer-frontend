import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MomentPipe } from 'src/app/shared/pipes/moment.pipe';
import { OrderPaymentTypeToIconPipe } from '../../pipes/order-payment-type-to-icon.pipe';
import { OrderTracking } from './../../models/order-tracking';

@Component({
  selector: 'oxp-order',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
    OrderPaymentTypeToIconPipe,
    MomentPipe,
    MatDividerModule,
    MatIconModule,
    TranslateModule,
  ],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
  @Input() order!: OrderTracking;
  @Output() openOrder = new EventEmitter<void>();

  translateService = inject(TranslateService);
}
