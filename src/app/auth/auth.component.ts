import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import {register} from "ts-node/dist";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {

  constructor(public auth: AuthService) {
  }

  ngOnInit() {
  }

}
