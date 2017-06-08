import { Routes, RouterModule }  from '@angular/router';

import { ForumPage } from './forum.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ForumPage
  }
];

export const routing = RouterModule.forChild(routes);
