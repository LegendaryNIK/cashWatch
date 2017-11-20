import { Component, OnInit, AfterViewInit } from '@angular/core';
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
  categories: any = [];
  history: any = [];
  labels: any;
  chartData: any;

  constructor(private router: ActivatedRoute, private data: UserDataService, private fb: FormBuilder) {
    router.params.subscribe(success => {
      this.id = success.id;
      this.walletData = this.data.selectWallet(this.id);
      this.chartData = [];
    });
    this.data.categoryCollection.take(1).subscribe(success => {
      this.categories = success.map(cat => cat.name);
    });
  }

  ngOnInit() {
    this.transactionForm = this.fb.group({
      'sum': '',
      'isIncome': false,
      'name': '',
      'category': '',
    });
    this.router.params.subscribe(() => {
      this.getHistory().subscribe(history => this.history = history);
      this.getChartData();
    });
  }

  addTransaction(oldBal: number) {
    console.log(this.transactionForm.value.isIncome);
    if (!this.transactionForm.value.isIncome) this.transactionForm.value.sum *= -1;
    return this.data.addTransaction(this.id, oldBal, this.transactionForm.value);
  }

  getHistory() {
    return this.data.queryTransactions(this.id);
  }

  getSpendings() {
    console.log(this.id);
    return this.data.queryTransactions(this.id, {isIncome: false});
  }

  getChartData() {
    this.getSpendings().subscribe(success => {
      this.chartData = [];
      this.categories.forEach((category, index) => {
        this.chartData[index] = 0;
        let a = success.filter((val) => val.category === category );
        a.forEach(b => {
          if (b.sum < 0) {
            console.log(b.sum);
            this.chartData[index] += Math.abs(b.sum);
          }
        });
        console.log(this.chartData);
      });
    });
  }

}
