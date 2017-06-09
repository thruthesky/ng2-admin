import {Injectable} from '@angular/core';
import {BaThemeConfigProvider } from '../../../theme';

import { User, PostData, _LIST, _USER_LIST_RESPONSE } from 'angular-backend';

interface _DATA_BOX  {
  color: string;
  description: string;
  stats: number;
  icon: string;
}

@Injectable()
export class PieChartService {

  totalUser: _DATA_BOX = {
    color: 'grey',
    description: 'Users',
    stats: 0,
    icon: 'ion-android-contacts',
  };

  newUser: _DATA_BOX = {
    color: 'grey',
    description: 'New Users',
    stats: 0,
    icon: 'ion-android-person-add',
  };

  totalPost: _DATA_BOX = {
    color: 'grey',
    description: 'Posts',
    stats: 0,
    icon: 'ion-chatboxes',
  };

   newPost: _DATA_BOX = {
     color: 'grey',
     description: 'New Posts',
     stats: 0,
     icon: 'ion-chatbox-working',
   };

  searchQuery: _LIST = {
    limit: 1,
    order: 'idx DESC',
    extra: {}
  };

 // sevenDaysAgo = (new Date().getTime() - ( 7 * 24 * 60 * 60 * 1000 )).toString().substring(0,10);
  today = Math.round((new Date).getTime() / 1000);
  sevenDaysAgo = this.today - (7 * 24 * 60 * 60);

  constructor(private _baConfig:BaThemeConfigProvider,
              private user:User,
              private postData: PostData
  ) {

  }

  getUserCount() {
    this.user.list(this.searchQuery).subscribe( (res: _USER_LIST_RESPONSE ) => {
      //console.log('user.list:: ', res);
      if( res.code === 0 ) {
        this.totalUser.stats = res.data.total;
      }
    }, e => this.user.alert(e) );
  }

  getPostCount() {
    this.postData.list(this.searchQuery).subscribe( (res: _USER_LIST_RESPONSE ) => {
      //console.log('post.list:: ', res);
      if( res.code === 0 ) {
        this.totalPost.stats = res.data.total;
      }
    }, e => this.user.alert(e) );
  }

  getNewUserCount() {
    let q = this.searchQuery;
    q.where = 'created >= cast( ? as integer )';
    q.bind = '' + this.sevenDaysAgo;

    this.user.list( q ).subscribe( (res: _USER_LIST_RESPONSE ) => {
      //console.log('NewUsers.list:: ', res);
      if( res.code === 0 ) {
        this.newUser.stats = res.data.total;
      }
    }, e => this.user.alert(e) );
  }


  getNewPostCount() {
    let q = this.searchQuery;
    q.where = 'created >= cast( ? as integer )';
    q.bind = '' + this.sevenDaysAgo;
    this.postData.list(q).subscribe( (res: _USER_LIST_RESPONSE ) => {
      //console.log('post.list:: ', res);
      if( res.code === 0 ) {
        this.newPost.stats = res.data.total;
      }
    }, e => this.user.alert(e) );
  }


  getData() {
    this.getUserCount();
    this.getPostCount();
    this.getNewUserCount();
    this.getNewPostCount();

    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;

    if( pieColor ) {
      this.totalUser.color = this.newUser.color = this.totalPost.color = this.newPost.color = pieColor;
    }

    let boxes = [this.totalUser, this.newUser, this.totalPost , this.newPost];
    //console.log('boxes',boxes);
    return boxes;
  }
}
