import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
/*
import {}  from '@angular/material';
*/
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './core/auth.service';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import {CoreModule} from "./core/core.module";
import { UserDataService } from './user-data.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    CoreModule,
    FormsModule
  ],
  providers: [UserDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
