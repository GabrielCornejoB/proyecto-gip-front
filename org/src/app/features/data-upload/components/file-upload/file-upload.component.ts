import { Component, ElementRef, output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
})
export class FileUploadComponent {
  onSubmitButtonClicked = output<File | undefined>();
  @ViewChild('inputFile') fileInput!: ElementRef<HTMLInputElement>;

  submit(): void {
    this.onSubmitButtonClicked.emit(this.fileInput.nativeElement.files?.[0]);
  }

  cleanSelection(): void {
    this.fileInput.nativeElement.value = '';
  }
}
