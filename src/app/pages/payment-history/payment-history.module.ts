import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { PaymentHistoryPage } from "./payment-history.component";
import { routing }       from './payment-history.routing';

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
    PaymentHistoryPage
  ]
})
export class PaymentHistoryModule {}
