import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { TranslateModule } from '@ngx-translate/core';
import { ProductCart } from 'src/app/shared/models/product-cart';
import { CounterButtonComponent } from './../../../../shared/components/counter-button/counter-button.component';
import { SumOfProductPipe } from './../../../../shared/pipes/sum-of-product.pipe';

@Component({
  selector: 'oxp-product-to-shopping-cart-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    CounterButtonComponent,
    MatDialogModule,
    MatRadioModule,
    MatCheckboxModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    SumOfProductPipe,
    TranslateModule,
  ],
  templateUrl: './product-to-shopping-cart-dialog.component.html',
  styleUrls: ['./product-to-shopping-cart-dialog.component.scss'],
})
export class ProductToShoppingCartDialogComponent {
  // formProduct = this.fb.group({
  //   id: [''],
  //   categoryId: [''],
  //   name: [''],
  //   imageUrl: [''],
  //   description: [''],
  //   basePrice: [0],
  //   available: [true],
  //   ingredients: [['']],
  //   legalAge: [0],
  //   allergens: [['']],
  //   additives: [['']],
  //   extraGroups: this.fb.array([]),
  // });

  // formProductCart = this.fb.nonNullable.group({
  //   quantity: [0],
  //   product: this.formProduct,
  // });

  // get extraGroupsArray() {
  //   return this.formProduct.get('extraGroups') as FormArray;
  // }

  constructor(
    public dialogRef: MatDialogRef<ProductToShoppingCartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductCart // private fb: FormBuilder
  ) {
    // this.formProductCart.patchValue(data);
  }

  // setupFormArrays() {
  //   this.data.product.extraGroups.map(extraGroup => {
  //     //extras als FormArray erzeugen
  //     const extraFormArray = this.fb.array([]);
  //     extraGroup.extras.forEach(extra => {
  //       const extrasForm = this.fb.group({
  //         id: [''],
  //         price: [0],
  //         name: [''],
  //         allergens: [['']],
  //         additives: [['']],
  //       });

  //       extrasForm.patchValue(extra);
  //       (extraFormArray as FormArray).push(extrasForm);
  //     });

  //     // extraGroups erzeugen und dann dem Formarray extraGroupsArray hinzufügen
  //     const extraGroupForm = this.fb.group({
  //       name: [''],
  //       selectionType: [''],
  //       defaultValue: [''],
  //       selected: [''],
  //       extras: extraFormArray,
  //     });

  //     extraGroupForm.patchValue(extraGroup);
  //     extraGroupForm.patchValue({ selected: extraGroup.defaultValue });
  //     this.extraGroupsArray.push(extraGroupForm);
  //   });
  // }
}
