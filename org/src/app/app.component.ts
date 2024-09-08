import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideBarComponent } from './core/components/side-bar/side-bar.component';
import { AlertToastService } from './core/services/alert-toast/alert-toast.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterModule, SideBarComponent, NgIf, NgClass],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isAlertToastOpen;
  alertToastVariant;
  alertToastText;

  constructor(private readonly alertToastService: AlertToastService) {
    this.isAlertToastOpen = this.alertToastService.isOpen;
    this.alertToastVariant = this.alertToastService.variant;
    this.alertToastText = this.alertToastService.text;
  }

  closeAlertToast(): void {
    this.alertToastService.close();
  }
}
