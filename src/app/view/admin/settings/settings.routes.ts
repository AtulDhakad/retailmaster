import { Routes, RouterModule } from '@angular/router';

import { GeneralSettingComponent } from './general-settings/general-settings.component';
import { MenuManagementComponent } from './menu-management/menu-management.component';
import { NgModule } from '@angular/core';

export const ROUTES: Routes = [
    { path: '', redirectTo: 'general-settings', pathMatch: 'full' },
    { path: 'general-settings', component: GeneralSettingComponent },
    { path: 'menu-management', component: MenuManagementComponent }
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
export class SettingsModuleRoutingModule { }
