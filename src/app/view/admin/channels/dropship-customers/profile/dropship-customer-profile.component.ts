import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropship-customer-profile',
  templateUrl: './dropship-customer-profile.html'
})

export class DropshipCustomerProfileComponent {
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<any>();

  closeProfile(): void {
    this.onClose.emit(true);
  }
}
