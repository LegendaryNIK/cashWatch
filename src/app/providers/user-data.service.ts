import { Injectable } from '@angular/core';
import { AuthService} from "../core/auth.service";
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Wallet } from '../interfaces/wallet.interface';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/take';

@Injectable()
export class UserDataService {
  walletsCollection: AngularFirestoreCollection<any>;
  wallets: Observable<any>;
  categoryCollection: Observable<any>;

  constructor(private auth: AuthService, private afs: AngularFirestore) {
    this.walletsCollection = this.afs.doc(`users/${this.auth.uid}`).collection('wallets');
    this.categoryCollection = this.afs.collection('categories').valueChanges();
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

  deleteWallet(id: string){
    return this.walletsCollection.doc(id).delete();
  }

  selectWallet(id) {
    return this.walletsCollection.doc(id).valueChanges();
  }

  addTransaction(id, oldBal: number, params: any) {
    const data = params;
    data['dateTime'] = new Date();
    const transCollection = this.walletsCollection.doc(id).collection('transactions');
    this.updateBalance(oldBal, params.sum, id);
    return transCollection.add(data);
  }

  updateBalance (oldBal: number, sum: number, id: string) {
    const balance = oldBal + sum;
    return this.walletsCollection.doc(id).update({balance: balance});
  }

  queryTransactions(id: string, params?: any) {
    let transCollection;
    const ref = this.walletsCollection.doc(id);
    if (params && Object.keys(params)[0] === 'isIncome') {
      transCollection = ref
        .collection('transactions', trans => trans.where('isIncome', '==', params.isIncome));
    }
    else if (params && Object.keys(params)[0] === 'category') {
      transCollection = ref
        .collection('transactions', trans => trans.where('category', '==', params.category));
    }
    else {
      transCollection = ref
        .collection('transactions', trans => trans.orderBy('dateTime', 'desc'));
    }
    console.log(transCollection);
    return transCollection.valueChanges();
  }
}


