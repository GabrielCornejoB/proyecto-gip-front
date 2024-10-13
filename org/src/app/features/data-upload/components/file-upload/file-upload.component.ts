import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToFileArrayPipe } from '../../../../core/pipes/to-file-array/to-file-array.pipe';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [ToFileArrayPipe],
  templateUrl: './file-upload.component.html',
})
export class FileUploadComponent {
  @Output()
  submitButtonClick = new EventEmitter<FileList | null>();

  @ViewChild('inputFile') fileInput!: ElementRef<HTMLInputElement>;
  fileList$ = new BehaviorSubject<File[]>([]);

  constructor(private readonly pipe: ToFileArrayPipe) {}

  submit(): void {
    this.submitButtonClick.emit(this.fileInput.nativeElement.files);
  }

  cleanSelection(): void {
    this.fileInput.nativeElement.value = '';
    this.fileList$.next([]);
  }

  filesLoaded(event: Event) {
    this.fileList$.next(
      this.pipe.transform(this.fileInput.nativeElement.files),
    );
  }
}
