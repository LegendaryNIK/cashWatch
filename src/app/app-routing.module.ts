import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {AuthGuard} from "./core/auth.guard";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {WalletComponent} from "./wallet/wallet.component";

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: ':id',
        component: WalletComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
