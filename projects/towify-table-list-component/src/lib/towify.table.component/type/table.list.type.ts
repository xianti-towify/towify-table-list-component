export type RowValueType = { [key: string]: string | number };

export type ColumnInfoType = {
  id: string;
  name: string;
  width?: number;
};

export type ColumnConfigType = {
  showColumnOverlayView: boolean;
  showDropInBox: boolean;
  cursor: string;
};
