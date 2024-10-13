import { DataUploadComponent } from './data-upload.component';
import { AlertToastService } from '../../core/services/alert-toast/alert-toast.service';
import { DataUploadService } from './services/data-upload/data-upload.service';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ExcelService } from './services/excel/excel.service';
import { EncryptionService } from './services/encryption/encryption.service';
import { filesInputHandler } from './utils/validations/concrete.handlers';
import { of, throwError } from 'rxjs';

describe('DataUploadComponent', () => {
  let component: DataUploadComponent;

  const alertToastService: AlertToastService = {
    open: jest.fn(),
  } as never;
  const dataUploadService: DataUploadService = {
    uploadFile: jest.fn(),
    isValidFileExtension: jest.fn(),
    organizeFiles: jest.fn(),
  } as never;
  const excelService: ExcelService = {
    arrayBufferToExcel: jest.fn().mockResolvedValue(() => ({})),
    getColumn: jest.fn(),
  } as never;
  const encryptionService: EncryptionService = {
    getHashedDocuments: jest.fn(),
  } as never;
  const fileUploadComponent: FileUploadComponent = {
    cleanSelection: jest.fn(),
  } as never;

  beforeEach(() => {
    component = new DataUploadComponent(
      alertToastService,
      dataUploadService,
      excelService,
      encryptionService,
    );
    component.fileUploadComponent = fileUploadComponent;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('handleSubmitButtonClicked()', () => {
    it(
      'GIVEN the files loaded are not valid ' +
        'WHEN the submit button is clicked ' +
        'THEN it should show the respective alert error',
      async () => {
        jest.spyOn(filesInputHandler, 'handle');
        const arg = null;

        await component.handleSubmitButtonClicked(arg);

        expect(filesInputHandler.handle).toHaveBeenCalledWith(arg);
        expect(dataUploadService.organizeFiles).not.toHaveBeenCalled();
        expect(alertToastService.open).toHaveBeenCalledWith(
          'warning',
          'No ha seleccionado ningún archivo',
        );
      },
    );
  });

  describe('uploadFile()', () => {
    it('should open a success alert when the request succeeds', () => {
      jest
        .spyOn(dataUploadService, 'uploadFile')
        .mockImplementationOnce(() => of('valid'));

      component.uploadFile({
        ripsFile: new File([], 'a.xlsx'),
        monthlyFile: new File([], 'b.xlsx'),
      });

      expect(fileUploadComponent.cleanSelection).toHaveBeenCalled();
      expect(alertToastService.open).toHaveBeenCalledWith(
        'success',
        'Archivos enviados exitosamente',
      );
    });

    it('should open a error alert when the request fails', () => {
      jest
        .spyOn(dataUploadService, 'uploadFile')
        .mockImplementationOnce(() => throwError(() => 'Error'));

      component.uploadFile({
        ripsFile: new File([], 'a.xlsx'),
        monthlyFile: new File([], 'b.xlsx'),
      });

      expect(fileUploadComponent.cleanSelection).toHaveBeenCalled();
      expect(alertToastService.open).toHaveBeenCalledWith(
        'error',
        'Ocurrió un error cargando los archivos',
      );
    });
  });
});
