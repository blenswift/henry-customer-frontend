import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'oxp-scaninfo',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatIconModule],
  templateUrl: './scaninfo.component.html',
  styleUrls: ['./scaninfo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScaninfoComponent {}
