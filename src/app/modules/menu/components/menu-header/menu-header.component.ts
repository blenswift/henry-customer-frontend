import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Category } from '../../../../shared/models/category';
import { Restaurant } from './../../models/restaurant';
import { MenuSearchbarComponent } from './menu-searchbar/menu-searchbar.component';
import { MenuToolbarComponent } from './menu-toolbar/menu-toolbar.component';

@Component({
  selector: 'oxp-menu-header',
  standalone: true,
  imports: [CommonModule, MenuToolbarComponent, MenuSearchbarComponent],
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuHeaderComponent {
  @Input() categories: Category[] | null = [];
  @Input() restaurant: Restaurant | null = null;
  @Input() filterCtrl!: FormControl;
}
