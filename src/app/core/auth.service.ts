import { Injectable } from '@angular/core';

import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore, AngularFirestoreDocument } from "angularfire2/firestore";
import * as firebase from "firebase/app";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';

interface User {
  uid: string;
  name: string;
  wallet_ids?: Array<string>;
}

@Injectable()
export class AuthService {

  user: Observable<User>;

  constructor( private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user = this.afAuth.authState
      .switchMap(user => {
        console.log(user);
        if (user) {
          this.afs.doc(`users/${user.uid}`).valueChanges().subscribe(success => console.log(success));
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

  /*emailLogin(credentials: any) {
    console.log(credentials);
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(test => {console.log(this.user); });
  }*/

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then(loginData => {
        console.log(loginData);
        this.updateUserData(loginData.user);
      });
  }

  private updateUserData(userData) {
    const UserRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${userData.uid}`);
    UserRef.valueChanges().subscribe(userData => {
      if (!userData) {
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
      console.log('signed out');
      });
  }

}
