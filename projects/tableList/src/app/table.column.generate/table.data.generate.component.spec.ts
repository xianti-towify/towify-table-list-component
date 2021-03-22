import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDataGenerateComponent } from './table.data.generate.component';

describe('Table.Column.GenerateComponent', () => {
  let component: TableDataGenerateComponent;
  let fixture: ComponentFixture<TableDataGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDataGenerateComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDataGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
