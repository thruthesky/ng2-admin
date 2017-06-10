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

  today = Math.round((new Date).getTime() / 1000);
  sevenDaysAgo = this.today - (7 * 24 * 60 * 60);

  constructor(
    private user: User
  ) {
    this.getUserGraph();
  }

  getUserGraph() {
    let q = this.searchQuery;
    q.select = "DATE( FROM_UNIXTIME( created ) ) AS perDay, COUNT(idx) AS total, idx";
    q.where = "created > cast(? as integer) GROUP BY PerDay";
    q.bind = "sevenDaysAgo";
    //q.order  = "PerDay";
    //console.log('Query:: ', q);
    this.user.list( q ).subscribe( (res: _USER_LIST_RESPONSE ) => {
      //console.log('getUserGraph.list:: ', res);
      if( res.code === 0 ) {
        let labels = [];
        let series = [];
        res.data.users.map( v => {
          labels.push(v['perDay']);
          series.push(v['total']);
        });
        //console.log(series);
        this.data.areaLineData = {
          'labels': labels,
          'series': [series]
        };
        //console.log('Data::', this.data);
      }
    }, e => this.user.alert(e) );
  }

}
