import { Routes, RouterModule }  from '@angular/router';

import { Forum } from './forum.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Forum
  }
];

export const routing = RouterModule.forChild(routes);
