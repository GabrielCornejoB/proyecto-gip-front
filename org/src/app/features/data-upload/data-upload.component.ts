import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../core/components/header/header.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { AlertToastService } from '../../core/services/alert-toast/alert-toast.service';
import { DataUploadService } from './services/data-upload/data-upload.service';
import { finalize } from 'rxjs';
import { UploadedFiles } from './models/uploaded-files.model';
import { FileUploadFormValues } from './models/file-upload-form-values.model';
import { ExcelService } from './services/excel/excel.service';
import { EncryptionService } from './services/encryption/encryption.service';
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
    private readonly excelService: ExcelService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async handleSubmitButtonClicked(formValues: FileUploadFormValues) {
    try {
      const files = filesInputHandler.handle(formValues.files as FileList);
      const organizedFiles = this.dataUploadService.organizeFiles([
        files[0],
        files[1],
      ]);

      this.uploadFile({
        ripsFile: await this.encryptDocumentColumns(organizedFiles.ripsFile),
        monthlyFile: await this.encryptDocumentColumns(
          organizedFiles.monthlyFile,
        ),
      });
    } catch (error) {
      this.alertToastService.open('warning', (error as Error).message);
    }
  }

  async encryptDocumentColumns(file: File): Promise<File> {
    try {
      const { workbook, worksheet } =
        await this.excelService.arrayBufferToExcel(await file.arrayBuffer());
      const { index, values } = this.excelService.getColumn(
        worksheet,
        'Cedula',
      );
      worksheet.getColumn(index).values = [
        'Cedula encriptada',
        ...(await this.encryptionService.getHashedDocuments(values)),
      ];

      return new File(
        [(await workbook.xlsx.writeBuffer()).slice(0)],
        `${file.name}Encrypted`,
      );
    } catch (error) {
      throw new Error(
        'Ocurrió un error al encriptar los datos, revise nuevamente los archivos ingresados.',
      );
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
