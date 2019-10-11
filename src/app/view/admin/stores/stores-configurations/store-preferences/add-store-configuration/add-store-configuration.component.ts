import {Currency} from '../../../../../../models/currency';
import {Employee} from '../../../../../../models/employee';
import {Language} from '../../../../../../models/language';
import {PaymentMethod} from '../../../../../../models/paymentmethod';
import {ShippingMethod} from '../../../../../../models/shippingmethod';
import {Store} from '../../../../../../models/store';
import {StoreConfiguration} from '../../../../../../models/storeconfiguration';
import {StoreGroup} from '../../../../../../models/storegroup';
import {StorePreferenceConfiguration} from '../../../../../../models/storepreferenceconfiguration';
import {TaxRule} from '../../../../../../models/taxrule';
import {Website} from '../../../../../../models/website';
import {StoresService} from '../../../../../../services/stores.service';
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-add-store-configuration',
  templateUrl: './add-store-configuration.component.html',
})
export class AddStoreConfigurationComponent implements OnInit {
  @Input() websiteList: Website[];
  @Input() storeGroupList: StoreGroup[];
  @Input() storeViewList: Store[];
  @Input() languageList: Language[];
  @Input() currencyList: Currency[];
  @Input() taxRuleList: TaxRule[];
  @Input() employeeList: Employee[];
  @Input() paymentMethodsList: PaymentMethod[];
  @Input() shippingMethodsList: ShippingMethod[];
  @Output()
  onCancelBtnClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSaveBtnClick: EventEmitter<StorePreferenceConfiguration[]> = new EventEmitter<StorePreferenceConfiguration[]>();
  newStoreConfiguration: StorePreferenceConfiguration;
  selectedWebsiteId: string;
  selectedStoreGroupId: string;
  selectedLanguageId: string;
  selectedStoreViewId: string;
  selectedCurrencyId: string;
  selectedtaxRuleId: string;
  selectedEmployeeId: string;
  validationError: string = '';
  selectedShippingMethodList: ShippingMethod[];
  selectedPaymentMethodList: PaymentMethod[];
  selectedShippingMethodStringList: string[] = [];
  selectedPaymentMethodStringList: string[] = [];
  loading: boolean = false;
  constructor(private service: StoresService) {}

  ngOnInit() {
    this.newStoreConfiguration = new StorePreferenceConfiguration();
    this.selectedPaymentMethodList = new Array();
    this.selectedShippingMethodList = new Array();
    this.selectedPaymentMethodStringList = [];
    this.selectedShippingMethodStringList = [];
    if (this.currencyList.length === 1) {
      this.selectedCurrencyId = this.currencyList[0].id;
    }
  }
  setLoading(show: boolean): void {
    this.loading = show;
  }
  selectedWs(wsid: string): void {
    this.selectedWebsiteId = wsid;
  }
  selectedStoreGroup(storeGroupId: string): void {
    this.selectedStoreGroupId = storeGroupId;
  }
  selectedLanguage(languageId: string): void {
    this.selectedLanguageId = languageId;
  }
  selectedStoreView(store_id: string): void {
    this.selectedStoreViewId = store_id;
  }
  selectedCurrency(currency_id: string): void {
    this.selectedCurrencyId = currency_id;
  }
  selectedTaxRule(tax_id: string): void {
    this.selectedtaxRuleId = tax_id;
  }
  selectedEmployee(employee_id: string): void {
    this.selectedEmployeeId = employee_id;
  }
  onSaveClick(): void {
    this.validationError = '';
    if (this.selectedWebsiteId !== undefined) {
      this.newStoreConfiguration.website_id = this.selectedWebsiteId;
    }
    if (this.selectedStoreGroupId !== undefined) {
      this.newStoreConfiguration.store_group_id = this.selectedStoreGroupId;
    }
    if (this.selectedStoreViewId !== undefined) {
      this.newStoreConfiguration.store_id = this.selectedStoreViewId;
    }
    if (this.selectedtaxRuleId !== undefined) {
      this.newStoreConfiguration.tax_id = this.selectedtaxRuleId;
    }
    if (this.selectedLanguageId !== undefined) {
      this.newStoreConfiguration.language_id = this.selectedLanguageId;
    }
    if (this.selectedCurrencyId !== undefined) {
      this.newStoreConfiguration.currency_id = this.selectedCurrencyId;
    }
    if (this.selectedEmployeeId !== undefined) {
      this.newStoreConfiguration.access_permission = this.selectedEmployeeId;
    }
    if (this.isValid(this.newStoreConfiguration)) {
      this.setLoading(true);
      this.service.saveStoreConfiguration(this.newStoreConfiguration,
        this.selectedPaymentMethodList, this.selectedShippingMethodList).subscribe(res => {
          this.onSaveBtnClick.emit(res as StorePreferenceConfiguration[]);
        });
    }
  }
  isValid(sc: StorePreferenceConfiguration): boolean {

    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    const phoneNum = sc.contact_number.replace(/[^\d]/g, '');
    if (phoneNum.length < 6) {
      this.validationError = 'Contact number length should be greater than 6 and less than 11';
      return false;
    }
    if (phoneNum.length > 11) {
      this.validationError = 'Contact number length should be greater than 6 and less than 11';
      return false;
    }
    if (this.selectedPaymentMethodList.length === 0) {
      this.validationError = 'At least one payment method should be selected';
      return false;
    }
    if (this.selectedShippingMethodList.length === 0) {
      this.validationError = 'At least one shipping method should be selected';
      return false;
    }
    if (!EMAIL_REGEXP.test(sc.email)) {
      this.validationError = 'Invalid Email address';
      return false;
    }
    return true;
  }
  onCancelClick(): void {
    this.onCancelBtnClick.emit(false);
  }
  onCheckBoxShippingChange(sm: ShippingMethod, isChecked: boolean): void {
    if (isChecked) {
      this.selectedShippingMethodList.push(sm);
    } else {
      const index = this.selectedShippingMethodList.findIndex(item => item.value === sm.value);
      this.selectedShippingMethodList.splice(index, 1);
    }
    this.selectedShippingMethodStringList.splice(0, this.selectedShippingMethodStringList.length + 1);
    for (const shipping of this.selectedShippingMethodList) {
      this.selectedShippingMethodStringList.push(shipping.label);
    }
  }
  onCheckBoxPaymentChange(pm: PaymentMethod, isChecked: boolean): void {
    if (isChecked) {
      this.selectedPaymentMethodList.push(pm);
    } else {
      const index = this.selectedPaymentMethodList.findIndex(item => item.value === pm.value);
      this.selectedPaymentMethodList.splice(index, 1);
    }
    this.selectedPaymentMethodStringList.splice(0, this.selectedPaymentMethodStringList.length + 1);
    for (const payment of this.selectedPaymentMethodList) {
      this.selectedPaymentMethodStringList.push(payment.label);
    }
    // console.log(this.selectedPaymentMethodStringList);
  }

}
