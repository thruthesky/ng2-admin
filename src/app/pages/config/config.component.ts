import { Component, NgZone, Input } from '@angular/core';

import {
  Meta, _META_CREATE, _META_ARRAY, _META_CREATE_RESPONSE, _META_LIST_RESPONSE, _LIST,
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
  reminder_message?: string;
  announcement_key?: string;
  announcement_message?: string;
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

    percentage: number = 0;
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
     //console.log('onClickSaveMeta:: ', req);
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

  onChangeFile( _ ) {
      this.percentage = 1;
      //console.log(_.files[0]);
      let req: _UPLOAD = {
          model: 'config',
          model_idx: 1,
          code: 'config',
          unique: 'Y',
          finish: 'Y'
      };
      this.file.upload( req, _.files[0], percentage => {
          this.percentage = percentage;
          this.ngZone.run( () => {} );
      } ).subscribe( (res:_UPLOAD_RESPONSE) => {
          this.metaData.logo_idx = res.data.idx;
          this.metaData.logo_url = res.data.url;
          //console.log('onchange::metadata::', this.metaData);
          this.percentage = 0;
      }, err => {
          if ( this.file.isError(err) == ERROR_NO_FILE_SELECTED ) return;
          this.file.alert(err);
      });
  }


  onClickDeleteFile( file_idx ) {
    let req: _DELETE_REQUEST = {
      idx: file_idx,
    };
    this.file.delete( req ).subscribe( (res:_DELETE_RESPONSE) => {
      //console.log('delete file',res);
      if (res.data.idx == file_idx ){
        this.metaData.logo_idx = this.metaData.logo_url = null;
        this.onClickSaveMeta( true );
      }
    }, err => this.file.alert(err) );
  }


}
