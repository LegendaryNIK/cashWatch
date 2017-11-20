import { Injectable } from '@angular/core';

import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore, AngularFirestoreDocument } from "angularfire2/firestore";
import { Router } from "@angular/router";
import * as firebase from "firebase/app";

import { User } from '../interfaces/user.interface';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AuthService {

  user: Observable<User>;
  uid: string;

  constructor( private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          this.uid = user.uid;
          return this.afs.doc(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then(loginData => {
        console.log(loginData);
        this.updateUserData(loginData.user);
      })
      .then(() => {
        setTimeout(() => this.router.navigate(['/dashboard']),300);
      });
  }

  private updateUserData(userData) {
    const UserRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${userData.uid}`);
    UserRef.valueChanges().subscribe(storedUser => {
      if (!storedUser) {
        const data: User = {
          uid: userData.uid,
          name: userData.displayName
        };
        return UserRef.set(data);
      }
    });
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(() => {
      this.router.navigate(['/login']);
      console.log('signed out');
      });
  }

}
