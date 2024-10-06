import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  async getHashedDocuments(documents: string[]): Promise<string[]> {
    const hashedDocuments: string[] = [];
    for (const doc of documents) {
      hashedDocuments.push(await this.hashText(doc));
    }
    return hashedDocuments;
  }

  async hashText(text: string): Promise<string> {
    const utf8 = new TextEncoder().encode(text);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray
      .map((bytes) => bytes.toString(16).padStart(2, '0'))
      .join('');
  }
}
