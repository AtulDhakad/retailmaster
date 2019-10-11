import { OrderDetail } from '../../../../../../models/orderdetail';
import { SalesOrder } from '../../../../../../models/salesorder';
import {Component, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-dropship-success-notification',
  templateUrl: './success.notification.html'
})

export class DropshipSuccessNotificationComponent {
  @Output() onClick: EventEmitter<string> = new EventEmitter<string>();
  @Input() orderDetails: OrderDetail;
  @Input() salesOrder: SalesOrder;
  onClickButton(actionType: string): void {
    this.onClick.emit(actionType);
  }
}
