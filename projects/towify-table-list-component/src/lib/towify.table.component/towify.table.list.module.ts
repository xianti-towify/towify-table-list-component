/**
 * @Author  : xianti.xiong
 * @Date    : 2021/3/17
 * */
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TowifyTableListComponent } from './towify.table.list.component';
import { TableListDataPipe } from './pipe/table.list.data.pipe';

@NgModule({
  declarations: [TowifyTableListComponent, TableListDataPipe],
  imports: [
    MatTableModule,
    BrowserAnimationsModule
  ],
  exports: [TowifyTableListComponent]
})
export class TowifyTableListModule {}
