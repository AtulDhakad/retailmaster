import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dropship-store-checkout-billing',
  templateUrl: './checkout-billing.html'
})
export class DropshipStoreCheckoutBillingComponent {
  @Input() baseURL: string = '';
  constructor(private router: Router) { }

  navigate(path: string): void {
    this.router.navigate([`${this.baseURL}${path}`]);
  }
}
