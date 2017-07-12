import { Routes, RouterModule }  from '@angular/router';

import { PaymentHistoryPage } from './payment-history.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentHistoryPage
  }
];

export const routing = RouterModule.forChild(routes);
