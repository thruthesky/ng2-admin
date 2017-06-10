import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';

import { Pages } from './pages.component';
import { ChangePasswordModal } from "./user/components/changePasswordModal/changePasswordModal";

@NgModule({
  imports: [CommonModule, FormsModule, AppTranslationModule, NgaModule, routing],
  declarations: [
    Pages,
    ChangePasswordModal
  ],
  entryComponents: [
    ChangePasswordModal
  ]
})
export class PagesModule {
}

