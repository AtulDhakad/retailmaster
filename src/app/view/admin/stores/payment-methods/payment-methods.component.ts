import {PaymentMethod} from '../../../../models/paymentmethod';
import {Status} from '../../../../models/status';
import {StoresService} from '../../../../services/stores.service';
import {Utils} from '../../../../utils/utils';
import {Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-stores-payment-methods',
  templateUrl: './payment-methods.html'
})
export class StoresPaymentsMethodComponent implements OnInit {
  paymentMethodList: PaymentMethod[];
  selectedPaymentMethod: PaymentMethod;
  newPaymentMethod: PaymentMethod;
  selectedPaymentMethodList: PaymentMethod[];
  statusArrList: Status[];
  loading: boolean = false;
  message: string;
  selectedSt: string;
  constructor(private storeService: StoresService) {}
  ngOnInit(): void {
    this.message = '';
    this.statusArrList = Utils.getStatusArr();
    this.newPaymentMethod = new PaymentMethod();
    this.setLoading(true);
    this.getPaymentMethodList();
  }
  setLoading(show: boolean): void {
    this.loading = show;
  }
  selectedStatus(status: string): void {
    this.selectedSt = status;
  }
  //  onCheckBoxChange(pm: PaymentMethod, isChecked: boolean): void {
  //    if (isChecked) {
  //      this.paymentMethodList.find(item => item.payment_id === pm.payment_id).is_active = '1';
  //      this.selectedPaymentMethodList.push(pm);
  //    } else {
  //      this.paymentMethodList.find(item => item.payment_id === pm.payment_id).is_active = '0';
  //      const index = this.selectedPaymentMethodList.findIndex(item => item.payment_id === pm.payment_id);
  //      this.selectedPaymentMethodList.splice(index, 1);
  //    }
  //    // console.log(this.selectedPaymentMethodList);
  //    // console.log(this.paymentMethodList);
  //  }
  getPaymentMethodList(): void {
    this.storeService.getPaymentMethodList().subscribe(list => {
      this.paymentMethodList = list;
      this.selectedPaymentMethodList = new Array();
      this.selectedSt = '';
      this.setLoading(false);
    });
  }
  onPaymentMethodSelected(pm: PaymentMethod): void {
    // console.log('pm : ', pm);
    this.selectedPaymentMethod = pm;
    this.selectedSt = pm.is_active;
  }
  onUpdatePaymentMethod(): void {
    this.setLoading(true);
    this.selectedPaymentMethod.is_active = this.selectedSt;
    this.storeService.updatePaymentMethod(this.selectedPaymentMethod).subscribe(paymentMethod => {
      this.selectedSt = '';
      this.showMessage('Payment method updated successfully');
      this.getPaymentMethodList();
    });
  }
  showMessage(msg: string): void {
    this.message = msg;
    setTimeout(() => {
      this.message = '';
    }, Utils.MILISECONDS);
  }
  OnSavePaymentMethod(): void {
    this.setLoading(true);
    this.newPaymentMethod.is_active = this.selectedSt;
    this.storeService.savePaymentMethod(this.newPaymentMethod).subscribe(paymentMethod => {
      // console.log(paymentMethod);
      this.newPaymentMethod = new PaymentMethod();
      this.selectedSt = '';
      this.getPaymentMethodList();
      this.showMessage('Payment method saved successfully');
    });
  }
  //  onPaymentMethodActivate(): void {
  //    this.spinnerService.show();
  //    if (this.selectedPaymentMethodList !== undefined) {
  //      for (const cur of this.selectedPaymentMethodList) {
  //        cur.is_active = '1';
  //      }
  //      this.storeService.setPaymentMethodSelected(this.selectedPaymentMethodList).subscribe(list => {
  //        this.paymentMethodList = list
  //        this.selectedPaymentMethodList = new Array()
  //        this.spinnerService.hide();
  //      });
  //    }
  //  }
  //  onPaymentMethodDeactivate(): void {
  //    this.spinnerService.show();
  //    for (const cur of this.selectedPaymentMethodList) {
  //      cur.is_active = '0';
  //    }
  //    this.storeService.setPaymentMethodSelected(this.selectedPaymentMethodList).subscribe(list => {
  //      this.paymentMethodList = list
  //      this.selectedPaymentMethodList = new Array()
  //      this.spinnerService.hide();
  //    });
  //  }
  onPaymentMethodDelete(): void {
    this.setLoading(true);
    this.selectedPaymentMethodList = new Array();
    this.selectedPaymentMethodList.push(this.selectedPaymentMethod);
    this.storeService.deleteSelectedPaymentMethod(this.selectedPaymentMethodList).subscribe(list => {
      this.paymentMethodList = list;
      this.selectedPaymentMethodList = new Array();
      this.setLoading(false);
      this.showMessage('Payment method deleted successfully');
    });
  }
}
