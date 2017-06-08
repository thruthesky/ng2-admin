import { Routes, RouterModule }  from '@angular/router';

import { UserPage } from './user.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: UserPage
  }
];

export const routing = RouterModule.forChild(routes);
