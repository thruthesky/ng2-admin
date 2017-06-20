import { Component, NgZone, Input } from '@angular/core';

import {Meta, _META_CREATE, _META_ARRAY, _META_CREATE_RESPONSE, _META_LIST_RESPONSE, _LIST} from 'angular-backend';

import {
    File,
    _FILE,
    _UPLOAD_RESPONSE, _DELETE_RESPONSE,
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
}


@Component({
  selector: 'config-page',
  templateUrl: './config.html',
  styleUrls: ['./config.scss']
})
export class ConfigPage {

    percentage: number = 0;

files: Array<_FILE>; // pass-by-reference.
  metaData: _SITE_CONFIGURATION = <_SITE_CONFIGURATION>{
    company_name_variation: '을'
  };

  site_config = 'config';

  constructor(
   private meta: Meta,
    private file: File, private ngZone: NgZone 
  ){
    this.getSiteConfig();
    //console.log('config:: ', this.siteInfo);
  }


  onClickSaveMeta(){
     let req: _META_CREATE = {
       model: this.site_config,
       model_idx: 1,
       code: this.site_config,
       data: JSON.stringify( this.metaData )
     };
     //console.log('onClickSaveMeta:: ', req);
     this.meta.create( req ).subscribe( (res: _META_CREATE_RESPONSE) => {
       if(res && res.data && res.data.meta && res.data.meta.data){
         //console.log('meta.create', res);
         let config = res.data.meta.data ;
         localStorage.setItem(this.site_config, config);
         alert('Success Configuration Saved');
       }
     }, error => this.meta.errorResponse(error));
  }

  getSiteConfig() {
    localStorage.setItem(this.site_config, '');
    let config = localStorage.getItem(this.site_config);
    //console.log('config:: ', config);
    if (config) {
      try {
        this.metaData = JSON.parse(config);
      } catch(e){}
    }

      // let q: _LIST = {};
      // q.where = "model = ? AND model_idx = cast(? as integer)";
      // q.bind = `${this.site_config},1`;
      //
      // console.log('query:: ', q );
      // this.meta.list(q).subscribe( (res: _META_LIST_RESPONSE) => {
      //
      //   console.log('meta.list', res);
      //   if(res && res.data && res.data.meta.length){
      //     console.log('meta.list', res);
      //     config = res.data.meta[0].data ;
      //     try {
      //       this.metaData = JSON.parse(config);
      //     } catch(e){}
      //     localStorage.setItem(this.site_config, config);
      //   }
      //   return config;
      // }, error => this.meta.errorResponse(error));

  }


  get siteInfo(): _SITE_CONFIGURATION {
    let data = localStorage.getItem( this.site_config );
    //console.log(data);
    if ( data ) {
      try {
        return JSON.parse( data );
      }
      catch (e) {}
    }
    return <_SITE_CONFIGURATION>{};
  }


    onChangeFile( _ ) {
        this.percentage = 1;
        this.file.uploadPostFile( _.files[0], percentage => {
            this.percentage = percentage;
            this.ngZone.run( () => {} );
        } ).subscribe( (res:_UPLOAD_RESPONSE) => {
            this.files.push( res.data );
            this.percentage = 0;
        }, err => {
            if ( this.file.isError(err) == ERROR_NO_FILE_SELECTED ) return;
            this.file.alert(err);
        });
    }


}
