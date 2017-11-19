import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from "./core/core.module";
import { UiComponentsModule } from "./ui-components.module";

import { AppComponent } from './app.component';

import { AuthComponent } from './auth/auth.component';
import { AngularFireModule } from 'angularfire2';
import { DashboardComponent } from './dashboard/dashboard.component';
import { environment } from '../environments/environment';
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
    UiComponentsModule
  ],
  providers: [UserDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
