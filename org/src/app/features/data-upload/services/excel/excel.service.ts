import { Injectable } from '@angular/core';
import Excel from 'exceljs';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  async arrayBufferToExcel(arrayBuffer: ArrayBuffer) {
    const workbook = new Excel.Workbook();
    await workbook.xlsx.load(arrayBuffer);
    const worksheet = workbook.worksheets[0];

    return { workbook, worksheet };
  }

  getColumn(worksheet: Excel.Worksheet, columnName: string) {
    const columnIndex = (worksheet.getRow(1).values as string[]).indexOf(
      columnName,
    );
    const column = worksheet.getColumn(columnIndex).values.slice(2) as number[];

    return {
      values: column.map((cell) => cell.toString()),
      index: columnIndex,
    };
  }

  downloadTestFile(file: File) {
    const link = document.createElement('a');
    const url = URL.createObjectURL(file);

    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}
