import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';
import { LMS } from './../providers/lms';
import { ShareService } from './../providers/share-service';
import {_LIST, _POST_COMMON_WRITE_FIELDS, _POST_LIST_RESPONSE, PostData, User} from "angular-backend";

@Component({
  selector: 'pages',
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">
      <!--<div class="al-footer-right" translate>{{'general.created_with'}} <i class="ion-heart"></i></div>-->
      <!--<div class="al-footer-main clearfix">-->
        <!--<div class="al-copy">&copy; <a href="http://akveo.com" translate>{{'general.akveo'}}</a> 2016</div>-->
        <!--<ul class="al-share clearfix">-->
          <!--<li><i class="socicon socicon-facebook"></i></li>-->
          <!--<li><i class="socicon socicon-twitter"></i></li>-->
          <!--<li><i class="socicon socicon-google"></i></li>-->
          <!--<li><i class="socicon socicon-github"></i></li>-->
        <!--</ul>-->
      <!--</div>-->
    </footer>
    <ba-back-top position="200"></ba-back-top>
    `
})
export class Pages {

  constructor(private _menuService: BaMenuService,
              private user:       User,
              private postData:   PostData,
              private lms:        LMS,
              public  shared:     ShareService,
              private router:Router
  ) {

    let chatUid = this.shared.getQueryVariable('userId');
    //console.log('chatUid', chatUid );
    if ( chatUid ) {
      this.searchStudentLMS(chatUid);
    }

    this.getNewPosts();
    this.getTodayClasses();
  }

  ngOnInit() {
    this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
  }

  searchStudentLMS(chatUid) {
    this.shared.searchString = chatUid;
    this.router.navigateByUrl('/pages/centerX');
  }

  getTodayClasses() {
    let d = new Date().toISOString().slice(0,10);
    let data = {
      date_begin: d,
      date_end: d,
    };
    this.lms.getClasses( data, res => {
      //console.log('getClasses:: ', res );
      if(res['books'].length) {
        this.shared.todayClasses = res['books'];
      }
    }, error => this.user.alert(error));

  }

  getNewPosts() {
    let q: _LIST = {};
    q.where = "deleted is null and cast(? as integer)";
    q.bind  = '1';
    q.extra= { file: true , post_config_id: 'qna' };
    this.postData.list(q).subscribe( (res: _POST_LIST_RESPONSE ) => {
      //console.log( 'qna::feed::getData::postData:: ', res);
      if (res.code === 0 ) {
        this.shared.newPosts = res.data.posts;
        this.shared.newPosts.map( (post: _POST_COMMON_WRITE_FIELDS) => {
          post['expanded'] = false;
          post.created = ( new Date( parseInt(post.created) * 1000 ) ).toDateString();
        });

        //console.log('newpostdata:: ', this.shared.newPosts);
      }
    }, e => this.postData.alert(e));
  }



}
