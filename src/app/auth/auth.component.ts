import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from "@angular/router";
import 'rxjs/add/operator/take'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {

  constructor(public auth: AuthService, private route: Router) {
  }

  ngOnInit() {
    this.auth.user.take(1).subscribe(user => {
      console.log(user);
      if (user !== null) this.route.navigate(['dashboard']);
    });
  }

}
