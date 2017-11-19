import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {UserDataService} from "../providers/user-data.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  walletData: any;
  id: string;
  transactionForm: FormGroup;

  constructor(private router: ActivatedRoute, private data: UserDataService, private fb: FormBuilder) {
    router.params.subscribe(success => {
      this.id = success.id;
      this.walletData = this.data.selectWallet(this.id);
    });
  }

  ngOnInit() {
    this.transactionForm = this.fb.group({
      'sum': '',
      'isIncome': '-1',
      'name': ''
    });
  }

  addTransaction(oldBal: number){
    console.log(this.transactionForm.value);
    if (!this.transactionForm.value.isIncome) this.transactionForm.value.sum *= -1;
    return this.data.addTransaction(this.id, oldBal, this.transactionForm.value)
  }

}
