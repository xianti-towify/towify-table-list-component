/**
 * @Author  : xianti.xiong
 * @Date    : 2021/3/17
 * */
import { Component, Input, OnInit } from '@angular/core';
import interact from 'interactjs';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import type {
  ColumnConfigType,
  ColumnInfoType,
  RowValueType
} from './type/table.list.type';

@Component({
  selector: 'table-list-auto-width',
  templateUrl: './towify.table.list.component.html',
  styleUrls: ['./towify.table.list.component.scss']
})
export class TowifyTableListComponent implements OnInit {

  /** 列信息数组 每个列 item 包含列的 列名称、列宽(可选) */
  @Input()
  columnInfos: ColumnInfoType[] = [];

  /** 行元素信息数组， 每个 item 包含各个列的数值 */
  @Input()
  elementData: RowValueType[] = [];

  /** 默认列宽，当外部传入的列信息中某一列未设置列宽的时候，那么该列显示宽度为该默认值 */
  @Input()
  defaultWidth = 100;

  /** 最小列宽， 外部可以通过该属性控制列的最小显示宽度 */
  @Input()
  minWidth = 100;

  columnsDragConfig: {[key: string]: ColumnConfigType} = {};

  columnInfosLength = 0;

  displayColumns: string[] = [];

  ngOnInit(): void {
    this.updateColumnConfig();
    let dragColumnIndex = -1;
    let dragColumnWidth = 0;
    let dragColumnMoveX = 0;
    // 处理拖拽 修改列宽
    interact('.column-header').resizable({
      cursorChecker: () => 'ew-resize',
      edges: { left: false, right: true, bottom: false, top: false },
      listeners: {
        start: (event) => {
          const target = event.target as HTMLElement;
          if (!target) {
            return;
          }
          const columnId = target.id.split('+').shift();
          if (!columnId) {
            return;
          }
          // 获取拖拽列的宽度初始值
          dragColumnIndex = this.getColumnIndexById(columnId);
          if (dragColumnIndex !== -1) {
            dragColumnWidth = this.columnInfos[dragColumnIndex].width!;
          }
        },
        move: (event) => {
          dragColumnWidth = this.updateColumnWidth({
            dragColumnIndex,
            dx: event.dx,
            dragColumnWidth
          });
        },
        end: (event) => {
          dragColumnWidth = this.updateColumnWidth({
            dragColumnIndex,
            dx: event.dx,
            dragColumnWidth
          });
          // 重置共享变量值
          dragColumnWidth = 0;
          dragColumnIndex = -1;
        }
      }
    });
    // 处理拖拽 换列
    let lastDropInIndex = -1;
    interact('.column-drag-overlay-container').draggable({
      listeners: {
        start: (event) => {
          const target = event.target as HTMLElement;
          if (!target) {
            return;
          }
          const columnId = target.id.split('+').shift();
          if (!columnId) {
            return;
          }
          dragColumnIndex = this.getColumnIndexById(columnId);
          this.checkDragIndex(dragColumnIndex);
        },
        move: (event) => {
          const target = event.target as HTMLElement;
          if (!target) {
            return;
          }
          dragColumnMoveX += event.dx;
          target.style.transform = `translate(${  dragColumnMoveX  }px, ${  0  }px)`;
          const dropInIndex = this.findDropIndex(event.clientX, dragColumnIndex);
          this.checkDragIndex(dropInIndex);
          this.showDropInBox(lastDropInIndex, dropInIndex, dragColumnIndex);
          lastDropInIndex = dropInIndex;
        },
        end: (event) => {
          const target = event.target as HTMLElement;
          if (!target) {
            return;
          }
          const dropIndex = this.findDropIndex(event.clientX, dragColumnIndex);
          this.checkDragIndex(dropIndex);
          if (dropIndex !== dragColumnIndex) {
            // 切换列
            moveItemInArray(this.columnInfos, dragColumnIndex, dropIndex);
            this.displayColumns = this.columnInfos.map(info => info.id);
          } else {
            // 如果是未换列重置移动位置到初始位置
            target.style.transform = `translate(${  0  }px, ${  0  }px)`;
          }
          this.hideDropInBox();
          dragColumnMoveX = 0;
          dragColumnIndex = -1;
          lastDropInIndex = -1;
        }
      }
    });
  }

  updateColumnWidth(params:{
    dragColumnIndex: number; dx: number; dragColumnWidth: number;
  }): number {
    this.checkDragIndex(params.dragColumnIndex);
    const newWidth =  params.dragColumnWidth + params.dx;
    if (params.dragColumnWidth >=  this.minWidth) {
      this.columnInfos[params.dragColumnIndex].width = newWidth;
    } else {
      this.columnInfos[params.dragColumnIndex].width =  this.minWidth;
    }
    return newWidth;
  }

  getColumnIndexById(id: string): number {
    return this.columnInfos.findIndex(info => info.id === id);
  }


  getDisplayColumns() {
    this.updateColumnConfig();
    return this.displayColumns;
  }

  updateColumnConfig(): void {
    if (this.columnInfosLength !== this.columnInfos.length) {
      this.columnInfos.forEach(info => {
        if (!info.width) {
          info.width = this.defaultWidth;
        }
        if (info.width < this.minWidth) {
          info.width = this.minWidth;
        }
        if (!this.columnsDragConfig[info.id]) {
          this.columnsDragConfig[info.id] = {
            showColumnOverlayView: false,
            showDropInBox: false,
            cursor: 'default'
          };
        }
      });
      this.columnInfosLength = this.columnInfos.length;
      this.displayColumns = this.columnInfos.map(info => info.id);
    }
  }

  onColumnClicked(event: MouseEvent): void {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const target = event.target  as HTMLElement;
    if (!target) {
      return;
    }
    const columnId = target.id.split('+').shift();
    if (!columnId) {
      return;
    }
    this.hideDragOverlay();
    this.columnsDragConfig[columnId].showColumnOverlayView = true;
  }


  hideDragOverlay(): void {
    const keys = Object.keys(this.columnsDragConfig);
    keys.forEach(key => {
      this.columnsDragConfig[key].showColumnOverlayView = false;
      this.columnsDragConfig[key].showDropInBox = false;
    });
  }

  findDropIndex(moveOriginX: number, dragIndex: number): number {
    let dropIndex = dragIndex;
    let width = 0;
    this.columnInfos.forEach((item, index) =>{
      if (moveOriginX > width && moveOriginX < width + item.width!) {
        dropIndex = index;
      }
      width += item.width!;
    });
    if (moveOriginX >= width) {
      dropIndex = this.columnInfos.length - 1;
    }
    if (moveOriginX <= 0) {
      dropIndex = 0;
    }
    return dropIndex;
  }

  showDropInBox(lastDropInIndex: number, dropInIndex: number, dragColumnIndex: number): void {
    if (lastDropInIndex !== -1) {
      const item = this.columnInfos[lastDropInIndex];
      this.columnsDragConfig[item.id].showDropInBox = false;
    }
    if (dropInIndex !== -1 && dropInIndex !== dragColumnIndex) {
      const item = this.columnInfos[dropInIndex];
      this.columnsDragConfig[item.id].showDropInBox = true;
    }
  }

  hideDropInBox(): void {
    const keys = Object.keys(this.columnsDragConfig);
    keys.forEach(key => {
      this.columnsDragConfig[key].showDropInBox = false;
    });
  }

  checkDragIndex(dragIndex: number): void {
    if (dragIndex === -1) {
      throw Error('drag column index error!');
    }
  }
}
