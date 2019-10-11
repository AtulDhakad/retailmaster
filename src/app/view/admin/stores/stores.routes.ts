
import { Routes, RouterModule } from '@angular/router';

import { StoresPaymentsMethodComponent } from './payment-methods/payment-methods.component';
import { StoresShippingMethodComponent } from './shipping-methods/shipping-methods.component';
import { StoresTaxesComponent } from './taxes/taxes.component';
import { StoresCurrenciesComponent } from './currencies/currencies.component';
import { StoresLanguagesComponent } from './languages/languages.component';
import { StoresBanksComponent } from './banks/banks.component';
import { EmployeeRoleComponent } from './employee-role/employee-role.component';
import { StoresConfigurationsComponent, StoresPreferencesComponent } from './stores-configurations';
import { StoreEmployeesComponent } from './store-employees/store-employees.component';
import { DropshipStoreComponent } from './stores-templates/dropship/dropship.component';
import { NgModule } from '@angular/core';

export const ROUTES: Routes = [
    { path: '', redirectTo: 'payment-methods', pathMatch: 'full' },
    { path: 'payment-methods', component: StoresPaymentsMethodComponent },
    { path: 'shipping-methods', component: StoresShippingMethodComponent },
    { path: 'taxes', component: StoresTaxesComponent },
    { path: 'currencies', component: StoresCurrenciesComponent },
    { path: 'languages', component: StoresLanguagesComponent },
    { path: 'banks', component: StoresBanksComponent },
    { path: 'stores-configurations', component: StoresConfigurationsComponent },
    { path: 'stores-preferences', component: StoresPreferencesComponent },
    { path: 'store-employees', component: StoreEmployeesComponent },
    { path: 'employee-role', component: EmployeeRoleComponent },
    { path: 'external/:storeName/home', component: DropshipStoreComponent }
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
export class StoresModuleRoutingModule { }
