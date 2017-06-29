import {Component} from '@angular/core';

import {GlobalState} from '../../../global.state';
import {Router} from "@angular/router";
import {User, _USER_LOGOUT_RESPONSE } from "angular-backend";
import {Subject} from "rxjs/Subject";
import {ShareService} from "../../../providers/share-service";

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss']
})
export class BaPageTop {

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;

  search: string = '';
  searchChangeDebounce = new Subject();


  constructor(
    public user: User,
    private _state:GlobalState,
    private router: Router,
    public shared: ShareService
  ) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });



    this.searchChangeDebounce
      .debounceTime(500) // wait 500ms after the last event before emitting last event
      .subscribe(() => this.searchStudent());
  }

  onChangeSearchStudent() {
    this.searchChangeDebounce.next();
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  onClickLogout() {
    this.user.logout().subscribe((res: _USER_LOGOUT_RESPONSE) => {
      this.router.navigateByUrl('/login');
      //console.log('user.logout', res);
    }, err => {
      this.user.alert(err);
      this.router.navigateByUrl('/login');
    });
  }



  searchStudent() {
    this.shared.searchString = this.search;
    this.router.navigateByUrl('/pages/user');
    this.shared.myEvent.emit({
      eventType: "header-search",
      search: this.search
    });
  }
}
