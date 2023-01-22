import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'oxp-menu-searchbar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './menu-searchbar.component.html',
  styleUrls: ['./menu-searchbar.component.scss'],
})
export class MenuSearchbarComponent {}
