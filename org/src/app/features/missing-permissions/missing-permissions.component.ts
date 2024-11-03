import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-missing-permissions',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './missing-permissions.component.html',
})
export class MissingPermissionsComponent {}
