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
  hasWallets: boolean = false;
  wallets: any;

  constructor(private data: UserDataService, public fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.newWalletForm = this.fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      'balance': ['', Validators.compose([Validators.required, Validators.max(99999) ])],
      'currency': ['UAH', Validators.required]
    });
    this.auth.user.take(1).subscribe(success => this.userName = success.name);
    this.data.wallets.subscribe( success => {
      this.wallets = success;
      if (success.length === 0) {
        this.hasWallets = false;
        this.router.navigate(['/dashboard']);
        console.log(this.router.url);
      } else {
        this.hasWallets = true;
        if (this.router.url === '/dashboard') this.router.navigate([`dashboard/${success[0].id}`] );
      }
    });
  }

  addNewWallet() {
    this.data.addWallet(this.newWalletForm.value)
      .then(ref => this.router.navigate([`dashboard/${ref.id}`]));
    this.newWalletForm.reset({currency: 'UAH'});
  }

}
