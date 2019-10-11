import {CardType} from '../models/cardtype';
import {Employee} from '../models/employee';
import {EmployeeRole} from '../models/employeerole';
import {PageData} from '../models/pagedata';
import {PaymentMethod} from '../models/paymentmethod';
import {PaymentProcess} from '../models/paymentprocess';
import {PerformanceTargetStore} from '../models/performancetargetstore';
import {ShippingMethod} from '../models/shippingmethod';
import {Status} from '../models/status';
import {Store} from '../models/store';
import {StorePaymentConfig} from '../models/storepaymentconfig';
import {StoreShippingConfig} from '../models/storeshippingconfig';
export class Utils {
  static GIFT: string = 'GIFT';
  static DISC: string = 'DISC';
  static PO: string = 'PO';
  static CHQ: string = 'CHQ';
  static CASH: string = 'C';
  static CDC: string = 'CDC';
  static BAD: string = 'BAD';
  static IBT: string = 'IBT';
  static SC: string = 'SC';
  static GIRO: string = 'GIRO';

  static DD_MMM_YYYY: string = 'dd mmm yyyy';
  static DD_MM_YYYY: string = 'dd mm yyyy';
  static TT_HH: string = 'TT:HH';
  static PENDING: string = 'pending';
  static PROCESSING: string = 'processing';
  static COMPLETED: string = 'complete';
  static CANCELED: string = 'canceled';
  static REFUNDED: string = 'refund';
  static ONHOLD: string = 'onhold';
  static stArr: PerformanceTargetStore[];
  static empArr: Employee[];
  static empRole: EmployeeRole[];
  static MILISECONDS: number = 4000;
  static convertImageToBase64(img, asd) {}
  static getEmployeeArr(): Employee[] {
    const employeeArr: Employee[] = Array(2);
    const employee1: Employee = new Employee();
    employee1.id = '2';
    employee1.name = 'test';
    employee1.target = 3;
    employee1.year = 1992;
    employee1.month = 2;
    employee1.store = 'eng';
    employeeArr[0] = employee1;

    const employee2: Employee = new Employee();
    employee2.id = '3';
    employee2.name = 'sumit';
    employee2.target = 3;
    employee2.year = 1982;
    employee2.month = 2;
    employee2.store = 'eng';
    employeeArr[1] = employee2;
    this.empArr = employeeArr;
    return this.empArr;
  }

  static getStatusArr(): Status[] {
    const statusArr: Status[] = Array(2);
    const statusActive: Status = new Status();
    statusActive.id = '1';
    statusActive.name = 'Active';
    statusArr[0] = statusActive;

    const statusInactive = new Status();
    statusInactive.id = '0';
    statusInactive.name = 'InActive';
    statusArr[1] = statusInactive;
    return statusArr;
  }

  static getCardTypeArr(): Status[] {
    const cardTypeArr: CardType[] = Array(3);
    const cardType: CardType = new CardType();
    cardType.id = '1';
    cardType.name = 'Visa';
    cardTypeArr[0] = cardType;

    const cardType1: CardType = new CardType();
    cardType1.id = '2';
    cardType1.name = 'MasterCard';
    cardTypeArr[1] = cardType1;

    const cardType2: CardType = new CardType();
    cardType2.id = '3';
    cardType2.name = 'Amex';
    cardTypeArr[2] = cardType2;

    return cardTypeArr;
  }

  static getStoreArr(): PerformanceTargetStore[] {
    const storeArr: PerformanceTargetStore[] = Array(3);

    const store1 = new PerformanceTargetStore()
    store1.id = 6;
    store1.store = 'ger';
    store1.year = 1994;
    store1.month = '11';
    store1.target = 3;
    storeArr[0] = store1;

    const store2 = new PerformanceTargetStore()
    store2.id = 7;
    store2.store = 'ENG';
    store2.year = 1992;
    store2.month = '10';
    store2.target = 2;
    storeArr[1] = store2;

    const store3 = new PerformanceTargetStore()
    store3.id = 8;
    store3.store = 'eng';
    store3.year = 1992;
    store3.month = '2';
    store3.target = 6;
    storeArr[2] = store3;

    this.stArr = storeArr;
    return this.stArr;
  }
  static getPaymentMethods(): PaymentProcess[] {
    const paymentMethodArr: PaymentProcess[] = Array(10);
    const pm10 = new PaymentProcess();
    pm10.id = 9;
    pm10.value = this.SC;
    pm10.name = 'Store Credit';
    paymentMethodArr[0] = pm10;

    const pm1 = new PaymentProcess();
    pm1.id = 1;
    pm1.value = this.GIRO;
    pm1.name = 'Interbank GIRO';
    pm1.showDate = true;
    pm1.showTime = true;
    paymentMethodArr[1] = pm1;

    const pm2 = new PaymentProcess();
    pm2.id = 2;
    pm2.value = this.IBT;
    pm2.showDate = true;
    pm2.showTime = true;
    pm2.name = 'Instant bank transfer';
    paymentMethodArr[2] = pm2;

    const pm3 = new PaymentProcess();
    pm3.id = 3;
    pm3.value = this.BAD;
    pm3.showDate = true;
    pm3.showTime = true;
    pm3.name = 'Bank/ATM deposit';
    paymentMethodArr[3] = pm3;

    const pm4 = new PaymentProcess();
    pm4.id = 4;
    pm4.value = this.CDC;
    pm4.name = 'Credit/debit card';
    pm4.showCardTypeCombo = true;
    paymentMethodArr[4] = pm4;

    const pm5 = new PaymentProcess();
    pm5.id = 5;
    pm5.value = this.CASH;
    pm5.name = 'Cash';
    paymentMethodArr[5] = pm5;

    const pm6 = new PaymentProcess();
    pm6.id = 6;
    pm6.value = this.CHQ;
    pm6.name = 'Cheque';
    pm6.showBankCombo = true;
    pm6.showChequeNo = true;
    pm6.showChequeDate = true;
    paymentMethodArr[6] = pm6;

    const pm7 = new PaymentProcess();
    pm7.id = 7;
    pm7.value = this.PO;
    pm7.name = 'Purchase Order';
    pm7.showPoNo = true;
    pm7.showPoDate = true;
    paymentMethodArr[7] = pm7;

    const pm8 = new PaymentProcess();
    pm8.id = 8;
    pm8.value = this.DISC;
    pm8.name = 'Discount voucher';
    pm8.showDiscVoucherNo = true;
    paymentMethodArr[8] = pm8;

    const pm9 = new PaymentProcess();
    pm9.id = 9;
    pm9.value = this.GIFT;
    pm9.name = 'Gift Voucher';
    pm9.showGiftVoucerNo = true;
    paymentMethodArr[9] = pm9;

    return paymentMethodArr;

  }
  static setPaymentMethods(spc: StorePaymentConfig, paymentMethodList: PaymentMethod[]): PaymentProcess {
    const pm = new PaymentProcess();
    for (const paymethod of paymentMethodList) {
      if (paymethod.value === spc.payment_value) {
        pm.name = this.ConvertToSentenceCase(paymethod.label);
        pm.id = parseInt(paymethod.payment_id, 2);
        pm.value = paymethod.value;
        break;
      }
    }
    return pm;
  }
  static getDefaultPaymentProcess(): PaymentProcess {
    const paymentProcess: PaymentProcess = new PaymentProcess();
    paymentProcess.value = '0';
    paymentProcess.name = 'Select payment method...';
    paymentProcess.id = 0;
    return paymentProcess;
  }

  static setShippingMethods(ssc: StoreShippingConfig, shippingMethodList: ShippingMethod[]): ShippingMethod {
    const sm = new ShippingMethod();
    for (const shippingMethod of shippingMethodList) {
      if (ssc.shipping_value.indexOf(shippingMethod.label) !== -1) {
        sm.name = this.ConvertToSentenceCase(shippingMethod.label);
        sm.shipping_id = shippingMethod.shipping_id;
        if (shippingMethod.value !== '') {
          sm.value = ssc.shipping_value;
        }
        if (shippingMethod.label !== '') {
          sm.value = ssc.shipping_value;
        }
        if (sm.name.toLowerCase() === 'Free Shipping'.toLowerCase()) {
          sm.amount = 0;
        }
        if (sm.name.toLowerCase() === 'FreeShipping'.toLowerCase()) {
          sm.amount = 0;
        }
        if (sm.name.toLowerCase() === 'Fast Delivery'.toLowerCase()) {
          sm.amount = 5;
        }
        if (sm.name.toLowerCase() === 'Flat Rate'.toLowerCase()) {
          sm.amount = 10;
        }
        if (sm.name.toLowerCase() === 'FlatRate'.toLowerCase()) {
          sm.amount = 10;
        }
        if (sm.name.toLowerCase() === 'Local Delivery'.toLowerCase()) {
          sm.amount = 5;
        }
        if (sm.name.toLowerCase() === 'webpos_shipping'.toLowerCase()) {
          sm.amount = 15;
        }
        break;
      }
    }
    return sm;
  }
  static getPageData(): PageData[] {
    const pageData: PageData[] = [];
    let pageDataObj = new PageData();
    for (let i = 0; i < 5; i++) {
      pageDataObj = new PageData();
      pageDataObj.id = i + 1;
      pageDataObj.value = (pageDataObj.id * 20).toString();
      pageData.push(pageDataObj);
    }
    return pageData;
  }
  static addCommaToNumber(num: number): string {
    return num.toLocaleString('en', {
      minimumFractionDigits: 2
    });
  }
  static ConvertToSentenceCase(str: string): string {
    const returnStr: string = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    // console.log('finalstr', returnStr);
    return returnStr;
  }
}
