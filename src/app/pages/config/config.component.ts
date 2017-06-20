import { Component } from '@angular/core';

import {Meta, _META_CREATE, _META_ARRAY, _META_CREATE_RESPONSE, _META_LIST_RESPONSE, _LIST} from 'angular-backend';


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


  metaData: _SITE_CONFIGURATION = <_SITE_CONFIGURATION>{
    company_name_variation: '을'
  };

  site_config = 'site_config';

  constructor(
   private meta: Meta
  ){
    this.getSiteConfig();
    console.log('config:: ', this.siteInfo);
  }


  onClickSaveMeta(){
     let req: _META_CREATE = {
       model: this.site_config,
       model_idx: 1,
       code: this.site_config,
       data: JSON.stringify( this.metaData )
     };
     console.log('onClickSaveMeta:: ', req);
     this.meta.create( req ).subscribe( (res: _META_CREATE_RESPONSE) => {
       if(res && res.data && res.data.meta && res.data.meta.data){
         console.log('meta.create', res);
         let config = res.data.meta.data ;
         localStorage.setItem(this.site_config, config);
         alert('Success Configuration Saved');
       }
     }, error => this.meta.errorResponse(error));
  }

  getSiteConfig() {
    //localStorage.setItem(this.site_config, '');
    let config = localStorage.getItem(this.site_config);
    console.log('config:: ', config);
    if (config) {
      this.metaData = JSON.parse(config);
    }
    else {
      let q: _LIST = {};
      q.where = "model = ? AND code = ? AND model_idx = ?";
      q.bind = `${this.site_config},${this.site_config},1`;

      console.log('query:: ', q );
      this.meta.list(q).subscribe( (res: _META_LIST_RESPONSE) => {
        if(res && res.data && res.data.meta.length){
          console.log('meta.list', res);
          config = res.data.meta[0].data ;
          localStorage.setItem(this.site_config, config);
        }
        return config;
      }, error => this.meta.errorResponse(error));
    }
  }


  get siteInfo(): _SITE_CONFIGURATION {
    let data = localStorage.getItem( this.site_config );
    console.log(data);
    if ( data ) {
      try {
        return JSON.parse( data );
      }
      catch (e) {
      }
    }
    return <_SITE_CONFIGURATION>{};
  }


}
