import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-finance-header',
  templateUrl: './header.html'
})

export class FinanceHeaderComponent {
  routes: FinanceRoute[] = [{
    name: 'Overview',
    route: ['/finance/payables/overview']
  } , {
    name: 'Import Bills',
    route: ['/finance/payables/import-bills']
  }, {
    name: 'Approve',
    route: ['/finance/payables/approve']
  }, {
    name: 'Pay',
    route: ['/finance/payables/pay']
  }, {
    name: 'Suppliers',
    route: ['/finance/payables/suppliers']
  }, {
    name: 'Bills',
    route: ['/finance/payables/bills']
  }, {
    name: 'Recurring Bills',
    route: ['/finance/payables/recurring-bills']
  }, {
    name: 'Payments',
    route: ['/finance/payables/payments']
  }];
  @Input() enableActions: boolean = false;
  @Input() enableIcons: boolean = false;
  constructor() { }
}

interface FinanceRoute {
  name: string;
  route: string[];
}
