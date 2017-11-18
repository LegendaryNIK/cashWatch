import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import {register} from "ts-node/dist";

class LoginData{
  constructor(public email: string, public password: string){}
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {

  loginData: LoginData;

  constructor(public auth: AuthService) {
    this.loginData = new LoginData('','');
  }

  ngOnInit() {
  }

}
