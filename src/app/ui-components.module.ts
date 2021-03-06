import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule, MatInputModule,
  MatListModule, MatSelectModule,
  MatSidenavModule, MatTableModule,
  MatToolbarModule
} from '@angular/material';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [
    ChartsModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatSelectModule,
  ]
})
export class UiComponentsModule {
}
