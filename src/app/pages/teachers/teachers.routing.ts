import { Routes, RouterModule }  from '@angular/router';

import { TeachersPage } from './teachers.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: TeachersPage
  }
];

export const routing = RouterModule.forChild(routes);
