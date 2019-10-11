import {ShippingMethod} from '../../../../models/shippingmethod';
import {Status} from '../../../../models/status';
import {StoresService} from '../../../../services/stores.service';
import {Utils} from '../../../../utils/utils';
import {Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-stores-shipping-methods',
  templateUrl: './shipping-methods.html'
})
export class StoresShippingMethodComponent implements OnInit {
  message: string;
  selectedSt: string;
  shippingMethodList: ShippingMethod[];
  selectedShippingMethod: ShippingMethod;
  newShippingMethod: ShippingMethod;
  selectedShippingMethodList: ShippingMethod[];
  statusArrList: Status[];
  loading: boolean = false;
  constructor(private storeService: StoresService) {}
  ngOnInit(): void {
    this.message = '';
    this.statusArrList = Utils.getStatusArr();
    this.newShippingMethod = new ShippingMethod();
    this.setLoading(true);
    this.getShippingMethodList();
  }
  setLoading(show: boolean): void {
    this.loading = show;
  }
  selectedStatus(status: string): void {
    this.selectedSt = status;
  }
  getShippingMethodList(): void {
    this.storeService.getShippingMethodList().subscribe(list => {
      this.shippingMethodList = list;
      this.selectedShippingMethodList = new Array();
      this.selectedSt = '';
      this.setLoading(false);
    });
  }
  onShippingMethodSelected(sm: ShippingMethod): void {
    this.selectedShippingMethod = sm;
    this.selectedSt = sm.is_active;
  }
  onUpdateShippingMethod(): void {
    this.setLoading(true);
    this.selectedShippingMethod.is_active = this.selectedSt;
    this.storeService.updateShippingMethod(this.selectedShippingMethod).subscribe(shippingMethod => {
      this.selectedSt = '';
      this.showMessage('Shipping method updated successfully');
      this.getShippingMethodList();
    });
  }
  OnSaveShippingMethod(): void {
    this.setLoading(true);
    this.newShippingMethod.is_active = this.selectedSt;
    this.storeService.saveShippingMethod(this.newShippingMethod).subscribe(shippingMethod => {
      // console.log(shippingMethod);
      this.newShippingMethod = new ShippingMethod();
      this.selectedSt = '';
      this.showMessage('Shipping method saved successfully');
      this.getShippingMethodList();
    });
  }
  //  onShippingMethodActivate(): void {
  //    this.spinnerService.show();
  //    if (this.selectedShippingMethodList !== undefined) {
  //      for (const cur of this.selectedShippingMethodList) {
  //        cur.is_active = '1';
  //      }
  //      this.storeService.setShippingMethodSelected(this.selectedShippingMethodList).subscribe(list => {
  //        this.shippingMethodList = list
  //        this.selectedShippingMethodList = new Array()
  //        this.spinnerService.hide();
  //      });
  //    }
  //  }
  //  onShippingMethodDeactivate(): void {
  //    this.spinnerService.show();
  //    for (const cur of this.selectedShippingMethodList) {
  //      cur.is_active = '0';
  //    }
  //    this.storeService.setShippingMethodSelected(this.selectedShippingMethodList).subscribe(list => {
  //      this.shippingMethodList = list
  //      this.selectedShippingMethodList = new Array()
  //      this.spinnerService.hide();
  //    });
  //  }
  onShippingMethodDelete(): void {
    this.setLoading(true);
    this.selectedShippingMethodList = new Array();
    this.selectedShippingMethodList.push(this.selectedShippingMethod);
    this.storeService.deleteSelectedShippingMethod(this.selectedShippingMethodList).subscribe(list => {
      this.shippingMethodList = list;
      this.selectedShippingMethodList = new Array();
      this.setLoading(false);
      this.showMessage('Shipping method deleted successfully');
    });
  }
  //  onCheckBoxChange(sm: ShippingMethod, isChecked: boolean): void {
  //    if (isChecked) {
  //      this.shippingMethodList.find(item => item.shipping_id === sm.shipping_id).is_active = '1';
  //      this.selectedShippingMethodList.push(sm);
  //    } else {
  //      this.shippingMethodList.find(item => item.shipping_id === sm.shipping_id).is_active = '0';
  //      const index = this.selectedShippingMethodList.findIndex(item => item.shipping_id === sm.shipping_id);
  //      this.selectedShippingMethodList.splice(index, 1);
  //    }
  //    // console.log(this.selectedShippingMethodList);
  //    // console.log(this.shippingMethodList);
  //  }
  showMessage(msg: string): void {
    this.message = msg;
    setTimeout(() => {
      this.message = '';
    }, Utils.MILISECONDS);
  }
}
