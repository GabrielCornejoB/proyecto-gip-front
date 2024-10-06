import { Component, ElementRef, output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './file-upload.component.html',
})
export class FileUploadComponent {
  onSubmitButtonClicked = output<FileList | null>();
  @ViewChild('inputFile') fileInput!: ElementRef<HTMLInputElement>;

  submit(): void {
    this.onSubmitButtonClicked.emit(this.fileInput.nativeElement.files);
  }

  cleanSelection(): void {
    this.fileInput.nativeElement.value = '';
  }
}
