import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
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
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
  ]
})
export class UiComponentsModule {
}
