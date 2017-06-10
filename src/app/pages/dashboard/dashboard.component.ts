import {Component} from '@angular/core';

import {_LIST, _USER_LIST_RESPONSE, User} from 'angular-backend';

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard {


  data = {
    areaLineData: {
    labels: [1, 2, 3, 4, 5, 6, 7, 8],
    series: [
      [5, 9, 7, 8, 5, 3, 5, 4]
    ]
  },
    areaLineOptions: {
      fullWidth: true,
      height: '300px',
      low: 0,
      showArea: false
    }
  };

  searchQuery: _LIST = {};

  // sevenDaysAgo = (new Date().getTime() - ( 7 * 24 * 60 * 60 * 1000 )).toString().substring(0,10);
  today = Math.round((new Date).getTime() / 1000);
  sevenDaysAgo = this.today - (7 * 24 * 60 * 60);

  constructor(
    private user: User
  ) {
    this.getUserGraph();
  }

  //
  // SELECT DATE(FROM_UNIXTIME(created)) AS PerDay,
  // COUNT(*) AS NewRegister
  // FROM `be04_user`
  // GROUP BY DATE(FROM_UNIXTIME(created))
  // ORDER BY PerDay



  getUserGraph() {
    let q = this.searchQuery;
    q.select = "DATE( FROM_UNIXTIME( created ) ) AS PerDay, COUNT( id ) AS NewRegister";
    q.where = "cast(? as integer) GROUP BY DATE(FROM_UNIXTIME(created))";
    q.bind = "1";
    //q.order  = "PerDay";
    console.log('Query:: ', q);
    this.user.list( q ).subscribe( (res: _USER_LIST_RESPONSE ) => {
      console.log('getUserGraph.list:: ', res);
      if( res.code === 0 ) {

      }
    }, e => this.user.alert(e) );
  }

}
