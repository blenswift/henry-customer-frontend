import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[oxpHighlightCategory]',
  standalone: true,
})
export class HighlightCategoryDirective {
  @Input() set oxpHighlightCategory(val: boolean) {
    this.border = val;
    this.borderColor = val;
  }

  @HostBinding('class.border-2')
  public border = false;

  @HostBinding('class.border-blue-700')
  public borderColor = false;
}
