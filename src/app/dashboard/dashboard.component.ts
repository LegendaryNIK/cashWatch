import { Component, OnInit } from '@angular/core';
import {UserDataService} from "../providers/user-data.service";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../core/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  newWalletForm: FormGroup;

  constructor(private data: UserDataService, public fb: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
    this.newWalletForm = this.fb.group({
      'name': ['', Validators.required],
      'balance': '0',
      'currency': '',
    });
  }

}
