import { FileUploadComponent } from './file-upload.component';
import { ElementRef } from '@angular/core';
import { ToFileArrayPipe } from '../../../../core/pipes/to-file-array/to-file-array.pipe';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;

  const mockFile: File = new File(['data'], 'name.csv');

  const mockFileInput: ElementRef<HTMLInputElement> = {
    nativeElement: {
      files: [mockFile],
      value: '',
    },
  } as never;

  beforeEach(() => {
    component = new FileUploadComponent(new ToFileArrayPipe());
    component.fileInput = mockFileInput;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a value when the submit button is clicked', () => {
    jest.spyOn(component.submitButtonClick, 'emit');

    component.submit();

    expect(component.submitButtonClick.emit).toHaveBeenCalledWith(mockFile);
  });

  it('should set the value to empty when the cleanSelection button is clicked', () => {
    jest.spyOn(component.fileList$, 'next');
    component.cleanSelection();

    expect(component.fileList$.next).toHaveBeenCalledWith([]);
    expect(component.fileInput.nativeElement.value).toBe('');
  });
});
