import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import {Router} from "@angular/router";
import {FirebaseListObservable} from "angularfire2/database";
import {FirebaseService} from "../../providers/firebase";

@Component({
  selector: 'leveltest-history-page',
  templateUrl: './leveltest-history.html',
  styleUrls: ['./leveltest-history.scss']
})
export class LevelTestHistoryPage {

  settings = {
    actions: false,
    columns: {
      name: {
        title: 'Name',
        type: 'string',
        filter:false
      },
      phone: {
        title: 'Mobile',
        type: 'string',
        filter:false
      },
      date: {
        title: 'Date',
        type: 'string',
        filter:false
      },
      ipAddress: {
        title: 'IP Address',
        type: 'string',
        filter:false
      },
      time: {
        title: 'Time',
        type: 'string',
        filter:false
      }
    },
    pager: {
      display: false
    },
  };

  source: LocalDataSource = new LocalDataSource();

  level_test_history: FirebaseListObservable<any[]>;

  constructor(
    public router: Router,
    private fc: FirebaseService,
  ) {

    this.level_test_history = this.fc.getRecords('level_test', {limitToLast:50, orderByKey:true});
    this.level_test_history.subscribe( snap => {
      //console.log('snap::', snap);
      if( snap && snap.length ) {
        this.source.load(snap.reverse());
      }


    });

  }

}
