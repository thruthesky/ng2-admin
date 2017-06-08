import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";

import { UserPage } from './user.component';
import { routing }       from './user.routing';
import { PaginationModule } from "../../components/pagination/pagination.module";
import { ChangePasswordButton } from './components/changePasswordButton/changePasswordButton';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    Ng2SmartTableModule,
    NgbModalModule,
    routing,
    PaginationModule,
  ],
  declarations: [
    UserPage,
    ChangePasswordButton
  ],
  entryComponents: [
    ChangePasswordButton
  ],
})
export class UserModule {}
