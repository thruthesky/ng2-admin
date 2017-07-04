import {EventEmitter, Injectable} from '@angular/core';
import { _POSTS } from "angular-backend";
import { _BOOKS} from "./lms";

// import {
// } from 'angular-backend';
export interface _DATA_BOX  {
  color: string;
  description: string;
  stats: number;
  icon: string;
}

export interface _ADMIN_DASHBOARD_INFO {
  no_of_reserved_classes: number;
  no_of_students: number;
  no_of_today_classes: number;
}


@Injectable()
export class ShareService {

  public myEvent: EventEmitter<any> = new EventEmitter<any>();

  searchString: string;

  newPosts: _POSTS = <_POSTS>[];
  todayClasses: _BOOKS = <_BOOKS>[];


  no_of_new_post: number = 0;

  noOfReservations: _DATA_BOX = {
    color: 'grey',
    description: '예약된 수업',
    stats: 0,
    icon: 'fa fa-calendar',
  };


  noOfStudents: _DATA_BOX = {
    color: 'grey',
    description: '학생 수',
    stats: 0,
    icon: 'ion-android-contacts',
  };

  totalUser: _DATA_BOX = {
    color: 'grey',
    description: '회원 수',
    stats: 0,
    icon: 'fa fa-users',
  };

  newUser: _DATA_BOX = {
    color: 'grey',
    description: '새로운 회원 수',
    stats: 0,
    icon: 'ion-android-person-add',
  };

  constructor() {
    //console.log("SharedService::INITIALIZED");
  }


  getQueryVariable( variable )
  {
    let query = window['location_href'];
    if( ! query ) return false;
    let vars = query.split("&");
    for ( let i = 0; i < vars.length; i++ ) {
      let pair = vars[i].split("=");
      if( pair[0] === variable) { return pair[1]; }
    }
    return(false);
  }


  decode_URI( data ): string {
    let params:string = null;
    if( data ) {
        params = decodeURIComponent(data).replace(/\++/g, ' ');
    }
    return params;
  }




}
