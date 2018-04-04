import { Component, NgZone } from '@angular/core';

import {
  Meta,
  _META_CREATE,
  _META_CREATE_RESPONSE,
  _DELETE_REQUEST
} from 'angular-backend';

import {
    File,
    _FILE,
    _UPLOAD_RESPONSE, _DELETE_RESPONSE, _UPLOAD,
    ERROR_NO_FILE_SELECTED
} from 'angular-backend';
import {LMS, TEACHERS} from "../../providers/lms";



export interface _TEACHER {
  idx?: number;
  status_url?: string;
}



export interface _TEACHER  {
  idx?: number;
  status_url?: string;
}

export interface _STATUS  {
  best?: boolean;
  good?: boolean;
  new?: boolean;
}


export type _TEACHER_STATUS  = _STATUS[];


@Component({
  selector: 'teachers-page',
  templateUrl: './teachers.html',
  styleUrls: ['./teachers.scss']
})
export class TeachersPage {


  teacher_config = 'teachers-status';
  teachers: TEACHERS = [];


  teachers_status = <_TEACHER_STATUS>{};

  constructor(
   private meta: Meta,
   private file: File,
   private ngZone: NgZone,
   private lms: LMS,
  ){
    this.lms.getTeachers( teachers => {
      this.teachers = teachers;
      // console.log("teachers::", this.teachers);
      this.getTeacherStatus(status => {
        // console.log("getTeacherStatus::", status);
        if ( ! status ) return;
        this.teachers.forEach( teacher => {

          // console.log("teacher::", teacher);

          this.teachers_status[teacher.idx] = {
            best: false,
            good: false,
            new: false
          };

          if (status[teacher.idx]) {
            this.teachers_status[teacher.idx] = status[teacher.idx];
          }

        });

        // console.log("getTeacherStatus::", this.teachers_status);
      });
    });
  }



  onClickSaveMeta( update = false ){
    // console.log("onClickSaveMeta:: ", this.teachers_status);
    let req: _META_CREATE = {
      model: 'config',
      model_idx: 1,
      code: this.teacher_config,
      data: JSON.stringify( this.teachers_status )
    };
    this.meta.create( req ).subscribe( (res: _META_CREATE_RESPONSE) => {
      if(res && res.data && res.data.meta && res.data.meta.data){
        let config = res.data.meta.data ;
        localStorage.setItem(this.teacher_config, config);
        if( ! update ) alert('Success Configuration Saved');
      }
    }, error => this.meta.errorResponse(error));

  }


  getTeacherStatus(callback) {

    localStorage.setItem( this.teacher_config, "" );
    let config = localStorage.getItem(this.teacher_config);
    // console.log('config:: ', config);
    if (config) {
      try {
        this.teachers_status = JSON.parse(config);
        //console.log('metaData',this.metaData);
      } catch(e){}
    }

    this.meta.config(this.teacher_config).subscribe( (res) => {
      // console.log('meta.config', res);
      let status = {};
      if( res && res.data && res.data.config ){
        // console.log('meta.config::config', res);
        config = res.data.config ;
        try {
          status = JSON.parse(config);
          //console.log('metaData::config',this.metaData);
        } catch(e){}
        localStorage.setItem( this.teacher_config, config );
      }
      callback(status);
    }, error => this.meta.errorResponse(error));

  }


}
