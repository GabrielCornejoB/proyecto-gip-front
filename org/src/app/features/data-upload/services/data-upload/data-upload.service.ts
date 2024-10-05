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
