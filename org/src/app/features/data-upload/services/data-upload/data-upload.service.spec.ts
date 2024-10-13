import { DataUploadService } from './data-upload.service';
import { HttpClient } from '@angular/common/http';
import { UploadedFiles } from '../../models/uploaded-files.model';

describe('DataUploadService', () => {
  let service: DataUploadService;

  const http: HttpClient = {
    post: jest.fn(),
  } as never;

  beforeEach(() => {
    service = new DataUploadService(http);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the API URL with the form data when calling the uploadFile() fn', () => {
    const arg: UploadedFiles = {
      ripsFile: new File(['content'], 'rips.xlsx'),
      monthlyFile: new File(['content'], 'informe.xlsx'),
    };
    const mockFormData = new FormData();
    mockFormData.append('rips', arg.ripsFile, arg.ripsFile.name);
    mockFormData.append('monthly', arg.monthlyFile, arg.monthlyFile.name);

    service.uploadFile(arg);

    expect(http.post).toHaveBeenCalledWith(service['API_URL'], mockFormData);
  });
});
