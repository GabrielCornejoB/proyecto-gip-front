import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../core/components/header/header.component';
import { AlertToastService } from '../../core/services/alert-toast/alert-toast.service';

@Component({
  selector: 'app-data-upload',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './data-upload.component.html',
})
export class DataUploadComponent {
  isFileUploaded: WritableSignal<boolean> = signal(false);

  constructor(private readonly alertToastService: AlertToastService) {}

  submitFile() {
    this.alertToastService.open('info', 'mensaje informativo');
  }
}
