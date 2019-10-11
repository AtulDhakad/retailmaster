import { DropshipAgentsComponent } from './dropship-agents/dropship-agents.component';
import { DropshipCommissionsComponent } from './dropship-commissions/dropship-commissions.component';
import { DropshipCustomersComponent } from './dropship-customers/dropship-customers.component';
import { DropshipProductsComponent } from './dropship-products/dropship-products.component';
import { DropshipSalesOrdersComponent } from './dropship-sales-orders/dropship-sales-orders.component';
import { DropshipSalesStatisticsComponent } from './dropship-sales-statistics/dropship-sales-statistics.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';



export const ROUTES: Routes = [
    { path: '', redirectTo: 'dropship-agents', pathMatch: 'full' },
    { path: 'dropship-agents', component: DropshipAgentsComponent },
    { path: 'dropship-customers', component: DropshipCustomersComponent },
    { path: 'dropship-products', component: DropshipProductsComponent },
    { path: 'dropship-sales-orders', component: DropshipSalesOrdersComponent },
    { path: 'dropship-commissions', component: DropshipCommissionsComponent },
    { path: 'dropship-sales-statistics', component: DropshipSalesStatisticsComponent }
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
export class ChannelsModuleRoutingModule { }

