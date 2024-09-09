import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../core/components/header/header.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { AlertToastService } from '../../core/services/alert-toast/alert-toast.service';

@Component({
  selector: 'app-data-upload',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FileUploadComponent],
  templateUrl: './data-upload.component.html',
})
export class DataUploadComponent {
  constructor(private readonly alertToastService: AlertToastService) {}

  handleSubmitButtonClicked(file: File | undefined): void {
    if (!file) {
      return this.alertToastService.open(
        'warning',
        'No ha seleccionado ningún archivo',
      );
    }
    if (
      !file.name.endsWith('.xlsx') ||
      !file.name.endsWith('.xls') ||
      !file.name.endsWith('.csv')
    )
      return this.alertToastService.open(
        'warning',
        'El archivo no es de un formato valido. Debe ser: .xlsx, .xls o .csv',
      );
    this.alertToastService.open('success', 'Archivo enviado exitosamente');
  }
}
