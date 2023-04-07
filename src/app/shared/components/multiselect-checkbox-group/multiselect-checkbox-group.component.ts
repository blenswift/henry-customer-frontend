import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Extra } from '../../models/product';
import { MultiselectCheckboxOptionComponent } from './multiselect-checkbox-option/multiselect-checkbox-option.component';

@Component({
  selector: 'oxp-multiselect-checkbox-group',
  standalone: true,
  imports: [CommonModule, MultiselectCheckboxOptionComponent],
  templateUrl: './multiselect-checkbox-group.component.html',
  styleUrls: ['./multiselect-checkbox-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiselectCheckboxGroupComponent {
  @Input() extras: Extra[] = [];
  @Input() maxValue = Infinity;
  maxValueReached = false;

  valueChanged() {
    this.maxValueReached = this.extras.map(x => x.quantity).reduce((acc, cur) => acc + cur, 0) === this.maxValue;
  }
}
