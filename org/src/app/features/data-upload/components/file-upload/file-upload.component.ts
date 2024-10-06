import {
  Component,
  ElementRef,
  inject,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToFileArrayPipe } from '../../../../core/pipes/to-file-array/to-file-array.pipe';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [ToFileArrayPipe],
  templateUrl: './file-upload.component.html',
})
export class FileUploadComponent {
  pipe = inject(ToFileArrayPipe);

  onSubmitButtonClicked = output<FileList | null>();
  @ViewChild('inputFile') fileInput!: ElementRef<HTMLInputElement>;
  fileList = signal<File[]>([]);

  submit(): void {
    this.onSubmitButtonClicked.emit(this.fileInput.nativeElement.files);
  }

  cleanSelection(): void {
    this.fileInput.nativeElement.value = '';
    this.fileList.set([]);
  }

  filesLoaded(event: Event) {
    this.fileList.set(this.pipe.transform(this.fileInput.nativeElement.files));
  }
}
