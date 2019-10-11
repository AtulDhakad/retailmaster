import { Routes, RouterModule } from '@angular/router';

import { SysAdminCompanyProfileComponent } from './company-profile/company-profile.component';
import { SysAdminUsersPermissionsComponent } from './users-permissions/users-permissions.component';
import { NgModule } from '@angular/core';

export const ROUTES: Routes = [
    { path: '', redirectTo: 'company-profile', pathMatch: 'full' },
    { path: 'company-profile', component: SysAdminCompanyProfileComponent },
    { path: 'users-permissions', component: SysAdminUsersPermissionsComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class SysAdminModuleRoutingModule { }