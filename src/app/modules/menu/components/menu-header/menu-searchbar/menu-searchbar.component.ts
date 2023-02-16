import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'oxp-menu-searchbar',
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './menu-searchbar.component.html',
  styleUrls: ['./menu-searchbar.component.scss'],
})
export class MenuSearchbarComponent {
  @Input() filterCtrl!: FormControl;
}
