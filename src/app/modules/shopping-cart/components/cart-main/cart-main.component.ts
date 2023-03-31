import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { TranslateModule } from '@ngx-translate/core';
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
  ],
  templateUrl: './cart-main.component.html',
  styleUrls: ['./cart-main.component.scss'],
})
export class CartMainComponent {
  @Input() form!: FormGroup;
  @Input() restaurantInfo: Restaurant | null = null;
  @Output() removeProduct = new EventEmitter<number>();

  addCustomTip() {
    console.log('POPUP FÜR EINGABE ÖFFNEN');
  }
}
