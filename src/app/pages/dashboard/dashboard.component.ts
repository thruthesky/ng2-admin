import {Component} from '@angular/core';

import { Router } from '@angular/router';


import {
  _LIST, _USER_LIST_RESPONSE,
  PostData, User
} from 'angular-backend';

import { LMS } from './../../providers/lms';
import { ShareService } from './../../providers/share-service';


@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard {


  data = {
    reservationChartData: {
      labels: [],
      series: []
    },
    reservationChartOption: {
      fullWidth: true,
      height: '300px',
      low: 0,
      showArea: false
    },
    newUserChartData: {
      labels: [],
      series: []
    },
    newUserChartOption: {
      fullWidth: true,
      height: '300px',
      low: 0,
      showArea: false
    }
  };

  today = Math.round((new Date()).getTime() / 1000);
  sevenDaysAgo = this.today - (7 * 24 * 60 * 60);

  constructor(
    private user:       User,
    private postData:   PostData,
    private lms:        LMS,
    public  shared:     ShareService,
    private router:      Router
  ) {

    this.getUserGraph();
    this.getUserCount();
    //this.getPostCount();
    this.getNewUserCount();
    this.getNewPostCount();
    this.getAdminDashboardInformation();
  }


  getUserGraph() {
    let q: _LIST = {};
    q.select = "DATE( FROM_UNIXTIME( created ) ) AS perDay, COUNT(idx) AS total, idx";
    q.where = "created > cast(? as integer) GROUP BY PerDay";
    q.bind = "sevenDaysAgo";
    this.user.list( q ).subscribe( (res: _USER_LIST_RESPONSE ) => {
      if( res.code === 0 ) {
        //let labels = [];
        let series = [];
        res.data.users.map( v => {
          //labels.push(v['perDay']);
          series.push(v['total']);
        });
        //console.log(series);
        this.data.newUserChartData = {
          'labels': [],
          'series': [series]
        };
      }
    }, e => this.user.alert(e) );
  }

  getAdminDashboardInformation() {
    this.lms.loadAdminDashboard( res => {
      console.log('AdminDashboard::', res);
      this.shared.noOfReservations.stats = res.no_of_reserved_classes;
      this.shared.noOfStudents.stats = res.no_of_students;
      //this.shared.admin_dashboard_info.no_of_today_classes = res.no_of_today_classes;

      //let labels = [];
      let series = [];
      res.stat_of_classes.map( v => {
        //labels.push(v['date']);
        series.push(v['no']);
      });
      this.data.reservationChartData = {
        'labels': [],
        'series': [series]
      };

    }, error => this.user.alert(error));
  }

  getUserCount() {
    let q:_LIST = {};
    q.limit = 1;
    q.order = 'idx DESC';
    this.user.list( q ).subscribe( (res: _USER_LIST_RESPONSE ) => {
      console.log('getuser', res);
      if( res.code === 0 ) {
        this.shared.totalUser.stats = res.data.total;
      }
    }, e => {
      console.log("ERROR: ", e);
      if ( parseInt(e.code) === -40105 ) {
        this.router.navigateByUrl("/login");
      }
      else this.user.alert(e);
    });
  }

  getNewUserCount() {
    let q: _LIST = {};
    q.limit = 1;
    q.order = 'idx DESC';
    q.where = 'created >= cast( ? as integer )';
    q.bind = '' + this.sevenDaysAgo;
    this.user.list( q ).subscribe( (res: _USER_LIST_RESPONSE ) => {
      if( res.code === 0 ) {
        this.shared.newUser.stats = res.data.total;
      }
    }, e => {
      //console.log("ERROR: ", e);
      if ( parseInt(e.code) === -40105 ) {
        this.router.navigateByUrl("/login");
      }
      else this.user.alert(e);
    } );
  }

  getNewPostCount() {
    let q: _LIST = {};
    q.limit = 1;
    q.where = 'created >= cast( ? as integer )';
    q.bind = '' + this.sevenDaysAgo;
    this.postData.list(q).subscribe( (res: _USER_LIST_RESPONSE ) => {
      //console.log('newpost.list:: ', res);
      if( res.code === 0 ) {
        this.shared.no_of_new_post = res.data.total;
      }
    }, e => {
      //console.log("ERROR: ", e);
        if ( parseInt(e.code) === -40105 ) {
          this.router.navigateByUrl("/login");
        }
        else this.user.alert(e);
    } );
  }


  // getPostCount() {
  //   let q:_LIST = {};
  //   q.limit = 1;
  //   this.postData.list( q ).subscribe( (res: _USER_LIST_RESPONSE ) => {
  //     console.log('post.list:: ', res);
  //     if( res.code === 0 ) {
  //       this.shared.no_of_all_post = res.data.total;
  //     }
  //   }, e => this.user.alert(e) );
  // }

}
