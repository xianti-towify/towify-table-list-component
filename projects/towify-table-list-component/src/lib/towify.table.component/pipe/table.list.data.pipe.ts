import { Pipe, PipeTransform } from '@angular/core';
import { ColumnInfoType } from '../type/table.list.type';

@Pipe({
  name: 'tableDataUpdate'
})
export class TableListDataPipe implements PipeTransform {
  transform(length: number, columnInfos: ColumnInfoType[], defaultWidth: number, minWidth: number): string[] {
    columnInfos.forEach(info => {
      if (!info.width) {
        info.width = defaultWidth;
      }
      if (info.width < minWidth) {
        info.width = minWidth;
      }
    });
    console.log('pipe update data');
    return columnInfos.map(info => info.id);
  }
}
