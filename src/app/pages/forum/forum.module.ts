import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { Forum } from "./forum.component";
import { routing }       from './forum.routing';

import { PaginationModule } from './../../components/pagination/pagination.module';



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
    Forum
  ]
})
export class ForumModule {}
