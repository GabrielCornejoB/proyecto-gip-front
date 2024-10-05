import { Component, ElementRef, output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileUploadFormValues } from '../../models/file-upload-form-values.model';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './file-upload.component.html',
})
export class FileUploadComponent {
  onSubmitButtonClicked = output<FileUploadFormValues>();
  @ViewChild('inputFile') fileInput!: ElementRef<HTMLInputElement>;
  encryptionKeyInput: FormControl = new FormControl('', [Validators.required]);

  readonly inputTooltipText =
    'Esta clave de encriptación es la que se usará para encriptar las cédulas en los archivos. Recuerda que los archivos originales nunca serán enviados a ninguna base de datos ni servidor. Solamente los archivos después de la encriptación';

  submit(): void {
    this.onSubmitButtonClicked.emit({
      files: this.fileInput.nativeElement.files,
      encryptionKey: this.encryptionKeyInput.value,
    });
  }

  cleanSelection(): void {
    this.fileInput.nativeElement.value = '';
  }
}
