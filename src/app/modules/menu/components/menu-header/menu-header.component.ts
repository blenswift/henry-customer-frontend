import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Restaurant } from './../../models/restaurant';

@Component({
  selector: 'oxp-menu-header',
  standalone: true,
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class MenuHeaderComponent {
  @Input() restaurant: Restaurant | null = null;
}
