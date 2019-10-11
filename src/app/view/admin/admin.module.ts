import {ChannelsModule} from './channels/channels.module';
import {HeaderComponent} from '../header/header.component';
import {NavbarComponent} from '../navbar/navbar.component';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FinanceModule} from './finance/finance.module';
import {SalesModule} from './sales/sales.module';
import {StoresModule} from './stores/stores.module';
import { HttpClientModule } from '@angular/common/http';
import { DashboardModule } from './dashboard/dashboard.module';
import { SettingsModule } from './settings/settings.module';
import { SysAdminModule } from './sys-admin/sys-admin.module';

@NgModule({
  imports: [
    DashboardModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ChannelsModule,
    StoresModule,
    SalesModule,
    SysAdminModule,
    SettingsModule,
    FinanceModule,
    HttpClientModule
  ],
  declarations: [
    HeaderComponent,
  ],
  exports: [
    HeaderComponent,
  ],
  providers: []
})
export class AdminModule {}
