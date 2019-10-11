import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardBestSellingCategoryComponent } from './bestselling-category/bestselling-category.component';
import { DashboardBestSellingComponent } from './bestselling-products/bestselling-products.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignSalesComponent } from './campaign-sales/campaign-sales.component';
import { DashboardKeyPerformanceComponent } from './key-performance/key-performance.component';
import { DashboardLowStockComponent } from './low-stock/low-stock.component';
import { DashboardPerformanceTargetsComponent } from './performance-targets/performance-targets.component';
import { ResellerSalesComponent } from './reseller-sales/reseller-sales.component';
import { DashboardSalesContributionCategoryComponent } from './sales-contribution-category/sales-contribution-category.component';
import { DashboardSalesContributionStoreComponent } from './sales-contribution-store/sales-contribution-store.component';
import { DashboardSalesPerformanceComponent } from './sales-performance/sales-performance.component';
import { DashboardSalesPrmotionComponent } from './sales-promotions/sales-promotions.component';
import { StaffSalesComponent } from './staff-sales/staff-sales.component';
import { StoreSalesComponent } from './store-sales/store-sales.component';
import { DashboardKeyFeaturesComponent } from './today-key-features/today-key-features.component';
import { DashboardTop10CreditorsComponent } from './top-10-creditors/top-10-creditors.component';
import { DashboardTop10DebatorsComponent } from './top-10-debators/top-10-debators.component';
import { DashboardTop20CustomersCategoryComponent } from './top-20-customers-category/top-20-customers-category.component';
import { DashboardTop20CustomersStoreComponent } from './top-20-customers-store/top-20-customers-store.component';


export const ROUTES: Routes = [
    { path: '', redirectTo: 'sales', pathMatch: 'full' },
    { path: 'sales-performance', component: DashboardSalesPerformanceComponent },
    { path: 'bestselliing-products', component: DashboardBestSellingComponent },
    { path: 'bestselliing-category', component: DashboardBestSellingCategoryComponent },
    { path: 'key-performance', component: DashboardKeyPerformanceComponent },
    { path: 'low-stock', component: DashboardLowStockComponent },
    { path: 'performance-targets', component: DashboardPerformanceTargetsComponent },
    { path: 'sales-contribution-store', component: DashboardSalesContributionStoreComponent },
    { path: 'sales-contribution-category', component: DashboardSalesContributionCategoryComponent },
    { path: 'sales-promotions', component: DashboardSalesPrmotionComponent },
    { path: 'today-key-features', component: DashboardKeyFeaturesComponent },
    { path: 'top-10-creditors', component: DashboardTop10CreditorsComponent },
    { path: 'top-10-debators', component: DashboardTop10DebatorsComponent },
    { path: 'top-20-customers-category', component: DashboardTop20CustomersCategoryComponent },
    { path: 'top-20-customers-store', component: DashboardTop20CustomersStoreComponent },
    { path: 'store-sales', component: StoreSalesComponent },
    { path: 'resellers-sales', component: ResellerSalesComponent },
    { path: 'staff-sales', component: StaffSalesComponent },
    { path: 'campaign-sales', component: CampaignSalesComponent },
    { path: 'campaign-list', component: CampaignListComponent },
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
export class DashboardModuleRoutingModule { }