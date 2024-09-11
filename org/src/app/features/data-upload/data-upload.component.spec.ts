import { DataUploadComponent } from './data-upload.component';
import { AlertToastService } from '../../core/services/alert-toast/alert-toast.service';
import { DataUploadService } from './services/data-upload/data-upload.service';
import { of, throwError } from 'rxjs';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

describe('DataUploadComponent', () => {
  let component: DataUploadComponent;

  const alertToastService: AlertToastService = {
    open: jest.fn(),
  } as never;
  const dataUploadService: DataUploadService = {
    uploadFile: jest.fn(),
    isValidFileExtension: jest.fn(),
  } as never;
  const fileUploadComponent: FileUploadComponent = {
    cleanSelection: jest.fn(),
  } as never;

  beforeEach(() => {
    component = new DataUploadComponent(alertToastService, dataUploadService);
    component.fileUploadComponent = fileUploadComponent;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should throw a warning alert if no file is loaded when calling the submit button', () => {
    component.handleSubmitButtonClicked(undefined);

    expect(alertToastService.open).toHaveBeenCalledWith(
      'warning',
      'No ha seleccionado ningún archivo',
    );
  });

  it('should throw a warning alert if the loaded file has an invalid file extension', () => {
    jest
      .spyOn(dataUploadService, 'isValidFileExtension')
      .mockImplementationOnce(() => false);

    component.handleSubmitButtonClicked({ name: 'image.png' } as never);

    expect(alertToastService.open).toHaveBeenCalledWith(
      'warning',
      'El archivo no es de un formato valido. Debe ser: .xlsx, .xls o .csv',
    );
  });

  it('should call the service if the loaded file is valid', () => {
    jest.spyOn(component, 'uploadFile');
    jest
      .spyOn(dataUploadService, 'uploadFile')
      .mockImplementationOnce(() => of());
    jest
      .spyOn(dataUploadService, 'isValidFileExtension')
      .mockImplementationOnce(() => true);
    const mockFile: File = { name: 'data.csv' } as never;

    component.handleSubmitButtonClicked(mockFile);

    expect(component.uploadFile).toHaveBeenCalledWith(mockFile);
    expect(dataUploadService.uploadFile).toHaveBeenCalledWith(mockFile);
  });

  it('should open a success alert toast if the service responds successfully', () => {
    jest
      .spyOn(dataUploadService, 'uploadFile')
      .mockImplementationOnce(() => of({ code: 200 }));
    const mockFile: File = { name: 'data.csv' } as never;

    component.uploadFile(mockFile);

    expect(alertToastService.open).toHaveBeenCalledWith(
      'success',
      'Archivo enviado exitosamente',
    );
  });

  it('should open a error alert toast if the service responds with error', () => {
    jest
      .spyOn(dataUploadService, 'uploadFile')
      .mockImplementationOnce(() => throwError(() => 'error'));
    const mockFile: File = { name: 'data.csv' } as never;

    component.uploadFile(mockFile);

    expect(alertToastService.open).toHaveBeenCalledWith(
      'error',
      'Ocurrió un error cargando el archivo',
    );
  });

  it('should call the cleanSelection fn from the file-upload-component each time a request is made', () => {
    jest
      .spyOn(dataUploadService, 'uploadFile')
      .mockImplementationOnce(() => of());
    const mockFile: File = { name: 'data.csv' } as never;

    component.uploadFile(mockFile);

    expect(fileUploadComponent.cleanSelection).toHaveBeenCalled();
  });
});
