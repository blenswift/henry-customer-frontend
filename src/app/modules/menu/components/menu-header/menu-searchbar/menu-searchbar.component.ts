import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'oxp-menu-searchbar',
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './menu-searchbar.component.html',
  styleUrls: ['./menu-searchbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuSearchbarComponent {
  @Input() filterCtrl!: FormControl;
}
