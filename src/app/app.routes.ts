import {Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {LoginComponent} from './view/login/login.component';

export const ROUTES: Routes = [
  {
    path: '', children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', loadChildren: './view/admin/dashboard/dashboard.module#DashboardModule'},
      {path: 'channels', loadChildren: './view/admin/channels/channels.module#ChannelsModule'},
      {path: 'stores', loadChildren: './view/admin/stores/stores.module#StoresModule'},
      {path: 'sales', loadChildren: './view/admin/sales/sales.module#SalesModule'},
      {path: 'admin', loadChildren: './view/admin/sys-admin/sys-admin.module#SysAdminModule'},
      {path: 'settings', loadChildren: './view/admin/settings/settings.module#SettingsModule'},
      {path: 'finance', loadChildren: './view/admin/finance/finance.module#FinanceModule'},
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: 'dashboard'}
];
