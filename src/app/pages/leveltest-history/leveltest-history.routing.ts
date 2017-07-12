import { Routes, RouterModule }  from '@angular/router';

import { LevelTestHistoryPage } from './leveltest-history.component';

const routes: Routes = [
  {
    path: '',
    component: LevelTestHistoryPage
  }
];

export const routing = RouterModule.forChild(routes);
