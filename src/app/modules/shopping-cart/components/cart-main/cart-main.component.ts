import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Restaurant } from './../../../menu/models/restaurant';
import { CartProductComponent } from './cart-product/cart-product.component';

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
  ],
  templateUrl: './cart-main.component.html',
  styleUrls: ['./cart-main.component.scss'],
})
export class CartMainComponent {
  @Input() form!: FormGroup;
  @Input() restaurantInfo: Restaurant | null = null;
  @Output() removeProduct = new EventEmitter<number>();
  translateService = inject(TranslateService);
  otherTip = 0;

  addTip(tip: string) {
    if (tip) {
      this.otherTip = parseInt(tip) * 100;
      this.form.patchValue({ tip: this.otherTip });
    }
  }
}
