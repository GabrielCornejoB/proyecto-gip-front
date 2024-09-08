import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MENU_ITEMS } from '../../constants/menu-items.constant';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './side-bar.component.html',
})
export class SideBarComponent {
  readonly menuItems = MENU_ITEMS;
}
