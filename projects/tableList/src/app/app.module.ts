import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {
  TowifyTableListModule
} from '../../../towify-table-list-component/src';
import { TableDataGenerateComponent } from './table.column.generate/table.data.generate.component';

@NgModule({
  declarations: [AppComponent, TableDataGenerateComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TowifyTableListModule,
    MatRippleModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
