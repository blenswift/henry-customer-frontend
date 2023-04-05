import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MultifieldCheckboxItem } from '../../models/multifield-checkbox-item';
import { MultifieldCheckboxOptionComponent } from './multifield-checkbox-option/multifield-checkbox-option.component';

@Component({
  selector: 'oxp-multifield-checkbox-group',
  standalone: true,
  imports: [CommonModule, MultifieldCheckboxOptionComponent],
  templateUrl: './multifield-checkbox-group.component.html',
  styleUrls: ['./multifield-checkbox-group.component.scss'],
})
export class MultifieldCheckboxGroupComponent {
  @Input() options: MultifieldCheckboxItem[] = [];
  @Input() maxValue = Infinity;
  maxValueReached = false;

  valueChanged() {
    this.maxValueReached = this.options.map(x => x.value).reduce((acc, cur) => acc + cur, 0) === this.maxValue;
  }
}
