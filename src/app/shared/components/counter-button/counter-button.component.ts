import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() value = 1;
  @Output() valueChange = new EventEmitter<number>();

  increase() {
    this.value++;
    this.valueChange.emit(this.value);
  }

  decrease() {
    if (this.value > 1) {
      this.value--;
      this.valueChange.emit(this.value);
    }
  }
}
