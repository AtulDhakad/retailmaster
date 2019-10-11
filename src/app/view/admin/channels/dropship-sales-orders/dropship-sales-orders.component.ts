import {Address} from '../../../../models/address';
import {DropshipSalesOrderDetail} from '../../../../models/dropshipsalesorderdetail';
import {DropShipSalesOrderMap} from '../../../../models/dropshipsalesordermap';
import {OrderDetail} from '../../../../models/orderdetail';
import {OrderItems} from '../../../../models/orderitems';
import {PageData} from '../../../../models/pagedata';
import {PaymentProcess} from '../../../../models/paymentprocess';
import {Store} from '../../../../models/store';
import {PagerService} from '../../../../services/pager.service';
import {Utils} from '../../../../utils/utils';
import {Component, OnInit} from '@angular/core';
import { DropshipStoreService } from '../../../../services/dropship.service';
@Component({
  selector: 'app-dropship-sales-orders',
  templateUrl: './dropship-sales-orders.html'
})

export class DropshipSalesOrdersComponent implements OnInit {

  WARNING: string = 'WARNING';
  SUCCESS: string = 'SUCCESS';
  message: string = '';
  alertType: string = '';
  pageNumber: number = 1;
  pageSize: number = 20;
  totalRecords: number = 0;
  searchStatus: string = '';
  isPendingClicked: boolean = false;
  isProcessingClicked: boolean = false;
  isCompleteClicked: boolean = false;
  isCancelledClicked: boolean = false;
  isRefundedClicked: boolean = false;
  isOnHoldClicked: boolean = false;
  dropShipsalesOrderList: DropshipSalesOrderDetail[] = [];
  dropShipsalesOrderMap: DropShipSalesOrderMap[] = [];
  selectedOrderDetails: OrderDetail;
  selectedOrderItems: OrderItems[];
  selectedOrderPayments: PaymentProcess[] = [];
  selectedAddress: Address[] = [];
  billingAddress: Address = new Address();
  shipingAddress: Address = new Address();
  selectedRow: string;
  taxRt: number = 0;
  pageData: PageData[] = [];
  paginationData: PageData[] = [];
  storeList: Store[] = [];
  selectedStoreId: number = 0;
  selecteddate: any;
  searchString: string = '';
  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];
  loading: boolean = false;
  constructor(private dropshipservice: DropshipStoreService, private pagerService: PagerService) {}
  ngOnInit(): void {
    this.dropshipservice.getStores().subscribe(res => {
      this.storeList = res as Store[];
    });
    this.pageData = Utils.getPageData();
    this.message = '';
    this.alertType = '';
    this.searchStatus = '';
  }
  setLoading(show: boolean): void {
    this.loading = show;
  }
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.dropShipsalesOrderList.length, page);
    // get current page of items
    // console.log('this.pager.startIndex', this.pager.startIndex);
    this.pagedItems = this.dropShipsalesOrderList.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.filterRecordsByStatus(this.pagedItems);
    // console.log(this.pagedItems);
  }
  dateClick() {

  }
  onSelectedStore(store_id: number): void {
    this.selectedStoreId = store_id;
  }
  onPageDataSelected(value: string): void {
    this.pageSize = parseFloat(value);
  }

  getTotalPrice(item: OrderItems): number {
    const subTotal: number = parseFloat(item.price) * parseFloat(item.quantity);
    const taxAmt = subTotal * parseFloat(this.taxRt.toString()) / 100;
    return subTotal + parseFloat(taxAmt.toString());
  }
  onStatucChangeClick(status: string): void {
    switch (status) {
      case Utils.PENDING:
        this.isPendingClicked = !this.isPendingClicked;
        break;
      case Utils.PROCESSING:
        this.isProcessingClicked = !this.isProcessingClicked;
        break;
      case Utils.COMPLETED:
        this.isCompleteClicked = !this.isCompleteClicked;
        break;
      case Utils.CANCELED:
        this.isCancelledClicked = !this.isCancelledClicked;
        break;
      case Utils.REFUNDED:
        this.isRefundedClicked = !this.isRefundedClicked;
        break;
      case Utils.ONHOLD:
        this.isOnHoldClicked = !this.isOnHoldClicked;
        break;
    }

    // this.searchStatus = this.searchStatus.slice(0, this.searchStatus.length - 1);
    // console.log('searchstatus', this.getStatusString());
    //    const OrderList: DropshipSalesOrderDetail[] = this.dropShipsalesOrderList.filter(item => {
    //      if (this.isPendingClicked) {
    //        return item.status.toLowerCase().includes(Utils.PENDING.toLowerCase());
    //      }
    //      if (this.isProcessingClicked) {
    //        return item.status.toLowerCase().includes(Utils.PROCESSING.toLowerCase());
    //      }
    //      if (this.isCompleteClicked) {
    //        return item.status.toLowerCase().includes(Utils.COMPLETED.toLowerCase());
    //      }
    //      if (this.isCancelledClicked) {
    //        return item.status.toLowerCase().includes(Utils.CANCELLED.toLowerCase());
    //      }
    //      if (this.isRefundedClicked) {
    //        return item.status.toLowerCase().includes(Utils.REFUNDED.toLowerCase());
    //      }
    //      if (this.isOnHoldClicked) {
    //        return item.status.toLowerCase().includes(Utils.ONHOLD.toLowerCase());
    //      }
    //    });
    // // console.log('OrderList', OrderList);
    // this.filterRecordsByStatus(OrderList);
  }

  filterRecordsByStatus(dropShipsalesOrderList: DropshipSalesOrderDetail[]) {
    this.dropShipsalesOrderMap = [];
    for (const obj of dropShipsalesOrderList) {
      this.updateMap(obj)
    }
  }
  getOrderBySearch(): void {
    // console.log(this.selecteddate)
    if (this.searchString === '' && this.selectedStoreId === 0 &&
    (this.selecteddate === null || this.selecteddate === undefined) && this.getStatusString() === '') {
      this.showMessage('Please enter search string or select store or date for searching', this.WARNING);
      return;
    }
    this.setLoading(true);
    this.dropShipsalesOrderList = [];
    this.dropShipsalesOrderMap = [];
    this.totalRecords = 0;
    this.dropshipservice.searchOrders(this.getStatusString(), this.searchString, this.selecteddate, this.selectedStoreId.toString(),
      this.pageNumber, this.pageSize).subscribe(res => {
        this.dropShipsalesOrderList = res as DropshipSalesOrderDetail[];
        // this.totalRecords = res[1].count;
        // this.filterRecordsByStatus(this.dropShipsalesOrderList);
        this.setLoading(false);
        this.setPage(1);
        if (this.dropShipsalesOrderList.length === 0) {
          this.showMessage('No records found for selected search.', this.WARNING);
        }
      });
  }
  updateMap(obj: DropshipSalesOrderDetail): void {
    // console.log('obj.created_on', obj.created_at.toString().split(' ')[0]);
    const dt: string = obj.created_at.split(' ')[0];
    let isAdded: boolean = false;
    for (const tempObj of this.dropShipsalesOrderMap) {
      if (tempObj.orderDate === dt) {
        tempObj.list.push(obj);
        isAdded = true;
        break;
      }
    }
    if (isAdded === false) {
      const newObj: DropShipSalesOrderMap = new DropShipSalesOrderMap();
      newObj.orderDate = obj.created_at.split(' ')[0];
      newObj.list = [];
      newObj.list.push(obj);
      this.dropShipsalesOrderMap.push(newObj);
    }

  }
  getStatusString(): string {
    let str: string = '';
    if (this.isPendingClicked) {
      str = str + '\'pending\'' + ',';
    }
    if (this.isProcessingClicked) {
      str = str + '\'processing\'' + ',';
    }
    if (this.isCompleteClicked) {
      str = str + '\'completed\'' + ',';
    }
    if (this.isCancelledClicked) {
      str = str + '\'cancelled\'' + ',';
    }
    if (this.isRefundedClicked) {
      str = str + '\'refunded\'' + ',';
    }
    if (this.isOnHoldClicked) {
      str = str + '\'onhold\'' + ',';
    }
    if (str.length > 0) {
      str = str.substr(0, str.length - 1);
    }
    // console.log('Status Str', str);
    return str;
  }
  getClassByStatus(status: string): string {
    let returnVal: string = '';
    switch (status) {
      case Utils.PENDING:
        returnVal = ' orange';
        break;
      case Utils.PROCESSING:
        returnVal = ' blue';
        break;
      case Utils.COMPLETED:
        returnVal = ' green';
        break;
      case Utils.CANCELED:
        returnVal = ' red';
        break;
      case Utils.REFUNDED:
        returnVal = ' cyan';
        break;
      case Utils.ONHOLD:
        returnVal = ' brown';
        break;
    }
    return returnVal;
  }
  getItemSubtotal(orderItem: OrderItems): number {
    return parseFloat(orderItem.price) * parseFloat(orderItem.quantity);
  }
  getSubtotal(): number {
    return (parseFloat(this.selectedOrderDetails.subtotal) + parseFloat(this.selectedOrderDetails.tax));
  }
  getTotalDue(): number {
    let returnVal: number = 0;
    returnVal = parseFloat(this.selectedOrderDetails.total_payable) - this.getTotalAmountPaid();
    return returnVal;
  }
  getTotalAmountPaid(): number {
    let returnVal: number = 0;
    for (const pp of this.selectedOrderPayments) {
      returnVal = returnVal + parseFloat(pp.savedAmt.toString());
    }
    return returnVal;
  }
  selectedOrder(order: DropshipSalesOrderDetail, m: number, i: number): void {
    this.selectedRow = (m.toString() + i.toString());
    this.setLoading(true);
    this.dropshipservice.getOrderDetails(order.entity_id).subscribe(res => {
      this.selectedOrderDetails = res[0].OrderDetails[0] as OrderDetail;
      this.selectedOrderItems = res[1].OrderItems as OrderItems[];
      this.selectedOrderPayments = res[2].OrderPayment as PaymentProcess[];
      this.selectedAddress = res[3].OrderAddress as Address[];
      this.dropshipservice.getTaxRateByStoreId(this.selectedOrderDetails.store_id).subscribe(txres => {
        if (txres !== undefined && txres[0] !== undefined) {
          this.taxRt = parseFloat(txres[0].rate);
        } else {
          this.taxRt = 0.00;
        }
        this.setLoading(false);
      });
      this.getAddress();
    });
  }
  getAddress(): void {
    for (const add of this.selectedAddress) {
      if (add.address_type.toLowerCase() === 'shipping') {
        this.shipingAddress = add;
      }
      if (add.address_type.toLowerCase() === 'billing') {
        this.billingAddress = add;
      }

    }
    // console.log('this.billingAddress', this.billingAddress);
    // console.log('this.shipingAddress', this.shipingAddress);
  }
  onPaymentDelete(payment: PaymentProcess): void {
    this.dropshipservice.deletePayment(payment.entity_id, payment.order_id).subscribe(res => {
      this.selectedOrderPayments = res as PaymentProcess[];
      this.getTotalAmountPaid();
      this.getTotalDue();
      this.getSubtotal();
      this.showMessage('Payment deleted successfully', this.SUCCESS);
    });
  }
  showMessage(msg: string, alertType: string): void {
    this.message = msg;
    this.alertType = alertType;
    setTimeout(() => {
      this.message = '';
    }, Utils.MILISECONDS);
  }
}

