import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import {Router} from "@angular/router";
import {FirebaseListObservable} from "angularfire2/database";
import {FirebaseService} from "../../providers/firebase";

@Component({
  selector: 'payment-history-page',
  templateUrl: './payment-history.html',
  styleUrls: ['./payment-history.scss']
})
export class PaymentHistoryPage {

  settings = {
    actions: false,
    columns: {
      id: {
        title: 'User ID',
        type: 'string',
        filter:false
      },
      status: {
        title: 'Payment Status',
        type: 'string',
        filter:false
      },
    },
    pager: {
      display: false
    },
  };

  source: LocalDataSource = new LocalDataSource();

  payment_history: FirebaseListObservable<any[]>;

  constructor(
    public router: Router,
    private fc: FirebaseService,
  ) {

    this.payment_history = this.fc.getRecords('payment', { limitToLast:50, orderByKey:true });
    this.payment_history.subscribe( snap => {
      //console.log('snap::', snap);
      if( snap && snap.length ) {
        this.source.load( snap.reverse() );
      }
    });
  }



}
