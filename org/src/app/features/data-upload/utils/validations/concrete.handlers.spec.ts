import {
  MinFilesLengthHandler,
  RequiredFilesLengthHandler,
  ValidFilesExtensionsHandler,
  ValidFilesNamesHandler,
} from './concrete.handlers';
import { FileInputHandler } from './file-input.handler';

describe('FileValidationConcreteHandlers', () => {
  describe('MinFilesLengthHandler', () => {
    it('should throw error if the request is null', () => {
      const arg = null as never as FileList;
      const handler = new MinFilesLengthHandler();

      expect(() => {
        handler.handle(arg);
      }).toThrow('No ha seleccionado ningún archivo');
    });

    it('should throw error if the request length is 0', () => {
      const arg = [] as never as FileList;
      const handler = new MinFilesLengthHandler();

      expect(() => {
        handler.handle(arg);
      }).toThrow('No ha seleccionado ningún archivo');
    });

    it('should not throw error & continue if the request is valid', () => {
      const arg = [new File(['a'], 'a')] as never as FileList;
      const handler = new MinFilesLengthHandler();
      const superHandler = jest.spyOn(FileInputHandler.prototype, 'handle');

      expect(() => handler.handle(arg)).not.toThrow();
      expect(superHandler).toHaveBeenCalledWith(arg);
    });
  });

  describe('RequiredFilesLengthHandler', () => {
    it('should throw if the request length is different from 2', () => {
      const arg = [new File(['a'], 'a')] as never as FileList;
      const handler = new RequiredFilesLengthHandler();

      expect(() => {
        handler.handle(arg);
      }).toThrow('Solo se pueden cargar dos archivos');
    });

    it('should not throw error & continue if the request is valid', () => {
      const arg = [
        new File(['a'], 'a'),
        new File(['b'], 'b'),
      ] as never as FileList;
      const handler = new RequiredFilesLengthHandler();
      const superHandler = jest.spyOn(FileInputHandler.prototype, 'handle');

      expect(() => handler.handle(arg)).not.toThrow();
      expect(superHandler).toHaveBeenCalledWith(arg);
    });
  });

  describe('ValidFilesExtensionsHandler', () => {
    it("should throw error if the file names don't end with the .xlsx extension", () => {
      const arg = [
        new File(['a'], 'a.pdf'),
        new File(['b'], 'b.csv'),
      ] as never as FileList;
      const handler = new ValidFilesExtensionsHandler();

      expect(() => handler.handle(arg)).toThrow(
        'Los archivos no tienen un formato valido, ambos deben ser .xlsx',
      );
    });
    it('should not throw error & continue if the request is valid', () => {
      const arg = [
        new File(['a'], 'a.xlsx'),
        new File(['b'], 'b.xlsx'),
      ] as never as FileList;
      const handler = new ValidFilesExtensionsHandler();
      const superHandler = jest.spyOn(FileInputHandler.prototype, 'handle');

      expect(() => handler.handle(arg)).not.toThrow();
      expect(superHandler).toHaveBeenCalledWith(arg);
    });
  });

  describe('ValidFilesNamesHandler', () => {
    it("should throw an error if file names don't start with 'Rips' or 'Informe' ", () => {
      const mockFileList = {
        0: { name: 'invalidFile.txt' },
        1: { name: 'otherInvalidFile.txt' },
        length: 2,
      } as unknown as FileList;
      const handler = new ValidFilesNamesHandler();

      expect(() => handler.handle(mockFileList)).toThrow(
        "Los nombres de los archivos deben iniciar por 'Rips' e 'Informe'",
      );
    });
    it('should throw an error if both file names start with the same prefix', () => {
      const mockFileList = {
        0: { name: 'Rips_document.txt' },
        1: { name: 'Rips_summary.txt' },
        length: 2,
      } as unknown as FileList;
      const handler = new ValidFilesNamesHandler();

      expect(() => handler.handle(mockFileList)).toThrow(
        "Los nombres de los archivos deben iniciar por 'Rips' e 'Informe'",
      );
    });
    it('should call super.handle if file names are valid', () => {
      const mockFileList = {
        0: { name: 'Rips_report.txt' },
        1: { name: 'Informe_document.txt' },
        length: 2,
      } as unknown as FileList;
      const handler = new ValidFilesNamesHandler();
      const superHandler = jest.spyOn(FileInputHandler.prototype, 'handle');

      handler.handle(mockFileList);

      expect(superHandler).toHaveBeenCalledWith(mockFileList);
    });
    it('should return true if filenames have valid prefixes and do not conflict', () => {
      const mockFile1 = { name: 'Rips_document.txt' } as File;
      const mockFile2 = { name: 'Informe_report.txt' } as File;
      const handler = new ValidFilesNamesHandler();

      const result = handler.areValidFileNames(mockFile1, mockFile2);

      expect(result).toBe(true);
    });
  });
});
