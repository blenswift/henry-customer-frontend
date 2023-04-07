import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { TranslateService } from '@ngx-translate/core';
import { Extra } from 'src/app/shared/models/product';

@Component({
  selector: 'oxp-multiselect-checkbox-option',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatButtonToggleModule],
  templateUrl: './multiselect-checkbox-option.component.html',
  styleUrls: ['./multiselect-checkbox-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiselectCheckboxOptionComponent {
  @Input() item!: Extra;
  @Input() maxValueReached = false;
  @Input() last = false;
  @Output() valueChange = new EventEmitter<Extra>();
  translateService = inject(TranslateService);

  trigger() {
    if (!this.item.quantity && !this.maxValueReached) {
      this.item.quantity = 1;
    } else {
      this.item.quantity = 0;
    }
    this.valueChange.emit(this.item);
  }

  increase() {
    if (!this.maxValueReached && this.item.quantity !== this.item.maxQuantity) {
      this.item.quantity++;
      this.valueChange.emit(this.item);
    }
  }

  decrease() {
    if (this.item.quantity > 0) {
      this.item.quantity--;
      this.valueChange.emit(this.item);
    }
  }
}
