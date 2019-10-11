import { Routes, RouterModule } from '@angular/router';
import { SalesOrdersComponent } from './sales-orders/sales-orders.component';
import { NgModule } from '@angular/core';

export const ROUTES: Routes = [
    { path: '', redirectTo: 'sales-orders', pathMatch: 'full' },
    { path: 'sales-orders', component: SalesOrdersComponent },
    { path: 'sales-orders/:orderId', component: SalesOrdersComponent }
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
export class SalesModuleRoutingModule { }
