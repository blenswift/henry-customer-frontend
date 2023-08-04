import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { Category } from 'src/app/shared/models/category';
@Component({
  selector: 'oxp-category',
  standalone: true,
  imports: [CommonModule, MatChipsModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent {
  @Input() category!: Category;
  @Output() clicked = new EventEmitter<Category>();
}
