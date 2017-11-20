import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {UserDataService} from "../providers/user-data.service";
import {FormBuilder, FormGroup, Validators, AbstractControl} from "@angular/forms";

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
      'sum': ['', Validators.compose([Validators.required, Validators.min(0.1)])],
      'isIncome': false,
      'name': ['', Validators.maxLength(20)],
      'category': '',
    });
    this.router.params.subscribe(() => {
      this.getHistory().subscribe(history => this.history = history);
      this.getChartData();
    });
  }

  addTransaction(oldBal: number) {
    const values = this.transactionForm.value;
    console.log(this.transactionForm.value.isIncome);
    if (!values.isIncome) {
      values.sum *= -1;
      if (values.category === '') {values.category = 'Misc'}
    }
    else {
      values.category = 'Income';
    }
    this.data.addTransaction(this.id, oldBal, values);
    this.transactionForm.reset({isIncome: false, category:''})
  }

  getHistory() {
    return this.data.queryTransactions(this.id);
  }

  getSpendings() {
    console.log(this.id);
    return this.data.queryTransactions(this.id, {isIncome: false});
  }

  getChartData() {
    this.getSpendings().subscribe(spends => {
      this.chartData = [];
      this.categories.forEach((category, index) => {
        this.chartData[index] = 0;
        const filteredSpends = spends.filter((val) => val.category === category );
        filteredSpends.forEach(spend => {
          if (spend.sum < 0) {
            console.log(spend.sum);
            this.chartData[index] += Math.abs(spend.sum);
          }
        });
      });
    });
  }

}
