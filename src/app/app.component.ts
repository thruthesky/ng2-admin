import { Component, ViewContainerRef, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';

import { GlobalState } from './global.state';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from './theme/services';
import { BaThemeConfig } from './theme/theme.config';
import { layoutPaths } from './theme/theme.constants';
import { Router } from '@angular/router';
import { Backend } from 'angular-backend';

import { environment } from '../environments/environment';

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
  ) {

    //this.backend.setBackendUrl('http://backend.org/index.php');
    //this.backend.setBackendUrl("https://"+window.location.hostname+"/index.php");
    //this.backend.setBackendUrl("https://iamtalkative.com/index.php");
    this.backend.setBackendUrl("https://www.englishfordevelopers.com/index.php");

    //console.log("backend URL: ", backend.getBackendUrl());
    backend.version().subscribe( r => console.log("backend version: ", r) );

    if ( ! backend.logged || ! backend.info.admin ) this.router.navigateByUrl('/login');
    //console.log(backend.info);

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
