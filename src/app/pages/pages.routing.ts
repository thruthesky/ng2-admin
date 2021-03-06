import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      { path: 'centerX', loadChildren: './centerX/centerX.module#CenterXModule' },
      { path: 'forum', loadChildren: './forum/forum.module#ForumModule' },
      { path: 'user', loadChildren: './user/user.module#UserModule' },
      { path: 'payment-history', loadChildren: './payment-history/payment-history.module#PaymentHistoryModule' },
      { path: 'leveltest-history', loadChildren: './leveltest-history/leveltest-history.module#LevelTestHistoryModule' },
      { path: 'config', loadChildren: './config/config.module#ConfigModule'},
      { path: 'faq', loadChildren: './faq/faq.module#FAQModule'},
      { path: 'teachers', loadChildren: './teachers/teachers.module#TeachersModule'}
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);


