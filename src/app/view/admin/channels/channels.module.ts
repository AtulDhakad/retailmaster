import { PagerService } from '../../../services/pager.service';
import { RMModule } from '../../common/rm.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DropshipCommissionsComponent } from './dropship-commissions';
import { DropshipProductsComponent } from './dropship-products';
import { DropshipSalesOrdersComponent } from './dropship-sales-orders';
import { DropshipSalesStatisticsComponent } from './dropship-sales-statistics';
import { ChannelsModuleRoutingModule } from './channels.routes';
import { DropshipAgentsComponent } from './dropship-agents/dropship-agents.component';
import { DropshipAgentProfileComponent } from './dropship-agents/profile/dropship-agent-profile.component';
import { DropshipCustomersComponent } from './dropship-customers/dropship-customers.component';
import { DropshipCustomerOrderHistoryComponent } from './dropship-customers/order-history/customer-order-history.component';
import { DropshipCustomerProfileComponent } from './dropship-customers/profile/dropship-customer-profile.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ChannelsModuleRoutingModule,
    HttpClientModule,
    RMModule
  ],
  declarations: [
    DropshipAgentsComponent,
    DropshipCustomersComponent,
    DropshipCommissionsComponent,
    DropshipProductsComponent,
    DropshipSalesOrdersComponent,
    DropshipSalesStatisticsComponent,
    DropshipAgentProfileComponent,
    DropshipCustomerProfileComponent,
    DropshipCustomerOrderHistoryComponent
  ],
  exports: [],
  providers: [PagerService]
})
export class ChannelsModule { }
