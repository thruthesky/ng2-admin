import { Routes, RouterModule }  from '@angular/router';

import { CenterXPage } from './centerX.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: CenterXPage
  }
];

export const routing = RouterModule.forChild(routes);
