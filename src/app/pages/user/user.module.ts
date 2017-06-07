import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';


import { User } from './user.component';
import { routing }       from './user.routing';
import { PaginationModule } from "../../components/pagination/pagination.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    Ng2SmartTableModule,
    routing,
    PaginationModule
  ],
  declarations: [
    User
  ]
})
export class UserModule {}
