import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { UploadedFiles } from '../../models/uploaded-files.model';

@Injectable({
  providedIn: 'root',
})
export class DataUploadService {
  private readonly API_URL = `${environment.API_URL}/data-upload`;

  constructor(private readonly http: HttpClient) {}

  uploadFile(files: UploadedFiles) {
    const formData = new FormData();
    formData.append('rips', files.ripsFile, files.ripsFile.name);
    formData.append('monthly', files.monthlyFile, files.monthlyFile.name);
    return this.http.post(this.API_URL, formData);
  }

  isValidFileExtension(fileName: string): boolean {
    return (
      fileName.endsWith('.xlsx') ||
      fileName.endsWith('.xls') ||
      fileName.endsWith('.csv')
    );
  }

  areValidFileNames(files: File[]): boolean {
    const firstFileName = files[0].name.toLowerCase();
    const secondFileName = files[1].name.toLowerCase();

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

  organizeFiles(files: File[]): UploadedFiles {
    return {
      ripsFile: files[0].name.toLowerCase().startsWith('rips')
        ? files[0]
        : files[1],
      monthlyFile: files[0].name.toLowerCase().startsWith('informe')
        ? files[0]
        : files[1],
    };
  }
}
