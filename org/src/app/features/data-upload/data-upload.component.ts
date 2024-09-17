import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../core/components/header/header.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { AlertToastService } from '../../core/services/alert-toast/alert-toast.service';
import { DataUploadService } from './services/data-upload/data-upload.service';
import { finalize } from 'rxjs';
import { UploadedFiles } from './models/uploaded-files.model';

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

  handleSubmitButtonClicked(files: FileList | null): void {
    if (!files || files.length === 0) {
      return this.alertToastService.open(
        'warning',
        'No ha seleccionado ningún archivo',
      );
    }
    if (files.length !== 2) {
      return this.alertToastService.open(
        'warning',
        'Solo se pueden cargar dos archivos',
      );
    }
    if (
      !this.dataUploadService.isValidFileExtension(files[0].name) ||
      !this.dataUploadService.isValidFileExtension(files[1].name)
    )
      return this.alertToastService.open(
        'warning',
        'Los archivos no tienen un formato valido. Debe ser: .xlsx, .xls o .csv',
      );
    if (!this.dataUploadService.areValidFileNames([files[0], files[1]])) {
      return this.alertToastService.open(
        'warning',
        "Los nombres de los archivos debe comenzar por 'Rips' e 'Informe'",
      );
    }
    this.uploadFile(this.dataUploadService.organizeFiles([files[0], files[1]]));
  }

  uploadFile(files: UploadedFiles): void {
    this.dataUploadService
      .uploadFile(files)
      .pipe(finalize(() => this.fileUploadComponent.cleanSelection()))
      .subscribe({
        next: () =>
          this.alertToastService.open(
            'success',
            'Archivos enviados exitosamente',
          ),
        error: () =>
          this.alertToastService.open(
            'error',
            'Ocurrió un error cargando los archivos',
          ),
      });
  }
}
