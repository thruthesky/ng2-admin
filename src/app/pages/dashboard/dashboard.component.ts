import {Component, ElementRef, ViewChild} from '@angular/core';

import { Router } from '@angular/router';


import {
  _LIST, _USER_LIST_RESPONSE,
  PostData, User
} from 'angular-backend';

import { LMS } from './../../providers/lms';
import { ShareService } from './../../providers/share-service';

import {BaThemeConfigProvider, colorHelper, layoutPaths} from '../../theme';



@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard {


  registrationChartData = {
    type: 'serial',
    theme: 'blur',
    marginTop: 15,
    marginRight: 15,
    responsive: {
      'enabled': true
    },
    dataProvider: [
    ],
    categoryField: 'date',
    categoryAxis: {
      parseDates: true,
      gridAlpha: 0,
      color: '#000',
      axisColor: '#000'
    },
    valueAxes: [
      {
        minVerticalGap: 50,
        gridAlpha: 0,
        color: '#000',
        axisColor: '#000',
        minimum: 0
      }
    ],
    graphs: [
      {
        id: 'g1',
        bullet: 'none',
        useLineColorForBulletBorder: true,
        lineColor: colorHelper.hexToRgbA('#0615e3', 0.15),
        lineThickness: 1,
        negativeLineColor: '#000',
        type: 'smoothedLine',
        valueField: 'value',
        fillAlphas: 1,
        fillColorsField: 'lineColor'
      }
    ],
    chartCursor: {
      categoryBalloonDateFormat: 'DD',
      categoryBalloonColor: '#4285F4',
      categoryBalloonAlpha: 0.7,
      cursorAlpha: 0,
      valueLineEnabled: true,
      valueLineBalloonEnabled: true,
      valueLineAlpha: 0.5
    },
    dataDateFormat: 'MM YYYY',
    export: {
      enabled: true
    },
    creditsPosition: 'bottom-right',
    zoomOutButton: {
      backgroundColor: '#fff',
      backgroundAlpha: 0
    },
    zoomOutText: '',
    pathToImages: layoutPaths.images.amChart
  };

  reservationChartData  = JSON.parse(JSON.stringify(this.registrationChartData));


  registrationChange: boolean = false;
  reservationChange:  boolean = false;

  today = Math.round((new Date()).getTime() / 1000);
  sevenDaysAgo = this.today - (7 * 24 * 60 * 60);
  oneMonth = this.today - (30 * 24 * 60 * 60);
  threeMonths = this.today - (90 * 24 * 60 * 60);



  constructor(
    private user:        User,
    private postData:    PostData,
    private lms:         LMS,
    public  shared:      ShareService,
    private router:      Router,
    private _baConfig:   BaThemeConfigProvider
  ) {

    //console.log("location_href: ", window['location_href'])

    this.getAdminDashboardInformation();
    this.getUserGraph();
    this.getUserCount();
    //this.getPostCount();
    this.getNewUserCount();
    this.getNewPostCount();
    this.reservationChartData.graphs[0].lineColor = colorHelper.hexToRgbA('#21ff14', 0.15);
  }


  getUserGraph() {
    let q: _LIST = {};
    q.select = "DATE( FROM_UNIXTIME( created ) ) AS perDay, COUNT(idx) AS total, idx";
    q.where = "created > cast(? as integer) GROUP BY PerDay";
    q.bind = "" + this.threeMonths;


    q.limit = 100;
    this.user.list( q ).subscribe( (res: _USER_LIST_RESPONSE ) => {
      //console.log('userGraph:: ', res);
      if( res.code === 0 ) {
        //let labels = [];
        let data = [];
        res.data.users.map( v => {
          data.push({date: this.parse(v['perDay']) ,value:v['total']});
        });
        this.registrationChartData.dataProvider = data;
        this.registrationChange = ! this.registrationChange;
      }
    }, e => this.user.alert(e) );
  }

  getAdminDashboardInformation() {
    //console.log('getAdminDashboardInformation');
    this.lms.loadAdminDashboard( res => {
      this.shared.noOfReservations.stats = res.no_of_reserved_classes;
      this.shared.noOfStudents.stats = res.no_of_students;

      let data = [];
      res.stat_of_classes.map( v => {
        data.push({date: this.parse(v['date']) ,value:v['no']});
      });
      this.reservationChartData.dataProvider = data;
      this.reservationChange = ! this.reservationChange;
      //console.log('chartData', this.chartData);
    }, error => {
      this.user.alert(error);
    });
  }

  getUserCount() {
    let q:_LIST = {};
    q.limit = 1;
    q.order = 'idx DESC';
    this.user.list( q ).subscribe( (res: _USER_LIST_RESPONSE ) => {
      //console.log('getuser', res);
      if( res.code === 0 ) {
        this.shared.totalUser.stats = res.data.total;
      }
    }, e => {
      //console.log("ERROR: ", e);
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

  parse(str) {
    let date = str.replace(/-/g, '');
    if( !/^(\d){8}$/.test( date ) ) return "invalid date";
    let y = date.substr(0,4),
      m = date.substr(4,2) - 1,
      d = date.substr(6,2);
    return new Date(y,m,d);
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
