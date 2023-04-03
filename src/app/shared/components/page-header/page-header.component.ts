import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'oxp-page-header',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatIconModule, MatButtonModule],
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent {
  @Input() type: PageHeaderType = 'CLOSE';
  @Output() closeCard = new EventEmitter<void>();
}

export type PageHeaderType = 'CLOSE' | 'BACK';
