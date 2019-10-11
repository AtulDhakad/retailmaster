import { Routes } from '@angular/router';

import { DropshipStoreComponent } from './dropship.component';

export const ROUTES: Routes = [
  { path: '', children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: DropshipStoreComponent },
    { path: 'home/salesOrder/:salesOrderId', component: DropshipStoreComponent },
    { path: 'home/:category_id', component: DropshipStoreComponent },
    { path: 'cart', component: DropshipStoreComponent },
    { path: 'checkout', component: DropshipStoreComponent },
    { path: 'checkout-billing', component: DropshipStoreComponent },
    { path: 'product/:product_id', component: DropshipStoreComponent },
  ]}
];
