import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { Category } from 'src/app/shared/models/category';
@Component({
  selector: 'oxp-category',
  standalone: true,
  imports: [CommonModule, MatChipsModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  @Input() category!: Category;
  @Input() scrolling: boolean | null = false;
  @Output() clicked = new EventEmitter<Category>();
}
