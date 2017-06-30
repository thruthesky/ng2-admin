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

export interface _SITE_CONFIGURATION {
  company_name_variation?: string;
  company_name?: string;
  company_email?: string;
  phone_number?: number;
  copyright_line1?: string;
  copyright_line2?: string;
  copyright_line3?: string;
  copyright_line4?: string;
  company_name_eul?: string;
  company_name_en?: string;
  company_name_wa?: string;
  reminder_key?: string;
  reminder_title?: string;
  reminder_message?: string;
  announcement_key?: string;
  announcement_message?: string;
  announcement_photo_idx?: number;
  announcement_photo_url?: string;
  atg_credit_card?: string;
  payment_banner_info?: string;
  logo_idx?: number;
  logo_url?: string;
}


@Component({
  selector: 'config-page',
  templateUrl: './config.html',
  styleUrls: ['./config.scss']
})
export class ConfigPage {

  logoPercentage: number = 0;
  announcementPercentage: number = 0;

  logo: _FILE;
  metaData: _SITE_CONFIGURATION = <_SITE_CONFIGURATION>{
    company_name_variation: '1'
  };

  site_config = 'config';

  constructor(
   private meta: Meta,
    private file: File, private ngZone: NgZone
  ){
    this.getSiteConfig();
    //console.log('config:: ', this.siteInfo);
  }


  onClickSaveMeta( update = false ){
     let req: _META_CREATE = {
       model: this.site_config,
       model_idx: 1,
       code: this.site_config,
       data: JSON.stringify( this.metaData )
     };
     this.meta.create( req ).subscribe( (res: _META_CREATE_RESPONSE) => {
       if(res && res.data && res.data.meta && res.data.meta.data){
         let config = res.data.meta.data ;
         localStorage.setItem(this.site_config, config);
         if( ! update ) alert('Success Configuration Saved');
       }
     }, error => this.meta.errorResponse(error));

  }

  getSiteConfig() {

    //localStorage.setItem( this.site_config, '' );
      let config = localStorage.getItem(this.site_config);
      //console.log('config:: ', config);
      if (config) {
        try {
          this.metaData = JSON.parse(config);
          //console.log('metaData',this.metaData);
        } catch(e){}
      }

      this.meta.config().subscribe( (res) => {
        //console.log('meta.config', res);
        if( res && res.data && res.data.config ){
          //console.log('meta.config::config', res);
          config = res.data.config ;
          try {
            this.metaData = JSON.parse(config);
            //console.log('metaData::config',this.metaData);
          } catch(e){}
          localStorage.setItem( this.site_config, config );
        }
        return config;
      }, error => this.meta.errorResponse(error));

  }

  onChangeLogo( _ ){
    this.logoPercentage = 1;
    let req: _UPLOAD = {
      model: 'config',
      model_idx: 1,
      code: 'config',
      unique: 'Y',
      finish: 'Y'
    };

    this.file.upload( req, _.files[0], percentage => {
      this.logoPercentage = percentage;
      this.ngZone.run( () => {} );
    } ).subscribe( (res:_UPLOAD_RESPONSE) => {
      console.log(res);
      this.metaData.logo_idx = res.data.idx;
      this.metaData.logo_url = res.data.url;
      this.logoPercentage = 0;
    }, err => {
      this.logoPercentage = 0;
      if ( this.file.isError(err) == ERROR_NO_FILE_SELECTED ) return;
      this.file.alert(err);
    });
  }

  onChangeAnnouncementPhoto( _ ){
    this.announcementPercentage = 1;
    let req: _UPLOAD = {
      model: 'config-announcement',
      model_idx: 1,
      code: 'config-announcement',
      unique: 'Y',
      finish: 'Y'
    };

    this.file.upload( req, _.files[0], percentage => {
      this.announcementPercentage = percentage;
      this.ngZone.run( () => {} );
    } ).subscribe( (res:_UPLOAD_RESPONSE) => {
      this.metaData.announcement_photo_idx = res.data.idx;
      this.metaData.announcement_photo_url = res.data.url;
      this.announcementPercentage = 0;
    }, err => {
      this.announcementPercentage = 0;
      if ( this.file.isError(err) == ERROR_NO_FILE_SELECTED ) return;
      this.file.alert(err);
    });
  }

  onClickDeleteAnnouncementPhoto( file_idx ) {
    let req: _DELETE_REQUEST = {
      idx: file_idx,
    };
    this.file.delete( req ).subscribe( (res:_DELETE_RESPONSE) => {
      if (res.data.idx == file_idx ){
        this.metaData.announcement_photo_idx = this.metaData.announcement_photo_url = null;
        this.onClickSaveMeta( true );
      }
    }, err => {
      console.log(err);
      this.file.alert(err);
    });
  }

  onClickDeleteLogo( file_idx ) {
    let req: _DELETE_REQUEST = {
      idx: file_idx,
    };
    this.file.delete( req ).subscribe( (res:_DELETE_RESPONSE) => {
      console.log(res);
      if (res.data.idx == file_idx ){
        this.metaData.logo_idx = this.metaData.logo_url = null;
        this.onClickSaveMeta( true );
      }
    }, err => {
      console.log(err);
      this.file.alert(err);
    });
  }


}
