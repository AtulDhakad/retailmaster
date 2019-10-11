import {Currency} from '../../../../../models/currency';
import {Employee} from '../../../../../models/employee';
import {Language} from '../../../../../models/language';
import {PaymentMethod} from '../../../../../models/paymentmethod';
import {RootCategory} from '../../../../../models/rootcategory';
import {ShippingMethod} from '../../../../../models/shippingmethod';
import {Store} from '../../../../../models/store';
import {StoreConfiguration} from '../../../../../models/storeconfiguration';
import {StoreGroup} from '../../../../../models/storegroup';
import {StorePaymentConfig} from '../../../../../models/storepaymentconfig';
import {StorePreferenceConfiguration} from '../../../../../models/storepreferenceconfiguration';
import {StoreShippingConfig} from '../../../../../models/storeshippingconfig';
import {TaxRule} from '../../../../../models/taxrule';
import {Website} from '../../../../../models/website';
import {StoresService} from '../../../../../services/stores.service';
import {Utils} from '../../../../../utils/utils';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-stores-preferences',
  templateUrl: './store-preferences.html'
})
export class StoresPreferencesComponent implements OnInit {
  editStoreConfiguration: boolean = false;
  addStoreConfiguration: boolean = false;
  listStoreConfiguration: boolean = false;
  loading: boolean = false;
  selectedStoreConfiguration: StorePreferenceConfiguration;
  storePreferenceConfigurationList: StorePreferenceConfiguration[];
  selectedShippingMethodList: ShippingMethod[];
  selectedPaymentMethodList: PaymentMethod[];
  selectedShippingMethodStringList: string[] = [];
  selectedPaymentMethodStringList: string[] = [];
  websiteList: Website[];
  storeGroupList: StoreGroup[];
  storeViewList: Store[];
  languageList: Language[];
  currencyList: Currency[];
  paymentMethodsList: PaymentMethod[];
  shippingMethodsList: ShippingMethod[];
  taxRuleList: TaxRule[];
  employeeList: Employee[];
  storeShippingConfigList: StoreShippingConfig[];
  storePaymentConfigList: StorePaymentConfig[];
  rootCategoryList: RootCategory[];
  selectedWebsiteId: string;
  selectedStoreGroupId: string;
  selectedLanguageId: string;
  selectedStoreViewId: string;
  selectedCurrencyId: string;
  selectedtaxRuleId: string;
  // selectedEmployeeId: string;
  validationError: string = '';
  message: string = '';
  constructor(private service: StoresService) {}
  setLoading(show: boolean): void {
    this.loading = show;
  }
  ngOnInit() {
    this.message = '';
    this.selectedPaymentMethodStringList = [];
    this.selectedShippingMethodStringList = [];
    this.setLoading(true);
    this.getList();
  }
  getList(): void {
    this.service.getStorePreferenceConfiguration().subscribe(res => {
      // console.log(res);
      this.storePreferenceConfigurationList = res[0].StoreConfiguration;
      this.websiteList = res[1].Website;
      this.storeGroupList = res[2].StoreGroup;
      this.storeViewList = res[3].Store;
      this.languageList = res[4].Language;
      this.currencyList = res[5].Currency;
      this.paymentMethodsList = res[6].PaymentMethods;
      this.shippingMethodsList = res[7].ShipingMethods;
      this.taxRuleList = res[8].TaxRules;
      this.employeeList = res[9].RMEmployees;
      this.storeShippingConfigList = res[10].Store_Shipping_Config;
      this.storePaymentConfigList = res[11].Store_Payment_Config;
      this.rootCategoryList = res[12].Root_Categories;
      for (const spc of this.storePreferenceConfigurationList) {
        const tempcurrency = this.currencyList.find(item => item.id === spc.currency_id);
        if (tempcurrency !== undefined) {
          spc.currency_name = tempcurrency.name;
        }
        const templang = this.languageList.find(item => item.lang_id === spc.language_id);
        if (templang !== undefined) {
          spc.language_name = templang.name;
        }
        const storeGrp: StoreGroup = this.storeGroupList.find(item => item.group_id === spc.store_group_id);
        if (storeGrp !== undefined) {
          const rootCategory: RootCategory = this.rootCategoryList.find(item => item.value.toString() === storeGrp.root_category_id);
          //  // console.log('rootCategory', rootCategory);
          if (rootCategory !== undefined) {
            spc.root_category = rootCategory.label;
          } else {
            spc.root_category = '';
          }
        }
      }
      this.showView('list');
      this.setLoading(false);
    });
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
  //  selectedEmployee(employee_id: string): void {
  //    this.selectedEmployeeId = employee_id;
  //  }
  onStoreConfigurationEdit(spc: StorePreferenceConfiguration): void {
    this.selectedStoreConfiguration = spc;
    this.selectedPaymentMethodList = new Array();
    const filteredPaymentMethodConfigList: StorePaymentConfig[] = this.storePaymentConfigList.filter(item => item.store_config_id === spc.store_config_id);
    this.selectedPaymentMethodStringList = new Array();
    // console.log('filteredPaymentMethodConfigList', filteredPaymentMethodConfigList);
    for (const pmcf of filteredPaymentMethodConfigList) {
      // console.log('pmcf', pmcf);
      const tempPaymentMethod: PaymentMethod = this.paymentMethodsList.find(item => item.value === pmcf.payment_value);
      if (tempPaymentMethod !== undefined) {
        this.selectedPaymentMethodStringList.push(tempPaymentMethod.label);
        this.selectedPaymentMethodList.push(tempPaymentMethod);
      }
    }
    this.selectedShippingMethodList = new Array();
    const filteredShippingMethodConfigList: StoreShippingConfig[] = this.storeShippingConfigList.filter(item => item.store_config_id === spc.store_config_id)
    this.selectedShippingMethodStringList = new Array();
    for (const pmcf of filteredShippingMethodConfigList) {
      const tempShippingMethod: ShippingMethod = this.shippingMethodsList.find(item => item.value === pmcf.shipping_value);
      if (tempShippingMethod !== undefined) {
        this.selectedShippingMethodStringList.push(tempShippingMethod.label)
        this.selectedShippingMethodList.push(tempShippingMethod);
      }
    }
    this.showView('edit')
  }
  showView(viewName: string): void {
    if (viewName === 'list') {
      this.listStoreConfiguration = true;
      this.editStoreConfiguration = false;
      this.addStoreConfiguration = false;
    } else if (viewName === 'add') {
      this.listStoreConfiguration = false;
      this.editStoreConfiguration = false;
      this.addStoreConfiguration = true;

    } else if (viewName === 'edit') {
      this.listStoreConfiguration = false;
      this.editStoreConfiguration = true;
      this.addStoreConfiguration = false;
    }
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
  }
  removePaymentMethodTag(event: string): void {
    const index = this.selectedPaymentMethodList.findIndex(item => item.label === event);
    // console.log('index', index);
    this.selectedPaymentMethodList.splice(index, 1);
    // console.log('this.selectedPaymentMethodList', this.selectedPaymentMethodList);
  }

  removeShippingMethodTag(event: string): void {
    const index = this.selectedShippingMethodList.findIndex(item => item.label === event);
    // console.log('index', index);
    this.selectedShippingMethodList.splice(index, 1);
    // console.log('this.selectedShippingMethodList', this.selectedShippingMethodList);
  }

  onAddCancelClick(): void {
    this.showView('list');
  }
  onUpdateClick(): void {
    this.validationError = '';
    if (this.selectedWebsiteId !== undefined) {
      this.selectedStoreConfiguration.website_id = this.selectedWebsiteId;
    }
    if (this.selectedStoreGroupId !== undefined) {
      this.selectedStoreConfiguration.store_group_id = this.selectedStoreGroupId;
    }
    if (this.selectedStoreViewId !== undefined) {
      this.selectedStoreConfiguration.store_id = this.selectedStoreViewId;
    }
    if (this.selectedtaxRuleId !== undefined) {
      this.selectedStoreConfiguration.tax_id = this.selectedtaxRuleId;
    }
    if (this.selectedLanguageId !== undefined) {
      this.selectedStoreConfiguration.language_id = this.selectedLanguageId;
    }
    if (this.selectedCurrencyId !== undefined) {
      this.selectedStoreConfiguration.currency_id = this.selectedCurrencyId;
    }
    //    if (this.selectedEmployeeId !== undefined) {
    //      this.selectedStoreConfiguration.access_permission = this.selectedEmployeeId;
    //    }
    // this.storePreferenceConfigurationList = new Array();
    if (this.isValid(this.selectedStoreConfiguration)) {
      this.setLoading(true);
      this.service.updateStoreConfiguration(this.selectedStoreConfiguration,
        this.selectedPaymentMethodList, this.selectedShippingMethodList).subscribe(res => {
          this.getList();
          this.showMessage('Store configuration updated successfully');
        })
    }
  }
  onAddSaveBtnClick(event: StorePreferenceConfiguration[]) {
    this.getList();
    this.showMessage('Store configuration saved successfully');
  }
  getIsPaymentSelected(pm: PaymentMethod): boolean {
    let returnVal: boolean = false;
    if (this.selectedPaymentMethodList !== undefined) {
      for (const spm of this.selectedPaymentMethodList) {
        if (spm.value === pm.value) {
          returnVal = true;
          break;
        }
      }
    }
    return returnVal;
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
  getIsShippingSelected(sm: ShippingMethod): boolean {
    let returnVal: boolean = false;
    if (this.selectedShippingMethodList !== undefined) {
      for (const ssm of this.selectedShippingMethodList) {
        if (ssm.value === sm.value) {
          returnVal = true;
          break;
        }
      }
    }
    return returnVal;
  }
  showMessage(msg: string): void {
    this.message = msg;
    setTimeout(() => {
      this.message = '';
    }, Utils.MILISECONDS);
  }
  onDeleteClick(): void {
    this.setLoading(true);
    this.service.deleteStoreConfiguration(this.selectedStoreConfiguration).subscribe(res => {
      this.getList();
      this.showMessage('Store configuration deleted successfully');
    });
  }
}
