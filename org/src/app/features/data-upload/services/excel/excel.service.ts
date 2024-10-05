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

  getColumnValues(worksheet: Excel.Worksheet, columnName: string): string[] {
    const columnIndex = (worksheet.getRow(1).values as string[]).indexOf(
      columnName,
    );
    const column = worksheet.getColumn(columnIndex).values.slice(2) as number[];

    return column.map((cell) => cell.toString());
  }
}
