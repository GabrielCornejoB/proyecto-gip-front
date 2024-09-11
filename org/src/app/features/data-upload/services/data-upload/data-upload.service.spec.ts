import { DataUploadService } from './data-upload.service';
import { HttpClient } from '@angular/common/http';

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
    const mockFile: File = new File(['content'], 'file-name.csv');
    const mockFormData = new FormData();
    mockFormData.append('file', mockFile, mockFile.name);

    service.uploadFile(mockFile);

    expect(http.post).toHaveBeenCalledWith(service['API_URL'], mockFormData);
  });

  it('should return true if the file extension is valid', () => {
    const validFileName = 'valid.csv';

    const result = service.isValidFileExtension(validFileName);

    expect(result).toBe(true);
  });

  it('should return false if the file extension is invalid', () => {
    const invalidFileName = 'invalid.jpeg';

    const result = service.isValidFileExtension(invalidFileName);

    expect(result).toBe(false);
  });
});
