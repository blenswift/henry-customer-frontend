import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'oxp-counter-button',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatIconModule],
  templateUrl: './counter-button.component.html',
  styleUrls: ['./counter-button.component.scss'],
})
export class CounterButtonComponent {
  @Input() value: number | null = null;
  @Input() formCtrl: FormControl | null = null;
  @Output() valueChange = new EventEmitter<number>();

  increase() {
    if (this.value) {
      this.value++;
      this.valueChange.emit(this.value);
    } else if (this.formCtrl) {
      this.formCtrl.setValue(this.formCtrl.getRawValue() + 1);
    }
  }

  decrease() {
    if (this.value && this.value > 1) {
      this.value--;
      this.valueChange.emit(this.value);
    } else if (this.formCtrl && this.formCtrl.getRawValue() > 1) {
      this.formCtrl.setValue(this.formCtrl.getRawValue() - 1);
    }
  }
}
