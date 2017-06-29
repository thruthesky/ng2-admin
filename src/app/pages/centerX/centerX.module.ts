import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CenterXPage } from './centerX.component';
import { routing }       from './centerX.routing';
import { PaginationModule } from "../../components/pagination/pagination.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    Ng2SmartTableModule,
    NgbModule.forRoot(),
    routing,
    PaginationModule,
  ],
  declarations: [
    CenterXPage
  ],
  entryComponents: [],
})
export class CenterXModule {}
