import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MultifieldCheckboxItem } from 'src/app/shared/models/multifield-checkbox-item';

@Component({
  selector: 'oxp-multifield-checkbox-option',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatButtonToggleModule],
  templateUrl: './multifield-checkbox-option.component.html',
  styleUrls: ['./multifield-checkbox-option.component.scss'],
})
export class MultifieldCheckboxOptionComponent {
  @Input() item!: MultifieldCheckboxItem;
  @Input() maxValueReached = false;
  @Output() valueChange = new EventEmitter<MultifieldCheckboxItem>();

  trigger() {
    if (!this.item.value && !this.maxValueReached) {
      this.item.value += 1;
    } else {
      this.item.value = 0;
    }
    this.valueChange.emit(this.item);
  }

  increase() {
    if (!this.maxValueReached) {
      this.item.value++;
      this.valueChange.emit(this.item);
    }
  }

  decrease() {
    if (this.item.value > 0) {
      this.item.value--;
      this.valueChange.emit(this.item);
    }
  }
}
