import {DropshipCartService} from '../../../../../services/cart.service';
import {DropshipStoreService} from '../../../../../services/dropship.service';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {DropshipStoreHeaderComponent} from './header/header.component';
import {DropshipStoreCartPanelComponent} from './cart-panel/cart-panel.component';
import {DropshipStoreComponent} from './dropship.component';
import {DropshipStoreHomeComponent} from './home/home.component';
import {DropshipStoreCartComponent} from './cart/cart.component';

import {DropshipSuccessNotificationComponent} from './success-notification/success-notification.component';
import {DropshipStoreProductComponent} from './product/product.component';
import {DropshipStoreCheckoutComponent} from './checkout/checkout.component';
import {DropshipStoreCheckoutBillingComponent} from './checkout-billing/checkout-billing.component';
import {ROUTES} from './dropship.routes';
import {FiltercustomerPipe} from './filtercustomer.pipe';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    DropshipStoreComponent,
    DropshipStoreCartPanelComponent,
    DropshipStoreHeaderComponent,
    DropshipStoreHomeComponent,
    DropshipStoreCheckoutBillingComponent,
    DropshipStoreCartComponent,
    DropshipStoreCheckoutComponent,
    DropshipStoreProductComponent,
    DropshipSuccessNotificationComponent,
    FiltercustomerPipe
  ],
  providers: [
    DropshipCartService,
    DropshipStoreService
  ]
})
export class DropshipStoreModule {}
