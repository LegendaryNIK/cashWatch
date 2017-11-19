import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { AuthComponent } from './auth/auth.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import {CoreModule} from "./core/core.module";
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDataService } from './providers/user-data.service';
import { WalletComponent } from './wallet/wallet.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    WalletComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
  ],
  providers: [UserDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
