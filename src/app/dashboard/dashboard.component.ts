import { Component, OnInit } from '@angular/core';
import {UserDataService} from "../providers/user-data.service";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../core/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  newWalletForm: FormGroup;
  userName: string;

  constructor(private data: UserDataService, public fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.newWalletForm = this.fb.group({
      'name': ['', Validators.required],
      'balance': ['', Validators.required],
      'currency': ['', Validators.required],
    });
    this.auth.user.take(1).subscribe(success => this.userName = success.name);
    this.data.wallets.take(1).subscribe(wallets => {
      if (wallets[0]) {
        this.router.navigate([`dashboard/${wallets[0].id}`] );
      }
    });
  }

  addNewWallet() {
    this.data.addWallet(this.newWalletForm.value)
      .then(ref => this.router.navigate([`dashboard/${ref.id}`]));
    this.newWalletForm.reset();
  }

}
