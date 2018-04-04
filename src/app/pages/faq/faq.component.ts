import { Component } from '@angular/core';

import {
  Meta,
  _META_CREATE,
  _META_CREATE_RESPONSE,
} from 'angular-backend';

export interface _FAQ {
  question: string;
  answer: string;
}

export type _FAQS = _FAQ[];

export interface _FAQ_CONFIG {
  title: string;
  view_mode: boolean;
  faqs: _FAQS;
}

@Component({
  selector: 'faq-page',
  templateUrl: './faq.html',
  styleUrls: ['./faq.scss']
})
export class FAQPage {

  logoPercentage: number = 0;
  announcementPercentage: number = 0;



  faqs_config:_FAQ_CONFIG = <_FAQ_CONFIG> {
    title: 'Frequently Ask Question',
    view_mode: false,
    faqs: []
  };

  constructor(
    private meta: Meta,
  ){
    this.getSiteConfig();
  }


  onClickAddNew() {
    this.faqs_config.faqs.push(
      {
        question: '',
        answer: ''
      }
    );
  }

  onClickDelete(id) {
    this.faqs_config.faqs.splice(id,1);
  }


  onClickSaveMeta( update = false ){
    let req: _META_CREATE = {
      model: 'config',
      model_idx: 1,
      code: 'name',
      data: JSON.stringify( this.faqs_config )
    };
    this.meta.create( req ).subscribe( (res: _META_CREATE_RESPONSE) => {
      console.log("onClickSaveMeta::", res);
      if(res && res.data && res.data.meta && res.data.meta.data){
        //let config = res.data.meta.data ;
        if( ! update ) alert('Success Configuration Saved');
      }
    }, error => this.meta.errorResponse(error));

  }


  getSiteConfig() {

    this.meta.config('name').subscribe( (res) => {
      // console.log("getSiteConfig::", res);
      if( res && res.data && res.data.config ){
        try {
          this.faqs_config = JSON.parse(res.data.config);
        } catch(e){}
      }
      //console.log('this.faqs_config', this.faqs_config);
    }, error => this.meta.errorResponse(error));

  }







}
