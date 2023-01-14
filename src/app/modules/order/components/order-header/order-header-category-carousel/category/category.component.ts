import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HighlightCategoryDirective } from './../../../../directives/highlight-category.directive';

@Component({
  selector: 'oxp-category',
  standalone: true,
  imports: [CommonModule, HighlightCategoryDirective],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  @Input() category!: any;
  @Output() clicked = new EventEmitter<any>();
}
