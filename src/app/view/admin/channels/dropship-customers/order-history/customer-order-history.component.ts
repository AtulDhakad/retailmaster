import {Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-dropship-customer-order-history',
  templateUrl: './customer-order-history.html'
})

export class DropshipCustomerOrderHistoryComponent {
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<any>();

  closeView(): void {
    this.onClose.emit(true);
  }
}
