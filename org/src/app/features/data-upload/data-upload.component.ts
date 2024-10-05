import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../core/components/header/header.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { AlertToastService } from '../../core/services/alert-toast/alert-toast.service';
import { DataUploadService } from './services/data-upload/data-upload.service';
import { finalize } from 'rxjs';
import { UploadedFiles } from './models/uploaded-files.model';
import { filesInputHandler } from './utils/validations/concrete.handlers';

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
    try {
      const validatedFiles = filesInputHandler.handle(files as FileList);
      this.uploadFile(
        this.dataUploadService.organizeFiles([
          validatedFiles[0],
          validatedFiles[1],
        ]),
      );
    } catch (error) {
      this.alertToastService.open('warning', (error as Error).message);
    }
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
