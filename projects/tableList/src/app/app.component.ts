import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';
import { ColumnInfoType, RowValueType } from '../../../towify-table-list-component/src';
import { TableDataGenerateComponent } from './table.column.generate/table.data.generate.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'livetabledemo';

  defaultElementData: RowValueType[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'}
  ];

  defaultColumnInfos: ColumnInfoType[] = [
    {
      id: 'position',
      name: 'position',
      width: 200
    },
    {
      id: 'name',
      name: 'name',
      width: 300
    },
    {
      id: 'weight',
      name: 'weight',
      width: 300
    },
    {
      id: 'symbol',
      name: 'symbol',
      width: 300
    }
  ];


  constructor(
    private readonly dialog: MatDialog
  ) {
  }

  ngOnInit(): void {

  }

  addNewColumn(columnName: string, width?: number): void {
    if (columnName.length <= 0) {
      return;
    }
    let addIndex = -1;
    this.defaultColumnInfos.forEach((item, index) => {
      if (item.name === columnName) {
        addIndex = index;
      }
    });
    if (addIndex !== -1) {
      alert('待插入的列已存在');
      return;
    }
    this.defaultColumnInfos.push({
      id: uuidv4(),
      name: columnName,
      width
    });
    this.defaultElementData.forEach(item => {
      const newValue: RowValueType = {};
      newValue[columnName] = 'testValue';
      Object.assign(item, newValue);
    });
  }


  testRemoveColumn(columnName: string): void {
    if (columnName.length <= 0) {
      return;
    }
    let deleteIndex = -1;
    this.defaultColumnInfos.forEach((item, index) => {
      if (item.name === columnName) {
        deleteIndex = index;
      }
    });
    if (deleteIndex === -1) {
      alert('未找到待删除的列');
    } else {
      this.defaultColumnInfos.splice(deleteIndex, 1);
      this.defaultElementData.forEach(item => {
        delete item[columnName];
      });
    }
  }


  showCreateColumnDialog(): void {
    const createColumnDialog = this.dialog.open(TableDataGenerateComponent, {
      width: '300px'
    });
    createColumnDialog.afterClosed().subscribe((result) => {
      this.addNewColumn(result.columnName, result.columnWidth);
    });
  }
}
