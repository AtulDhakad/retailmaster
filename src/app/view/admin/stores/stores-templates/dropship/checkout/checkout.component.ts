import {Address} from '../../../../../../models/address';
import {Bank} from '../../../../../../models/bank';
import {CardType} from '../../../../../../models/cardtype';
import {CartItem} from '../../../../../../models/cartitem';
import {Checkout} from '../../../../../../models/checkout';
import {Country} from '../../../../../../models/country';
import {Customer} from '../../../../../../models/customer';
import {CustomerCredit} from '../../../../../../models/customercredit';
import {Employee} from '../../../../../../models/employee';
import {OrderDetail} from '../../../../../../models/orderdetail';
import {OrderItems} from '../../../../../../models/orderitems';
import {PaymentMethod} from '../../../../../../models/paymentmethod';
import {PaymentProcess} from '../../../../../../models/paymentprocess';
import {Product} from '../../../../../../models/product';
import {Region} from '../../../../../../models/region';
import {SalesOrder} from '../../../../../../models/salesorder';
import {ShippingMethod} from '../../../../../../models/shippingmethod';
import {Store} from '../../../../../../models/store';
import {StorePaymentConfig} from '../../../../../../models/storepaymentconfig';
import {StorePreferenceConfiguration} from '../../../../../../models/storepreferenceconfiguration';
import {StoreShippingConfig} from '../../../../../../models/storeshippingconfig';
import {DropshipStoreService} from '../../../../../../services/dropship.service';
import {StoresService} from '../../../../../../services/stores.service';
import {Utils} from '../../../../../../utils/utils';
import {DropshipStoreComponent} from '../dropship.component';
import {Component, ViewChild, Input, OnInit, Output, EventEmitter, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-dropship-store-checkout',
  templateUrl: './checkout.html',
})
export class DropshipStoreCheckoutComponent implements OnInit {
  selecteddate: any;
  @Input() taxRate: string;
  @Input() storeData: Store;
  @Input() cartItems: CartItem[] = [];
  @Input() billingAddress: Address = new Address();
  @Input() shippingAddress: Address = new Address();
  @Input() selectedCustomer: Address;
  @Input() customerCredit: CustomerCredit;
  @Input() baseURL: string = '';
  @Input() selectedPaymentProcess: PaymentProcess[];
  @Output() onOpenView: EventEmitter<string> = new EventEmitter<string>();
  @Input() isSaleHistory: boolean = false;
  @Input() selectedOrderDetails: OrderDetail;
  @Input() selectedOrderItems: OrderItems[];
  showSuccess: boolean = false;
  message: string = '';
  alertType: string;
  WARNING: string = 'WARNING';
  SUCCESS: string = 'SUCCESS';
  subtotal: number = 0;
  taxRt: number = 0;
  gst: any = 0;
  total: any = 0;
  storecredit: number = 0;
  creditMemo: number = 0;
  discountVoucher: number = 0;
  giftVoucher: number = 0;
  creditMemoNumber: number = 0;
  discountVoucherNumber: number = 0;
  giftVoucherNumber: number = 0;
  totalDiscount: number = 0;
  totalAmountPayable: number = 0;
  isShippingSame: boolean = true;
  storeConfiguration: StorePreferenceConfiguration;
  shippingMethodList: ShippingMethod[];
  filteredShippingList: ShippingMethod[];
  countryList: Country[];
  originalRegionList: Region[];
  billingRegionsList: Region[];
  shippingRegionsList: Region[];
  bankList: Bank[] = [];
  selectedElement: PaymentMethod;
  selectedShippingMethod: ShippingMethod;
  selBankId: string;
  selEmployeeId: string;
  selCardType: string;
  isStoreCreditSelected: boolean = true;
  selectedBillingAddressCountry_id: string;
  selectedShippingAddressCountry_id: string;
  selectedBillingAddressRegion_id: string;
  selectedShippingAddressRegion_id: string;
  paymentMethod: PaymentMethod;
  employeeList: Employee[];
  storePaymentMethodsList: StorePaymentConfig[];
  storeShippingMethodsList: StoreShippingConfig[];
  paymentMethods: PaymentMethod[];
  orderDetail: OrderDetail;
  salesOrder: SalesOrder;
  paymentProcessList: PaymentProcess[] = [];

  IGIRO: PaymentProcess;
  IBT: PaymentProcess;
  BAD: PaymentProcess;
  CIH: PaymentProcess;
  PO: PaymentProcess;
  LOC: PaymentProcess;
  CDC: PaymentProcess;
  CASH: PaymentProcess;
  FREE: PaymentProcess;
  totalAmt: number;
  total_paid: number;
  loading: boolean = false;
  selepaymentmethodindex: PaymentProcess;
  isPaymentMethodSelected: boolean = false;
  constructor(private router: Router, private storeService: StoresService,
    private dropshipService: DropshipStoreService) {
    // this.checkout.billing.firstName = ''
  }
  ngOnInit(): void {
    this.dropshipService.customerAddress$.subscribe(value => {
      this.billingAddress = value;
    });
    this.dropshipService.customerCredit$.subscribe(value => {
      this.customerCredit = value
      if (this.customerCredit !== undefined) {
        this.storecredit = this.customerCredit.storecredit;
        this.UpdateTotal();
      }
    });
    this.selectedShippingMethod = new ShippingMethod();
    this.billingAddress = new Address();
    this.billingAddress = this.selectedCustomer;
    this.shippingAddress = new Address()
    if (this.billingAddress !== undefined) {
      this.shippingAddress = this.billingAddress;
    } else {
      this.billingAddress = new Address();
    }
    this.message = '';
    if (this.isSaleHistory === false) {
      this.selectedPaymentProcess = [];
    } else {
      if (this.selectedPaymentProcess.length > 0) {
        this.isPaymentMethodSelected = true;
      } else {
        this.isPaymentMethodSelected = false;
      }
    }

    //    this.IGIRO = this.paymentProcess.find(item => item.value === 'IGIRO');
    //    this.IBT = this.paymentProcess.find(item => item.value === 'IBT');
    //    this.BAD = this.paymentProcess.find(item => item.value === 'BAD');
    //    this.CIH = this.paymentProcess.find(item => item.value === 'CIH');
    //    this.PO = this.paymentProcess.find(item => item.value === 'PO');
    //    this.LOC = this.paymentProcess.find(item => item.value === 'LOC');
    //    this.CDC = this.paymentProcess.find(item => item.value === 'CDC');
    //    this.CASH = this.paymentProcess.find(item => item.value === 'C');
    //    this.FREE = this.paymentProcess.find(item => item.value === 'F');
    $('.price-table tr td').addClass('hide');
    $('.price-table tr:last-child td').removeClass('hide');
    $('.price-table tr td .hidden-form').removeClass('active');
    $('.price-table tr td .v-align-middle:first-child').click(function() {
      // alert('HI');
      $(this).parents('tr').find('td').addClass('hide');
      $('#s2example-3').val('0').trigger('change');
    })

    //    $('#s2example-3').select2({
    //      allowClear: true,
    //      minimumResultsForSearch: -1, // Hide the search bar
    //      formatResult: function(state) {
    //        return '<div class="custom-select2" style="background-image:url(assets/images/pm-' + state.id + '.png);"></div>'
    //          + state.text;
    //      },
    //    }).on('change', function(state) {
    //      $('#' + state.val + ' td').removeClass('hide');
    //    })
    //    if ($.isFunction($.fn.datepicker)) {
    //      $('.datepicker').each(function(i, el) {
    //        const $this = $(el);
    //        const opts = {
    //          format: attrDefault($this, 'format', 'dd/mm/yy'),
    //        },
    //          $n = $this.next(),
    //          $p = $this.prev();
    //        $this.datepicker(opts);
    //      });
    //    }
    //    $('.timepicker').timepicker({
    //      defaultTime: 'current',
    //    });
    let $acc_count = 0;
    $('img.acc-control').click(function(e) {
      e.preventDefault();
      if ($acc_count === 0) {
        $(this).attr('src', 'assets/images/Remove-24.png');
        $(this).parents('td').find('.hidden-form').addClass('active');
        $acc_count = 1;
      } else {
        $(this).attr('src', 'assets/images/Add-24.png');
        $(this).parents('td').find('.hidden-form').removeClass('active');
        $acc_count = 0;
      }
    });
    $('.edit-access-hidden .save-field').click(function() {
      const $val = $(this).parents('li').find('input.hidden-form-small').val();
      const $val_td = $(this).parents('td').find('input.hidden-form-small').val();
      $(this).parents('li').find('.input-value span').text($val);
      // $(this).parents('td').next().text($val_td);
    });
    function attrDefault($el, data_var, default_val) {
      if (typeof $el.data(data_var) !== 'undefined') {
        return $el.data(data_var);
      }
      return default_val;
    }

    // // console.log(this.billingAddress);
    this.setLoading(true);
    this.getCheckOutData();
    if (this.taxRate !== '') {
      this.taxRt = Number(this.taxRate);
    }
  }
  onStoreCreditSelected(): void {
    console.log('this.isStoreCreditSelected ', this.isStoreCreditSelected);
    if (this.isStoreCreditSelected === false) {
      this.storecredit = 0;
    } else {
      this.storecredit = this.customerCredit.storecredit;
    }
    this.UpdateTotal();
  }
  setLoading(show: boolean): void {
    this.loading = show;
  }
  getCheckOutData(): void {
    this.paymentProcessList = [];
    this.filteredShippingList = [];
    this.storeService.getCheckoutData(this.storeData.store_id).subscribe(res => {
      console.log('res', res);
      this.shippingMethodList = res[0].ShippingMethod;
      this.storePaymentMethodsList = res[1].StorePaymentMethod;
      this.countryList = res[2].CountryList;
      this.originalRegionList = res[3].RegionList;
      this.bankList = res[4].BankList;
      this.employeeList = res[5].Employees
      this.paymentMethods = res[6].PaymentMethods;
      this.storeShippingMethodsList = res[7].StoreShippingMethods
      this.paymentProcessList = [];
      this.paymentProcessList.push(Utils.getDefaultPaymentProcess())
      for (const spc of this.storePaymentMethodsList) {
        this.paymentProcessList.push(Utils.setPaymentMethods(spc, this.paymentMethods));
      }
      console.log('this.storeShippingMethodsList', this.storeShippingMethodsList);
      console.log('this.shippingMethodList', this.shippingMethodList);
      for (const ssm of this.storeShippingMethodsList) {
        const shippingMd: ShippingMethod = Utils.setShippingMethods(ssm, this.shippingMethodList);
        if (this.selectedOrderDetails !== undefined) {
          if (shippingMd.value === this.selectedOrderDetails.shipping_method) {
            this.selectedShippingMethod = shippingMd
          }
        }
        this.filteredShippingList.push(shippingMd);
      }

      this.countryList.sort(function(a, b) {
        if (a.country_name < b.country_name) {
          return -1;
        }
        if (a.country_name > b.country_name) {
          return 1;
        }
        return 0;
      });
      this.getStoreCondifgurationByStoreId();
      this.selepaymentmethodindex = Utils.getDefaultPaymentProcess();
      if (this.billingAddress.country_id !== undefined && this.billingAddress.country_id !== '') {
        this.onBillingSelectedCountry(this.billingAddress.country_id);
      }
      if (this.shippingAddress.country_id !== undefined && this.shippingAddress.country_id !== '') {
        this.onShippingSelectedCountry(this.shippingAddress.country_id);
      }
    });
  }
  navigate(path: string): void {
    this.router.navigate([`${this.baseURL}${path}`]);
  }
  getStoreCondifgurationByStoreId(): void {
    this.storeService.getStoreCondifgurationByStoreId(this.storeData.store_id).subscribe(storeConfigRes => {
      this.storeConfiguration = storeConfigRes[0] as StorePreferenceConfiguration;
      //    // console.log('this.storeConfiguration', this.storeConfiguration);
      this.setLoading(false);
    });
    this.UpdateTotal();
  }
  UpdateTotal(): void {
    this.subtotal = 0;
    this.gst = 0;
    this.cartItems.map((item) => {
      this.subtotal += Number(item.product.price) * Number(item.quantity);
    })
    if (this.selectedShippingMethod !== undefined && Number(this.selectedShippingMethod.amount) !== null && Number(this.selectedShippingMethod.amount) > 0) {
      // this.subtotal = this.subtotal + this.selectedShippingMethod.amount;
      this.gst = (Number(this.subtotal) + Number(this.selectedShippingMethod.amount)) * Number(this.taxRate) / 100;
      this.total = Number(this.subtotal) + Number(this.selectedShippingMethod.amount) + Number(this.gst);
    } else {
      this.gst = Number(this.subtotal) * Number(this.taxRate) / 100;
      this.total = Number(this.subtotal) + Number(this.gst);
    }
    if (this.isStoreCreditSelected === true && this.customerCredit !== undefined && this.customerCredit.storecredit !== null) {
      this.storecredit = Number(this.customerCredit.storecredit);
    }
    if (this.storecredit === null) {
      this.storecredit = 0;
    }
    if (this.creditMemo === null) {
      this.creditMemo = 0;
    }
    if (this.discountVoucher === null) {
      this.discountVoucher = 0;
    }
    if (this.giftVoucher === null) {
      this.giftVoucher = 0;
    }
    this.totalDiscount = Number(this.storecredit) + Number(this.creditMemo) + Number(this.discountVoucher) + Number(this.giftVoucher);
    this.totalAmountPayable = Number(this.total) - Number(this.totalDiscount);
    this.setTotalAmountPending(this.totalAmountPayable);
  }
  setTotalAmountPending(total: number): void {
    this.totalAmt = total;
    if (this.selectedPaymentProcess.length > 0) {
      for (const pp of this.selectedPaymentProcess) {
        this.totalAmt = Number(this.totalAmt) - Number(pp.savedAmt.toString());
      }
    }
  }

  setShippingMethodSelected(sm: ShippingMethod): void {
    this.selectedShippingMethod = sm;
    this.UpdateTotal();
    // console.log('selectedShippingMethod', this.selectedShippingMethod);
  }
  onBankSelected(bnkId: string): void {
    this.selBankId = bnkId;
  }
  onEmployeeSelected(employeeId: string): void {
    this.selEmployeeId = employeeId;
  }
  onCardSelected(cardTypeId: string): void {
    this.selCardType = cardTypeId;
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
  onShippingSelectedCountry(country_id: string): void {
    this.selectedShippingAddressCountry_id = country_id;
    this.shippingRegionsList = this.originalRegionList.filter(item => {
      return item.country_id.toLowerCase().includes(country_id.toLowerCase());
    });
  }
  onShippingSelectedRegion(region_id: string): void {
    this.selectedShippingAddressRegion_id = region_id;
  }
  onCheckBoxSelected(): void {
    if (this.isShippingSame) {
      this.shippingAddress = new Address();
    } else {
      this.shippingAddress = this.billingAddress;
      //      // console.log('this.shippingaddress', this.shippingAddress);
      //      // console.log('this.bilingaddress', this.billingAddress);
    }
  }
  isValid(): boolean {
    // console.log('this.billingAddress', this.billingAddress);
    // console.log('this.billingAddress.firstname', this.billingAddress.firstname);
    if (this.billingAddress.firstname === undefined || this.billingAddress.firstname.trim() === '') {
      this.showMessage('Please enter billing addres first name', this.WARNING);
      return false;
    }
    if (this.billingAddress.lastname === undefined || this.billingAddress.lastname.trim() === '') {
      this.showMessage('Please enter billing addres last name', this.WARNING);
      return false;
    }
    if (this.billingAddress.telephone === undefined || this.billingAddress.telephone.trim() === '') {
      this.showMessage('Please enter billing addres telephone', this.WARNING);
      return false;
    }
    if (this.billingAddress.email === undefined || this.billingAddress.email.trim() === '') {
      this.showMessage('Please enter billing addres email', this.WARNING);
      return false;
    }
    //    if (this.totalAmt !==  0) {
    //      this.showMessage('Payment of ' + this.totalAmt + ' is pending', this.WARNING);
    //      return false;
    //    }
    //    if(this.selectedPaymentProcess === undefined || this.selectedPaymentProcess.length === 0) {
    //      this.showMessage('Please select a payment method', this.WARNING);
    //        return false;
    //    }
    console.log('this.selectedShippingMethod', this.selectedShippingMethod);
    if (this.selectedShippingMethod.value === '') {
      this.showMessage('Please select a shipping method', this.WARNING);
      return false;
    }
    return true;
  }
  updateSalesOrder(): any {
    this.dropshipService.salesOrderUpdate(this.getAddressList(), this.getOrderDetails(), this.getOrderItems(),
      this.storeConfiguration.store_config_id, this.selectedPaymentProcess, this.selectedShippingMethod).subscribe(res => {
        this.orderDetail = res[0].OrderDetails[0] as OrderDetail;
        this.orderDetail.total = this.totalAmountPayable.toString();
        this.salesOrder = res[1].SalesOrder[0] as SalesOrder;
        // console.log('this.orderDetail', this.orderDetail);
        // console.log('checkout res', res);
        this.billingAddress.firstname = '';
        this.billingAddress.lastname = '';
        this.billingAddress.email = '';
        this.billingAddress.company = '';
        this.billingAddress.telephone = '';
        this.billingAddress.city = '';
        this.billingAddress.postcode = '';
        this.billingAddress.street = '';
        this.billingAddress = new Address();
        this.shippingAddress = new Address();

        this.showSuccess = false;
        this.setLoading(false);
        this.router.navigate(['sales/sales-orders/' + this.salesOrder.increment_id])
      }, error => {
        this.showMessage(error, this.WARNING);
        this.setLoading(false);
      }
      );

  }
  onPlaceOrder(): void {
    if (this.isSaleHistory === true) {
      this.setLoading(true);
      this.updateSalesOrder();
    } else {
      if (this.isValid()) {
        this.setLoading(true);
        let sequenceNumber: number;
        sequenceNumber = Number(this.storeConfiguration.sequence_number) + 1;
        // console.log('this.selectedPaymentProcess', this.selectedPaymentProcess);
        console.log('this.shipping method', this.selectedShippingMethod);
        this.dropshipService.checkout(this.getAddressList(), this.getOrderDetails(), this.getOrderItems(),
          this.storeConfiguration.store_config_id, sequenceNumber, this.selectedPaymentProcess, this.selectedShippingMethod).subscribe(res => {
            this.orderDetail = res[0].OrderDetails[0] as OrderDetail;
            this.salesOrder = res[1].SalesOrder[0] as SalesOrder;
            // console.log('this.orderDetail', this.orderDetail);
            // console.log('checkout res', res);
            this.billingAddress.firstname = '';
            this.billingAddress.lastname = '';
            this.billingAddress.email = '';
            this.billingAddress.company = '';
            this.billingAddress.telephone = '';
            this.billingAddress.city = '';
            this.billingAddress.postcode = '';
            this.billingAddress.street = '';
            this.billingAddress = new Address();
            this.shippingAddress = new Address();

            this.showSuccess = true;
            this.setLoading(false);
          }, error => {
            this.showMessage(error, this.WARNING);
            this.setLoading(false);
          }
          );
      }
    }
  }
  getOrderItems(): OrderItems[] {
    let orderItems: OrderItems[];
    orderItems = new Array();
    let orderItem: OrderItems;
    if (this.cartItems.length > 0) {
      for (const cartitem of this.cartItems) {
        orderItem = new OrderItems();
        orderItem.product_id = cartitem.product.id;
        orderItem.price = cartitem.product.price;
        orderItem.quantity = cartitem.quantity.toString();
        orderItem.status = cartitem.product.status;
        orderItem.name = cartitem.product.name;
        orderItem.sku = cartitem.product.sku;
        orderItem.description = cartitem.product.description;
        if (this.isSaleHistory === true) {
          const salesOrderItem: OrderItems = this.selectedOrderItems.find(item => item.product_id === orderItem.product_id);
          if (salesOrderItem !== undefined) {
            orderItem.sales_order_item_id = salesOrderItem.sales_order_item_id;
          } else {
            orderItem.sales_order_item_id = '0';
          }
          // console.log('sales order item id ', orderItem.sales_order_item_id);
        }
        orderItems.push(orderItem);
      }
    }
    //    // console.log('orderItems', orderItems);
    return orderItems;
  }
  getOrderDetails(): OrderDetail {
    let orderDetail: OrderDetail
    orderDetail = new OrderDetail();
    orderDetail.coupon_code = '';
    if (Number(this.creditMemo) !== 0) {
      orderDetail.credit_memo = this.creditMemoNumber.toString();
      orderDetail.credit_memo_amt = this.creditMemo.toString();
    } else {
      orderDetail.credit_memo = '';
      orderDetail.credit_memo_amt = '0';
    }
    if (Number(this.discountVoucher) !== 0) {
      orderDetail.discount_voucher = this.discountVoucherNumber.toString();
      orderDetail.discount_voucher_amt = this.discountVoucher.toString();
    } else {
      orderDetail.discount_voucher = '';
      orderDetail.discount_voucher_amt = '0';
    }
    if (Number(this.giftVoucher) !== 0) {
      orderDetail.gift_voucher = this.giftVoucherNumber.toString();
      orderDetail.gift_voucher_amt = this.giftVoucher.toString();
    } else {
      orderDetail.gift_voucher = '';
      orderDetail.gift_voucher_amt = '0';
    }
    if (this.selectedShippingMethod !== undefined) {
      orderDetail.shipping_method_id = this.selectedShippingMethod.shipping_id;
    }
    orderDetail.store_id = this.storeData.store_id;
    orderDetail.storecredit = '1';
    orderDetail.storecredit_amount = this.storecredit.toString();
    orderDetail.subtotal = this.subtotal.toString();
    orderDetail.tax = this.gst;
    orderDetail.total = this.total;
    orderDetail.total_payable = this.totalAmountPayable.toString();
    orderDetail.invoiceNumber = this.storeConfiguration.custom_order_number + this.storeConfiguration.sequence_number + this.storeConfiguration.suffix;
    orderDetail.total_paid = (this.totalAmountPayable - this.totalAmt).toString();
    orderDetail.shipping_amount = this.selectedShippingMethod.amount.toString();
    if (this.isSaleHistory === true) {
      orderDetail.increment_id = this.selectedOrderDetails.increment_id;
      orderDetail.entity_id = this.selectedOrderDetails.entity_id;
      orderDetail.sales_order_id = this.selectedOrderDetails.sales_order_id;

    }
    return orderDetail;
  }
  getAddressList(): Address[] {
    const addressList: Address[] = new Array();
    this.billingAddress.address_type = 'BILLING';
    if (this.selectedBillingAddressRegion_id !== undefined) {
      this.billingAddress.region_id = this.selectedBillingAddressRegion_id;
      this.billingAddress.region = this.originalRegionList.find(item => item.region_id === this.selectedBillingAddressRegion_id).default_name;
    }
    if (this.selectedBillingAddressCountry_id !== undefined) {
      this.billingAddress.country_id = this.selectedBillingAddressCountry_id;
    }
    addressList.push(this.billingAddress);
    if (this.shippingAddress !== undefined && this.isShippingSame === true) {
      this.shippingAddress.address_type = 'SHIPPING';
      if (this.selectedShippingAddressCountry_id !== undefined) {
        this.shippingAddress.country_id = this.selectedShippingAddressCountry_id;
      }
      if (this.selectedShippingAddressRegion_id !== undefined) {
        this.shippingAddress.region_id = this.selectedShippingAddressRegion_id;
        this.shippingAddress.region = this.originalRegionList.find(item => item.region_id === this.selectedShippingAddressRegion_id).default_name;
      }
      addressList.push(this.shippingAddress);
    }
    return addressList;
  }
  openview(view: string): void {
    this.onOpenView.emit(view);
  }
  onSaveContact(): void {
    // this.setLoading(true);
    this.dropshipService.saveContact(this.getAddressList()).subscribe(res => {
      this.billingAddress = res[0] as Address;
      this.showMessage('Contact saved successfully', this.SUCCESS);
      // this.setLoading(false);
    });
  }
  onRemovePaymentProcess(paymentProcess: PaymentProcess): void {
    const ind: number = this.selectedPaymentProcess.indexOf(paymentProcess);
    this.selectedPaymentProcess.splice(ind, 1);
    this.selepaymentmethodindex = Utils.getDefaultPaymentProcess();
    if (this.selectedPaymentProcess.length > 0) {
      this.isPaymentMethodSelected = true;
    } else {
      this.isPaymentMethodSelected = false;
    }
  }
  //  onPaymentMethodSelected(paymentProcessValue: PaymentProcess): void {
  //     this.selectedPaymentProcess.push(paymentProcessValue);
  //    // console.log('paymentProcessValue', paymentProcessValue);
  //  }
  ondatePickerClicked(dt: string): void {
    // console.log('dt', dt);
  }
  onDateChange(test: any): void {
    // console.log('test', test);
  }
  validatePaymentDate(value: string): boolean {
    // console.log('dateVal', value);
    if (value === '') {
      this.showMessage('Please enter date in dd/mm/yy format', this.WARNING);
      return false;
    }
    return true;
  }
  validatePaymentTime(value: string): boolean {
    // console.log('timeVal', value);
    if (value === '') {
      this.showMessage('Please enter time in HH:MM AM/PM format', this.WARNING);
      return false;
    }
    return true;
  }
  onPaymentMethodSelected(value: string): void {
    if (value !== '0') {
      const payprocess: PaymentProcess = this.paymentProcessList.find(item => item.value === value);
      this.selepaymentmethodindex = payprocess;
      this.selectedPaymentProcess.push(payprocess);
    }
    if (this.selectedPaymentProcess.length > 0) {
      this.isPaymentMethodSelected = true;
    } else {
      this.isPaymentMethodSelected = false;
    }
  }
  showMessage(msg: string, alertType: string): void {
    this.message = msg;
    this.alertType = alertType;
    setTimeout(() => {
      this.message = '';
    }, Utils.MILISECONDS);
  }
  onSuccessButtonClick($event): void {
    this.openview($event);
  }
}
