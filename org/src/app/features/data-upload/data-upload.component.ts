import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../core/components/header/header.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { AlertToastService } from '../../core/services/alert-toast/alert-toast.service';
import { DataUploadService } from './services/data-upload/data-upload.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-data-upload',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FileUploadComponent],
  templateUrl: './data-upload.component.html',
})
export class DataUploadComponent {
  @ViewChild(FileUploadComponent) fileUploadComponent!: FileUploadComponent;

  constructor(
    private readonly alertToastService: AlertToastService,
    private readonly dataUploadService: DataUploadService,
  ) {}

  handleSubmitButtonClicked(file: File | undefined): void {
    if (!file) {
      return this.alertToastService.open(
        'warning',
        'No ha seleccionado ningún archivo',
      );
    }
    if (
      !file.name.endsWith('.xlsx') &&
      !file.name.endsWith('.xls') &&
      !file.name.endsWith('.csv')
    )
      return this.alertToastService.open(
        'warning',
        'El archivo no es de un formato valido. Debe ser: .xlsx, .xls o .csv',
      );
    this.uploadFile(file);
  }

  uploadFile(file: File): void {
    this.dataUploadService
      .uploadFile(file)
      .pipe(finalize(() => this.fileUploadComponent.cleanSelection()))
      .subscribe({
        next: () =>
          this.alertToastService.open(
            'success',
            'Archivo enviado exitosamente',
          ),
        error: () =>
          this.alertToastService.open(
            'error',
            'Ocurrió un error cargando el archivo',
          ),
      });
  }
}
