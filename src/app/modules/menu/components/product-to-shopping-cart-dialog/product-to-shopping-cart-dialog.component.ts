import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MultiselectCheckboxGroupComponent } from 'src/app/shared/components/multiselect-checkbox-group/multiselect-checkbox-group.component';
import { ProductCart } from 'src/app/shared/models/product-cart';
import { CheckablePipe } from '../../pipes/checkable.pipe';
import { CounterButtonComponent } from './../../../../shared/components/counter-button/counter-button.component';
import { SumOfProductPipe } from './../../../../shared/pipes/sum-of-product.pipe';
import { ProductIngridientsDialogComponent } from './product-ingridients-dialog/product-ingridients-dialog.component';

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
    MultiselectCheckboxGroupComponent,
    CheckablePipe,
    MatChipsModule,
  ],
  templateUrl: './product-to-shopping-cart-dialog.component.html',
  styleUrls: ['./product-to-shopping-cart-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductToShoppingCartDialogComponent {
  constructor(
    public bottomSheetRef: MatBottomSheetRef<ProductToShoppingCartDialogComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: ProductCart,
    public translateService: TranslateService,
    private dialog: MatDialog
  ) {
    data.product.extraGroups.map(extraGroup => {
      if (extraGroup.selectionType === 'RADIO_GROUP') {
        extraGroup.selected = extraGroup.extras.filter(extra => extra.defaultSelected)[0]?.id ?? null;
      } else if (extraGroup.selectionType === 'CHECKBOX') {
        extraGroup.extras.map(extra => (extra.selected = extra.defaultSelected));
      }
      return extraGroup;
    });
  }

  openInfo() {
    const dialogRef = this.dialog.open(ProductIngridientsDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: structuredClone(this.data),
    });

    dialogRef.afterClosed().subscribe();
  }
}
