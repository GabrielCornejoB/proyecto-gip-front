import { FileInputHandler } from './file-input.handler';

export class MinFilesLengthHandler extends FileInputHandler {
  public override handle(request: FileList | null): FileList {
    if (request === null || request.length === 0) {
      throw new Error('No ha seleccionado ningún archivo');
    }
    return super.handle(request);
  }
}

export class RequiredFilesLengthHandler extends FileInputHandler {
  public override handle(request: FileList | null): FileList {
    if (request?.length !== 2) {
      throw new Error('Solo se pueden cargar dos archivos');
    }
    return super.handle(request);
  }
}

export class ValidFilesExtensionsHandler extends FileInputHandler {
  override handle(request: FileList | null): FileList {
    request = request as FileList;
    if (
      !request[0].name.endsWith('.xlsx') ||
      !request[1].name.endsWith('.xlsx')
    ) {
      throw new Error(
        'Los archivos no tienen un formato valido, ambos deben ser .xlsx',
      );
    }

    return super.handle(request);
  }
}

export class ValidFilesNamesHandler extends FileInputHandler {
  override handle(request: FileList | null): FileList {
    request = request as FileList;
    if (!this.areValidFileNames(request[0], request[1])) {
      throw new Error(
        "Los nombres de los archivos deben iniciar por 'Rips' e 'Informe'",
      );
    }
    return super.handle(request);
  }

  areValidFileNames(firstFile: File, secondFile: File): boolean {
    const firstFileName = firstFile.name.toLowerCase();
    const secondFileName = secondFile.name.toLowerCase();

    if (
      !firstFileName.startsWith('rips') &&
      !firstFileName.startsWith('informe')
    )
      return false;
    if (
      !secondFileName.startsWith('rips') &&
      !secondFileName.startsWith('informe')
    )
      return false;

    return !(
      firstFileName.substring(0, 4) === secondFileName.substring(0, 4) ||
      firstFileName.substring(0, 7) === secondFileName.substring(0, 7)
    );
  }
}

const filesInputHandler = new MinFilesLengthHandler();
const requiredFilesLength = new RequiredFilesLengthHandler();
const validFilesExtensions = new ValidFilesExtensionsHandler();
const validFilesNames = new ValidFilesNamesHandler();

filesInputHandler
  .setNext(requiredFilesLength)
  .setNext(validFilesExtensions)
  .setNext(validFilesNames);

export { filesInputHandler };
