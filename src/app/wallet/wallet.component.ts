import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {UserDataService} from "../providers/user-data.service";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  walletData: any;
  id: string;

  constructor(private router: ActivatedRoute, private data: UserDataService) {
    router.params.subscribe(success => {
      this.id = success.id;
      this.walletData = this.data.selectWallet(this.id);
    });
  }

  ngOnInit() {
  }

}
