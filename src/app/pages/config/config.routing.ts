import { Routes, RouterModule }  from '@angular/router';

import { ConfigPage } from './config.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ConfigPage
  }
];

export const routing = RouterModule.forChild(routes);
