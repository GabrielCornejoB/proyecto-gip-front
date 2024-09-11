import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataUploadService {
  private readonly API_URL = `${environment.API_URL}/data-upload`;

  constructor(private readonly http: HttpClient) {}

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(this.API_URL, formData);
  }

  isValidFileExtension(fileName: string): boolean {
    return (
      fileName.endsWith('.xlsx') ||
      fileName.endsWith('.xls') ||
      fileName.endsWith('.csv')
    );
  }
}
