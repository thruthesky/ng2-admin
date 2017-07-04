import { Component, ViewContainerRef, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';

import { GlobalState } from './global.state';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from './theme/services';
import { BaThemeConfig } from './theme/theme.config';
import { layoutPaths } from './theme/theme.constants';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Backend } from 'angular-backend';

import { environment } from '../environments/environment';
import {ShareService} from "./providers/share-service";



/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  styleUrls: ['./app.component.scss'],
  template: `
    <main [class.menu-collapsed]="isMenuCollapsed" baThemeRun>
      <div class="additional-bg"></div>
      <router-outlet></router-outlet>
    </main>
  `
})
export class App implements AfterViewInit {

  isMenuCollapsed: boolean = false;

  constructor(private _state: GlobalState,
              private _imageLoader: BaImageLoaderService,
              private _spinner: BaThemeSpinner,
              private viewContainerRef: ViewContainerRef,
              private themeConfig: BaThemeConfig,
              private backend: Backend,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private shared: ShareService
  ) {


    let query = window.location.search.substring(1);
    if ( query ) {
      window['location_href']  = this.shared.decode_URI( query );
    }


    if ( environment.backendUrl ) backend.setBackendUrl( environment.backendUrl  );
    else backend.setBackendUrl("https://" + window.location.hostname  + "/index.php");

    if ( ! backend.logged || ! backend.info.admin ) this.router.navigateByUrl('/login');

    themeConfig.config();

    this._loadImages();

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  ngAfterViewInit(): void {
    // hide spinner once all loaders are completed

    //console.log('ngAfterViewInit');
      BaThemePreloader.load().then((values) => {
        //console.log('BaThemePreloader.load()');
      this._spinner.hide();
    });
  }

  private _loadImages(): void {
    // register some loaders
    //console.log('spinner before init');
    BaThemePreloader.registerLoader(this._imageLoader.load( environment.background ));

  }

}
