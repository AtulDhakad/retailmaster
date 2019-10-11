import {GroupByPipe} from '../../../../group-by.pipe';
import {ConfigService} from '../../../../services/config.service';
import {Subscription} from 'rxjs/Subscription';
import {Address} from '../../../../models/address';
import {Bank} from '../../../../models/bank';
import {CardType} from '../../../../models/cardtype';
import {Country} from '../../../../models/country';
import {DropshipSalesOrderDetail} from '../../../../models/dropshipsalesorderdetail';
import {DropShipSalesOrderMap} from '../../../../models/dropshipsalesordermap';
import {OrderDetail} from '../../../../models/orderdetail';
import {OrderItems} from '../../../../models/orderitems';
import {PageData} from '../../../../models/pagedata';
import {PaymentProcess} from '../../../../models/paymentprocess';
import {Region} from '../../../../models/region';
import {SalesCreditMemo} from '../../../../models/salescreditmemo';
import {Store} from '../../../../models/store';
import {DropshipStoreService} from '../../../../services/dropship.service';
import {PagerService} from '../../../../services/pager.service';
import {Utils} from '../../../../utils/utils';
import {Component, OnInit, TemplateRef} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import { SalesOrdersService } from '../../../../services/sales-orders.service';
import { LoaderService } from '../../../../services/loader.service';
@Component({
  selector: 'app-sales-orders',
  templateUrl: './sales-orders.html',
  styleUrls: ['./sales-orders.component.css'],

  providers: [SalesOrdersService, PagerService, LoaderService, GroupByPipe],
})

export class SalesOrdersComponent implements OnInit{
  modalRef: BsModalRef;
  shipping_amount: number = 0;
  cardTypeList: CardType[];
  date: Date = new Date();
  datepickerOpts = {
    autoclose: true,
    todayBtn: 'linked',
    todayHighlight: true,
    assumeNearbyYear: false,
    format: Utils.DD_MM_YYYY,
    icon: 'fa fa-calendar'
  };
  selectedBillingAddressRegion_id: string;
  selectedBillingAddressCountry_id: string;
  countryList: Country[];
  originalRegionList: Region[];
  billingRegionsList: Region[];
  routerSubscription: Subscription;
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
  showAddressPopup: boolean = false;
  bankList: Bank[];
  // pager object
  pager: any = {};
  showCancelPopup: boolean = false;
  showRefundPopup: boolean = false;
  showAddPaymentPopup: boolean = false;
  // paged items
  paymentProcessArr: PaymentProcess[] = [];
  pagedItems: any[];
  loading: boolean = false;
  totalAmountPaid: number = 0;
  adjustmentFee: number = 0;
  adjustmentrefund: number = 0;
  comments: string = '';
  salesCreditMemoList: SalesCreditMemo[] = [];
  currentRoute: string;
  isShippingAddress: boolean = false;
  constructor(private modalService: BsModalService, private dropshipservice: DropshipStoreService,
     private pagerService: PagerService, private router: Router) {
    this.routerSubscription = this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        this.currentRoute = this.router.url;
        // console.log('this.currentRoute', this.currentRoute);
        // this.activateView();
      }
    });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit(): void {
    this.cardTypeList = Utils.getCardTypeArr();
    this.showCancelPopup = false;
    this.showRefundPopup = false;
    this.showAddPaymentPopup = false;
    this.setLoading(true);
    this.paymentProcessArr = Utils.getPaymentMethods();
    this.dropshipservice.getStores().subscribe(res => {
      this.storeList = res as Store[];
      // this.setLoading(false);
      // console.log('current route', this.currentRoute);
      const orderId = this.currentRoute.split('/')[3];
      if (orderId !== undefined) {
        this.loadOrder(orderId, true);
        this.searchString = localStorage.getItem('SearchStr');
        this.selectedStoreId = +localStorage.getItem('SearchStore');
        const searchStatus: string[] = localStorage.getItem('SearchStatus').split(',');
        for (const str of searchStatus) {
          this.setSearchStatus(str);
        }
      } else {
        this.setLoading(false);
      }
    });
    this.pageData = Utils.getPageData();
    this.message = '';
    this.alertType = '';
    this.searchStatus = '';
  }
  onCancelClick() {
    this.showCancelPopup = true;
  }
  onRefundClick() {
    this.showRefundPopup = true;
    this.OnUpdateQtyClick();
  }
  onAddPaymentClick() {
    this.showAddPaymentPopup = true;
  }
  onReturnOfStockRadio(orderItem: OrderItems): void {
    orderItem.returnOfStock = true;
    orderItem.damage = false;
  }
  onDamageRadio(orderItem: OrderItems): void {
    orderItem.returnOfStock = false;
    orderItem.damage = true;
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
    this.pagedItems = this.dropShipsalesOrderList.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.filterRecordsByStatus(this.pagedItems);

  }

  onKeyUp(event: any): void {
    if (event.keyCode === 13) {
      if (this.searchString !== undefined && this.searchString.length > 3) {
        this.getOrderBySearch();
      } else {
        this.showMessage('Please enter more than 3 characters to search', this.WARNING);
      }
    }
  }
  onSelectedStore(store_id: number): void {
    this.selectedStoreId = store_id;
  }
  onPageDataSelected(value: string): void {
    this.pageSize = parseFloat(value);
  }

  getTotalPrice(item: OrderItems): number {
    if (parseFloat(item.quantity) > 0) {
      const subTotal: number = Number(item.price) * Number(item.quantity);
      const taxAmt = Number(subTotal) * Number(this.taxRt.toString()) / 100;
      return Number(subTotal) + Number(taxAmt.toString());
    } else {
      return 0;
    }
  }
  getRefundTotalPrice(item: OrderItems): number {
    if (item.refundQty > 0) {
      item.refundRowTotal = Number(item.refundItemSubTotal) + Number(item.refundItemTax);
    } else {
      item.refundRowTotal = 0;
    }
    return item.refundRowTotal;
  }
  onPaymentMethodSelected(paymentVal: string): void {
    for (const pp of this.paymentProcessArr) {
      if (pp.value === paymentVal) {
        pp.enable = true;
      }
    }
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
    this.getOrderBySearch();
    // this.searchStatus = this.searchStatus.slice(0, this.searchStatus.length - 1);
  }

  filterRecordsByStatus(dropShipsalesOrderList: DropshipSalesOrderDetail[]) {
    this.dropShipsalesOrderMap = [];
    for (const obj of dropShipsalesOrderList) {
      this.updateMap(obj);
    }
  }
  getOrderBySearch(): void {
    // console.log(this.selecteddate)
    if (this.searchString === '' && this.selectedStoreId === 0 && this.getStatusString() === '') {
      this.showMessage('Please enter search string or select store for searching', this.WARNING);
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
    //  // console.log('obj.created_on', obj.created_at.toString().split(' ')[0]);
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
      str = str + '\'complete\'' + ',';
    }
    if (this.isCancelledClicked) {
      str = str + '\'canceled\'' + ',';

    }
    if (this.isRefundedClicked) {
      str = str + '\'refund\'' + ',';
    }
    if (this.isOnHoldClicked) {
      str = str + '\'onhold\'' + ',';
    }
    if (str.length > 0) {
      str = str.substr(0, str.length - 1);
    }
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
    let returnVal: number = 0;
    if (Number(orderItem.quantity) > 0) {
      returnVal = Number(orderItem.price) * Number(orderItem.quantity);
    } else {
      returnVal = 0;
    }
    return returnVal;
  }
  getRefundItemSubtotal(orderItem: OrderItems): number {
    if (Number(orderItem.refundQty) > 0) {
      orderItem.refundItemSubTotal = Number(orderItem.price) * Number(orderItem.refundQty);
    } else {
      orderItem.refundItemSubTotal = 0;
    }
    return orderItem.refundItemSubTotal;
  }
  getTaxSubtotal(orderItem: OrderItems): number {
    if (Number(orderItem.refundQty) > 0) {
      orderItem.refundItemTax = (Number(orderItem.refundItemSubTotal) * Number(this.taxRt)) / 100;
    } else {
      orderItem.refundItemTax = 0;
    }
    return orderItem.refundItemTax;
  }
  getRefundTaxSubtotal(): number {
    let returnVal: number = 0;
    let tempVal: number = 0;
    for (const orItem of this.selectedOrderItems) {
      if (orItem.refundItemSubTotal !== undefined) {
        tempVal = Number(tempVal) + Number(orItem.refundItemSubTotal.toString());
      }
    }
    returnVal = (Number(tempVal) * Number(this.taxRt)) / 100;
    return returnVal;
  }
  getRefundGrandTotal(): number {
    let returnVal: number = 0;
    returnVal = Number(this.getRefundSubtotal());
    returnVal = Number(returnVal) + Number(this.shipping_amount);
    returnVal = Number(returnVal) - Number(this.adjustmentrefund);
    returnVal = Number(returnVal) + Number(this.adjustmentFee);
    returnVal = Number(returnVal) + Number(this.getRefundTaxSubtotal());
    return returnVal;
  }
  getRefundSubtotal(): number {
    let returnVal: number = 0;
    for (const orItem of this.selectedOrderItems) {
      returnVal = Number(returnVal) + Number(orItem.price);
    }
    return returnVal;
    //    return (parseFloat(this.selectedOrderDetails.subtotal) + parseFloat(this.selectedOrderDetails.tax));
  }
  getSubtotalRefund(): number {
    let returnVal: number = 0;
    for (const orItem of this.selectedOrderItems) {
      returnVal = Number(returnVal) + Number(orItem.refundItemSubTotal);
    }
    return returnVal;
    //    return (parseFloat(this.selectedOrderDetails.subtotal) + parseFloat(this.selectedOrderDetails.tax));
  }
  getSubtotal(): number {
    let returnVal: number = 0;
    for (const orItem of this.selectedOrderItems) {
      returnVal = Number(returnVal) + Number(this.getTotalPrice(orItem));
    }
    return returnVal;
    //    return (parseFloat(this.selectedOrderDetails.subtotal) + parseFloat(this.selectedOrderDetails.tax));
  }
  OnUpdateQtyClick(): void {
    for (const orderItem of this.selectedOrderItems) {
      this.getRefundItemSubtotal(orderItem);
      this.getTaxSubtotal(orderItem);
      this.getRefundTotalPrice(orderItem);
      this.getRefundGrandTotal();
    }
  }
  onShippingAmountChange(shippingAmt: number): void {
    this.getRefundGrandTotal();
  }
  onAdjustmentRefundChange(adjustmentRefund: number): void {
    this.getRefundGrandTotal();
  }
  onAdjustmentFeeChange(adjustmentFee: number): void {
    this.getRefundGrandTotal();
  }
  getTotalDue(): number {
    let returnVal: number = 0;
    returnVal = Number(this.getSubtotal().toString()) - Number(this.getTotalAmountPaid());
    return returnVal;
  }
  getSpecialPrice(orderItem: OrderItems): number {
    let returnVal: number = 0;
    if (this.selectedOrderDetails.discount_voucher === '' && this.selectedOrderDetails.discount_voucher_amt === '') {
      returnVal = Number(orderItem.price);
    } else {
      returnVal = Number(orderItem.price) - Number(this.selectedOrderDetails.discount_voucher_amt);
    }
    return returnVal;
  }
  getTotalAmountPaid(): number {
    let returnVal: number = 0;
    for (const pp of this.selectedOrderPayments) {
      returnVal = Number(returnVal) + Number(pp.savedAmt.toString());
    }
    return returnVal;
  }
  loadOrder(orderId: string, isSearch: boolean = false): void {
    this.dropshipservice.getOrderDetails(orderId).subscribe(res => {
      this.selectedOrderDetails = res[0].OrderDetails[0] as OrderDetail;
      this.selectedOrderItems = res[1].OrderItems as OrderItems[];
      this.selectedOrderPayments = res[2].OrderPayment as PaymentProcess[];
      this.selectedAddress = res[3].OrderAddress as Address[];
      this.bankList = res[4].BankList as Bank[];
      this.salesCreditMemoList = res[5].SALE_CREDITMEMO as SalesCreditMemo[];
      this.countryList = res[6].CountryList as Country[];
      this.originalRegionList = res[7].RegionList as Region[];
      for (const sop of this.selectedOrderPayments) {
        for (const pp of this.paymentProcessArr) {
          if (sop.value === pp.value) {
            if (sop.enteredAmt > 0) {
              pp.enteredAmt = Number(sop.enteredAmt);
              pp.savedAmt = Number(sop.savedAmt);
              pp.timeString = sop.timeString;
              console.log('sop.timeString', sop.timeString);
              pp.time = this.getActualTime(sop.timeString);
              pp.date = this.getActualDate(sop.date);
              pp.enable = true;
            }
          }
        }
      }
      this.updateTotalAmountPaid();
      this.dropshipservice.getTaxRateByStoreId(this.selectedOrderDetails.store_id).subscribe(txres => {
        if (txres !== undefined && txres[0] !== undefined) {
          this.taxRt = Number(txres[0].rate);
        } else {
          this.taxRt = 0.00;
        }
        if (isSearch === false) {
          this.setLoading(false);
        }
      });
      this.getAddress();
    });
  }
  selectedOrder(order: DropshipSalesOrderDetail, m: number, i: number): void {
    this.selectedRow = (m.toString() + i.toString());
    this.setLoading(true);
    this.loadOrder(order.increment_id);

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
  }
  onPaymentDelete(payment: PaymentProcess): void {
    this.setLoading(true);
    this.dropshipservice.deletePayment(payment.entity_id, payment.order_id).subscribe(res => {
      this.selectedOrderPayments = res as PaymentProcess[];
      this.getTotalAmountPaid();
      this.getTotalDue();
      this.getSubtotal();
      this.setLoading(false);
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
  onChangeOrder(): void {
    localStorage.setItem('SearchStr', this.searchString);
    localStorage.setItem('SearchStatus', this.getStatusString());
    localStorage.setItem('SearchStore', this.selectedStoreId.toString());
    this.router.navigate(['home/salesOrder/' + this.selectedOrderDetails.increment_id]);
  }
  onCancelOrderClick(): void {
    this.setLoading(true);
    this.dropshipservice.cancelOrder(this.selectedOrderDetails).subscribe(res => {
      if (res[0] === 'Success') {
        this.showMessage('Order canceled successfully', this.SUCCESS);
        this.selectedOrderDetails.status = Utils.CANCELED;
        this.getOrderBySearch();
      } else {
        this.showMessage(res[0], this.SUCCESS);
      }
    });
  }
  onSavePaymentAmount(pp: PaymentProcess): void {
    if (pp.enteredAmt !== undefined && Number(pp.enteredAmt) > 0) {
      pp.savedAmt = pp.enteredAmt;
      this.totalAmountPaid = 0;
      for (const tempPp of this.paymentProcessArr) {
        this.totalAmountPaid = Number(this.totalAmountPaid) + Number(tempPp.savedAmt.toString());
      }
      const totalAmtDue: number = this.getTotalDue();
      this.totalAmountPaid = Number(totalAmtDue) - Number(this.totalAmountPaid.toString());
    }
  }
  onCancelPaymentAmount(pp: PaymentProcess): void {
    pp.savedAmt = 0;
    pp.enteredAmt = null;
    pp.enable = false;
    this.updateTotalAmountPaid();
  }
  updateTotalAmountPaid(): void {
    this.totalAmountPaid = 0;
    for (const tempPp of this.paymentProcessArr) {
      this.totalAmountPaid = Number(this.totalAmountPaid) + Number(tempPp.savedAmt.toString());
    }

  }
  onAddPaymentSubmit(): void {
    this.setLoading(true);

    const tempPaymentProcessArr: PaymentProcess[] = Array(this.paymentProcessArr.filter(item => item.enteredAmt > 0).length);
    let count: number = 0;
    for (const tempPp of this.paymentProcessArr) {
      if (tempPp !== undefined && tempPp.enteredAmt !== undefined && tempPp.time !== null) {
        console.log('time string', tempPp.time.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true}));
        tempPp.timeString = tempPp.time.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
        tempPaymentProcessArr[count] = tempPp;
        count++;
      }
    }
    this.selectedOrderPayments = [];
    this.dropshipservice.onAddOrderPayment(tempPaymentProcessArr, this.selectedOrderDetails).subscribe(res => {
      this.selectedOrderPayments = res;
      this.getTotalAmountPaid();
      this.getTotalDue();
      this.getSubtotal();
      this.setLoading(false);
      this.showAddPaymentPopup = false;
    });

  }
  getDate(date: string): string {
    let returnVal: string = '';
    if (date !== '') {
      const datePart = date.split('T');
      const arr = datePart[0].toString().split('-')
      returnVal = arr[2] + ' ' + arr[1] + ' ' + arr[0];
    }
    return returnVal;
  }
  getTime(date: string): string {
    let returnVal: string = '';
    if (date !== undefined && date !== '') {
      const timePart = date.split('T');
      if (timePart !== undefined && timePart[1] !== undefined) {
        const arr = timePart[1].toString().split(':');
        let AMPM: string = 'AM';
        const tempTM: number = parseFloat(arr[0]);
        if (tempTM > 12) {
          AMPM = 'PM';
          const tm: string = (tempTM - parseFloat('12')).toString();
          arr[0] = tm;
          returnVal = tm + ':' + arr[1] + ':' + arr[2] + AMPM;
        } else {
          returnVal = timePart[1].toString() + AMPM;
        }
      }
    }
    return returnVal;
  }
  getActualDate(date: any): Date {
    let returnVal: Date = new Date();
    if (date !== '') {
      const datePart = date.split('T');
      const arr = datePart[0].toString().split('-')
      returnVal = new Date(arr[0], arr[1] - 1, arr[2]) // arr[2] + ' ' + arr[1] + ' ' + arr[0];
    }
    return returnVal;
  }
  getActualTime(date: string): Date {
    let returnVal: Date = new Date();
    if (date !== undefined && date !== '') {
      const datePart = date.split('T');
      const arr = datePart[0].toString().split('-');
      const arr1 = date.toString().split(':');
      returnVal = new Date(Number(arr[0]), Number(arr[1]) - 1, Number(arr[2]), Number(arr1[0]), Number(arr1[1].split(' ')[0]));
      // const t = date.split(/[- :]/);
      // const arr = datePart[0].toString().split('-')
      //  returnVal = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5])) // arr[2] + ' ' + arr[1] + ' ' + arr[0];
    }
    return returnVal;
  }
  onRefundOrderClick(): void {
    this.setLoading(true);
    this.dropshipservice.onRefund(this.selectedOrderDetails, this.selectedOrderItems, this.adjustmentrefund,
      this.shipping_amount, this.comments, this.adjustmentFee, this.getRefundGrandTotal(), this.getRefundSubtotal()).subscribe(res => {
        // console.log('refund res', res);
        this.showMessage('Refund Successfull', this.SUCCESS);
        this.setLoading(false);
        this.showRefundPopup = false;
      }, error => {
        this.showMessage(error, this.WARNING);
        this.setLoading(false);
      });
  }

  setSearchStatus(status: string): void {
    if (status.indexOf(Utils.PENDING) !== -1) {
      this.isPendingClicked = true;
    }
    if (status.indexOf(Utils.PROCESSING) !== -1) {
      this.isPendingClicked = true;
    }
    if (status.indexOf(Utils.COMPLETED) !== -1) {
      this.isPendingClicked = true;
    }
    if (status.indexOf(Utils.CANCELED) !== -1) {
      this.isPendingClicked = true;
    }
    if (status.indexOf(Utils.REFUNDED) !== -1) {
      this.isPendingClicked = true;
    }
    if (status.indexOf(Utils.ONHOLD) !== -1) {
      this.isPendingClicked = true;
    }
    this.getOrderBySearch();
  }
  onBillingSelectedCountry(country_id: string): void {
    this.selectedBillingAddressCountry_id = country_id;
    this.billingRegionsList = this.originalRegionList.filter(item => {
      return item.country_id.toLowerCase().includes(country_id.toLowerCase());
    });
  }
  onBillingSelectedRegion(region_id: string): void {
    this.selectedBillingAddressRegion_id = region_id;
  }
  onUpdateContact(): void {
    this.setLoading(true);
    let add: Address = new Address();
    if (this.isShippingAddress === false) {
      add = this.billingAddress;
    } else {
      add = this.shipingAddress;
    }
    this.dropshipservice.updateContact(add).subscribe(res => {
//      console.log('res', res);
//      if (this.isShippingAddress === false) {
//        this.billingAddress.firstname = res.firstname;
//        this.billingAddress.lastname = res.lastname;
//        this.billingAddress.street = res.street;
//        this.billingAddress.region = res.region;
//        this.billingAddress.country_id = res.country_id;
//      } else {
//        this.shipingAddress.firstname = res.firstname;
//        this.shipingAddress.lastname = res.lastname;
//        this.shipingAddress.street = res.street;
//        this.shipingAddress.region = res.region;
//        this.shipingAddress.country_id = res.country_id;
//      }
      // this.billingAddress = res;
      this.setLoading(false);
      this.showMessage('Address updated successfully', this.SUCCESS);
      this.showAddressPopup = false;
    });
  }
}

