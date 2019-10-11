import { RMModule } from '../../common/rm.module';
import { StoresService } from '../../../services/stores.service';
import {NgModule} from '@angular/core';

import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {DropshipStoreModule} from './stores-templates';
import {Routes, Router} from '@angular/router';
import {ROUTES, StoresModuleRoutingModule} from './stores.routes';
import {StoresPaymentsMethodComponent} from './payment-methods/payment-methods.component';
import {StoresShippingMethodComponent} from './shipping-methods/shipping-methods.component';
import {StoresTaxesComponent, StoresAddTaxRuleComponent} from './taxes';
import {StoresCurrenciesComponent} from './currencies/currencies.component';
import {StoresLanguagesComponent} from './languages/languages.component';
import {StoresBanksComponent} from './banks/banks.component';
import {StoresConfigurationsComponent, StoresPreferencesComponent} from './stores-configurations';
import {StoresAddEditStoreComponent, StoresAddEditStoreViewComponent, StoresAddEditWebsiteComponent} from './stores-configurations';
import {StoreEmployeesComponent} from './store-employees/store-employees.component';
import { FilterPipe } from './stores-configurations/filter.pipe';
import {AddStoreConfigurationComponent} from './stores-configurations/store-preferences/add-store-configuration/add-store-configuration.component';
import { EmployeeRoleComponent } from './employee-role/employee-role.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    StoresModuleRoutingModule,
    HttpClientModule,
    DropshipStoreModule,
    RMModule
  ],
  declarations: [
    StoresPaymentsMethodComponent,
    StoresShippingMethodComponent,
    StoresTaxesComponent,
    StoresCurrenciesComponent,
    StoresLanguagesComponent,
    StoresAddTaxRuleComponent,
    StoresBanksComponent,
    StoresConfigurationsComponent,
    StoresAddEditStoreComponent,
    StoresAddEditStoreViewComponent,
    StoresAddEditWebsiteComponent,
    StoreEmployeesComponent,
    StoresPreferencesComponent,
    FilterPipe,
    AddStoreConfigurationComponent,
    EmployeeRoleComponent
  ],
  exports: [],
  providers: [StoresService]
})
export class StoresModule {}

