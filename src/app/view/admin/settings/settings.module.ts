import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { RMModule } from '../../common';
import { ROUTES, SettingsModuleRoutingModule } from './settings.routes';
import { SettingsService } from '../../../services/settings.service';

import { GeneralSettingComponent } from './general-settings/general-settings.component';
import { MenuManagementComponent } from './menu-management/menu-management.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        SettingsModuleRoutingModule,
        HttpClientModule,
        RMModule,
        // Including the ReactiveFormsModule in our application
        ReactiveFormsModule,
    ],
    declarations: [
        GeneralSettingComponent,
        MenuManagementComponent
    ],
    exports: [],
    providers: [SettingsService]
})
export class SettingsModule { }
