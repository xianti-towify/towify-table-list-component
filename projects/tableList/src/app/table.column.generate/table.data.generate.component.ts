import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-table.column.generate',
  templateUrl: './table.data.generate.component.html',
  styleUrls: ['./table.data.generate.component.scss']
})
export class TableDataGenerateComponent implements OnInit {

  columnName = '';

  @Input()
  dataInfos: string[] = [];

  ngOnInit(): void {
  }

}
