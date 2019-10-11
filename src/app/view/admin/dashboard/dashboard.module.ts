import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BarChartModule, LineChartModule } from '@swimlane/ngx-charts';
import { DashboardService } from '../../../services/dashboard.service';
import { DashboardBestSellingCategoryComponent } from './bestselling-category/bestselling-category.component';
import { DashboardBestSellingComponent } from './bestselling-products/bestselling-products.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignSalesComponent } from './campaign-sales/campaign-sales.component';
import { DashboardModuleRoutingModule } from './dashboard.routes';
import { DashboardKeyPerformanceComponent } from './key-performance/key-performance.component';
import { DashboardLowStockComponent } from './low-stock/low-stock.component';
import { EmployeelistComponent } from './performance-targets/employeelist/employeelist.component';
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


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    DashboardModuleRoutingModule,
    HttpClientModule,
    BarChartModule,
    LineChartModule,
  ],
  declarations: [
    DashboardBestSellingComponent,
    DashboardBestSellingCategoryComponent,
    DashboardKeyPerformanceComponent,
    DashboardLowStockComponent,
    DashboardPerformanceTargetsComponent,
    DashboardSalesPerformanceComponent,
    DashboardSalesContributionCategoryComponent,
    DashboardSalesContributionStoreComponent,
    DashboardSalesPrmotionComponent,
    DashboardKeyFeaturesComponent,
    DashboardTop10CreditorsComponent,
    DashboardTop10DebatorsComponent,
    DashboardTop20CustomersStoreComponent,
    DashboardTop20CustomersCategoryComponent,
    EmployeelistComponent,
    StoreSalesComponent,
    ResellerSalesComponent,
    StaffSalesComponent,
    CampaignSalesComponent,
    CampaignListComponent
  ],
  exports: [],
  providers: [DashboardService]
})
export class DashboardModule { }
