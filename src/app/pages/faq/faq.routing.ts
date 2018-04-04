import { Routes, RouterModule }  from '@angular/router';

import { FAQPage } from './faq.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: FAQPage
  }
];

export const routing = RouterModule.forChild(routes);
