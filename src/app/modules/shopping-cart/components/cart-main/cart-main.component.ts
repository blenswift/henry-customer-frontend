import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { distinctUntilChanged } from 'rxjs';
import { CounterButtonComponent } from 'src/app/shared/components/counter-button/counter-button.component';
import { PreorderStatus } from '../../models/PreorderStatus';
import { Restaurant } from './../../../menu/models/restaurant';
import { CartProductComponent } from './cart-product/cart-product.component';
import { CartTimeslotsTakeawayComponent } from './cart-timeslots-takeaway/cart-timeslots-takeaway.component';

@Component({
  selector: 'oxp-cart-main',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatChipsModule,
    CartProductComponent,
    MatRadioModule,
    TranslateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    CurrencyPipe,
    CounterButtonComponent,
    CartTimeslotsTakeawayComponent,
  ],
  templateUrl: './cart-main.component.html',
  styleUrls: ['./cart-main.component.scss'],
})
export class CartMainComponent implements OnInit {
  _form!: FormGroup;
  @Input()
  public set form(value: FormGroup) {
    if (value) {
      this._form = value;
      this.form.patchValue({ tip: this.currentPriceWithoutTip * 0.1 });
      this.tipType.setValue('%');
    }
  }
  public get form(): FormGroup {
    return this._form;
  }

  @Input() currentPriceWithoutTip = 0;
  @Input() restaurantInfo: Restaurant | null = null;
  @Input() ageRestricted = false;
  @Input() preorderStatus: PreorderStatus | null = null;
  @Input() qrCodeType: string | null = '';
  @Output() removeProduct = new EventEmitter<number>();
  translateService = inject(TranslateService);

  tipType = new FormControl('none');
  tipValueCustom = new FormControl(0);
  tipValuePercent = new FormControl(10);

  ngOnInit(): void {
    this.tipType.valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
      if (value === '%' || value === 'custom') {
        this.form.patchValue({ tip: this.currentPriceWithoutTip * 0.1 });
        this.form.updateValueAndValidity();
        this.tipValuePercent.setValue(10);
        this.tipValueCustom.setValue((this.currentPriceWithoutTip * 0.1) / 100);
      } else if (value === 'none') {
        this.form.patchValue({ tip: 0 });
      }
    });

    this.tipValueCustom.valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
      this.form.patchValue({ tip: value! * 100 });
    });

    this.tipValuePercent.valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
      this.form.patchValue({ tip: this.currentPriceWithoutTip * (value! / 100) });
    });
  }
}
