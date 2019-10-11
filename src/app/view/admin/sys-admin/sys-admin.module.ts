import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';
import { SettingsService } from 'src/app/services/settings.service';
import { SysAdminService } from '../../../services/sys-admin.service';
import { RMModule } from '../../common';
import { SysAdminCompanyProfileComponent } from './company-profile/company-profile.component';
import { SysAdminModuleRoutingModule } from './sys-admin.routes';
import { SysAdminUsersPermissionsComponent } from './users-permissions/users-permissions.component';
import { SortPipe } from './sort.pipe';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    SysAdminModuleRoutingModule,
    HttpClientModule,
    RMModule,
    OrderModule
  ],
  declarations: [
    SysAdminCompanyProfileComponent,
    SysAdminUsersPermissionsComponent,
    SortPipe
  ],
  exports: [],
  providers: [SysAdminService, SettingsService]
})
export class SysAdminModule { }
