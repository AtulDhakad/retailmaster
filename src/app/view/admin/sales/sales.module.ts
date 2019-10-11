import {RMModule} from '../../common/rm.module';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {SalesOrdersComponent} from './sales-orders/sales-orders.component';
import {SalesModuleRoutingModule} from './sales.routes';
import {BsDatepickerModule, TimepickerModule, ModalModule} from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { DropshipStoreService } from '../../../services/dropship.service';
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SalesModuleRoutingModule,
    HttpClientModule,
    RMModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),
  ],
  declarations: [
    SalesOrdersComponent
  ],
  exports: [],
  providers: [DropshipStoreService]
})
export class SalesModule {}
