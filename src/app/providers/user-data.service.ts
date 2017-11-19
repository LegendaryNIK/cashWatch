import { Injectable } from '@angular/core';
import {AuthService} from "../core/auth.service";
import * as firebase from "firebase/app";
import 'rxjs/add/operator/take';
import DocumentReference = firebase.firestore.DocumentReference;
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";

interface Wallet {
  name: string;
  startBalance: number;
  currency: string;
}

@Injectable()
export class UserDataService {
  user: any;
  walletsCollection: any;
  wallets: any;

  constructor(private auth: AuthService, private afs: AngularFirestore) {
    this.walletsCollection = this.afs.doc(`users/${this.auth.uid}`).collection('wallets');
    this.wallets = this.walletsCollection.snapshotChanges().map(wallet => {
      return wallet.map(w => {
        const data = w.payload.doc.data();
        const id = w.payload.doc.id;
        return {id, ...data};
      });
    });
  }

  addWallet(data: Wallet) {
    return this.walletsCollection.add(data);
  }

  selectWallet(id) {
    return this.walletsCollection.doc(id).valueChanges();
  }

  addTransaction(id, sum: number, isIncome: boolean, category: string) {
    const data = { sum: sum, category: category};
    const transCollection = this.walletsCollection.doc(id).collection('transactions');
    return transCollection.add(data);
  }
}


