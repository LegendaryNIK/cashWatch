import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserDataService } from "../providers/user-data.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseChartDirective } from "ng2-charts";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})

export class WalletComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  walletData: any;
  id: string;
  transactionForm: FormGroup;
  categories: Array<string> = [];
  chartLabels: Array<string> = [];
  history: Array<any> = [];
  chartData: Array<number> = [];

  constructor(private router: ActivatedRoute, private data: UserDataService, private fb: FormBuilder) {
    router.params.subscribe(success => {
      this.id = success.id;
      this.walletData = this.data.selectWallet(this.id);
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
      if (values.category === '') {
        values.category = 'Misc';
      }
    } else {
      values.category = 'Income';
    }
    this.data.addTransaction(this.id, oldBal, values);
    this.transactionForm.reset({isIncome: false, category: ''});
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
      this.chartLabels = [];
      spends.forEach(spend => {
        if (this.chartLabels.indexOf(spend.category) === -1) this.chartLabels.push(spend.category);
      });
      if (this.chart) this.chart.chart.config.data.labels = this.chartLabels;
      this.chartLabels.forEach((category, index) => {
        this.chartData[index] = 0;
        const filteredSpends = spends.filter((val) => val.category === category);
        filteredSpends.forEach(spend => {
          if (spend.sum < 0) {
            console.log(this.chartLabels);
            this.chartData[index] += Math.abs(spend.sum);
          }
        });
      });
    });
  }
}
