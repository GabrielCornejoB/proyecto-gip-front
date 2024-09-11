import { FileUploadComponent } from './file-upload.component';
import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;

  const mockFile: File = new File(['data'], 'name.csv');

  const mockFileInput: ElementRef<HTMLInputElement> = {
    nativeElement: {
      files: [mockFile],
      value: '',
    },
  } as never;

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.fileInput = mockFileInput;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a value when the submit button is clicked', () => {
    jest.spyOn(component.onSubmitButtonClicked, 'emit');

    component.submit();

    expect(component.onSubmitButtonClicked.emit).toHaveBeenCalledWith(mockFile);
  });

  it('should set the value to empty when the cleanSelection button is clicked', () => {
    component.cleanSelection();

    expect(component.fileInput.nativeElement.value).toBe('');
  });
});
