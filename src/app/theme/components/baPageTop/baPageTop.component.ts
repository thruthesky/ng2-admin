import {Component} from '@angular/core';

import {GlobalState} from '../../../global.state';
import {Router} from "@angular/router";
import {User, _USER_LOGOUT_RESPONSE } from "angular-backend";

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss']
})
export class BaPageTop {

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;

  constructor(
    public user: User,
    private _state:GlobalState,
    private router: Router
  ) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
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
      console.log('user.logout', res);
    }, err => {
      this.user.alert(err);
    });
  }
}
