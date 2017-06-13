import { Injectable } from '@angular/core';
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


  // date:Date = new Date();
  // year:number = this.date.getFullYear();
  // month:number = parseInt(("0" + (this.date.getMonth() + 1)).slice(-2));

  newPosts: _POSTS = <_POSTS>[];
  todayClasses: _BOOKS = <_BOOKS>[];

  // admin_dashboard_info: _ADMIN_DASHBOARD_INFO = {
  //   no_of_reserved_classes: 0,
  //   no_of_students: 0,
  //   no_of_today_classes: 0
  // };

  no_of_new_post: number = 0;
  // no_of_all_post: number = 0;

  noOfReservations: _DATA_BOX = {
    color: 'grey',
    description: 'Reservations',
    stats: 0,
    icon: 'fa fa-calendar',
  };


  noOfStudents: _DATA_BOX = {
    color: 'grey',
    description: 'Students',
    stats: 0,
    icon: 'ion-android-contacts',
  };

  totalUser: _DATA_BOX = {
    color: 'grey',
    description: 'No of Users',
    stats: 0,
    icon: 'fa fa-users',
  };

  newUser: _DATA_BOX = {
    color: 'grey',
    description: 'No of New Users',
    stats: 0,
    icon: 'ion-android-person-add',
  };

  constructor() {
    console.log("SharedService::INITIALIZED");
  }


}
