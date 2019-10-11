import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Bank} from '../models/bank';
import {Country} from '../models/country';
import {Currency} from '../models/currency';
import {Employee} from '../models/employee';
import {EmployeeRole} from '../models/employeerole';
import {Language} from '../models/language';
import {PaymentMethod} from '../models/paymentmethod';
import {PerformanceTargetStore} from '../models/performancetargetstore';
import {Region} from '../models/region';
import {ShippingMethod} from '../models/shippingmethod';
import {Store} from '../models/store';
import {StoreConfiguration} from '../models/storeconfiguration';
import {StoreGroup} from '../models/storegroup';
import {StorePreferenceConfiguration} from '../models/storepreferenceconfiguration';
import {TaxRule} from '../models/taxrule';
import {TaxRuleClass} from '../models/taxruleclass';
import {Website} from '../models/website';
import {Utils} from '../utils/utils';
import {Observable} from 'rxjs/Observable';
import { ConfigService } from './config.service';

@Injectable()
export class StoresService {
  constructor(private http: HttpClient) {}

  getStoreConfigurationList(): Observable<any> {
    return this.http.get(`${ConfigService.STORE_URL_VIEW}/store/getStoreConfigurationList`)
      .map(res => res)
      .catch(error =>
        Observable.throw(error)
      );
  }
  getEmployees(): Observable<any> {
    return this.http.get(`${ConfigService.STORE_URL_VIEW}/store/employees`)
      .map(res => res)
      .catch(error =>
        Observable.throw(error)
      );
  }
  saveemployee(employee: Employee): Observable<Employee> {
    // createEmployee($name, $role, $loginname, $password, $status, $store_id)
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/store/createEmployee`,
      {
        name: employee.name, role: employee.role, loginname: employee.loginname, password: employee.password,
        status: employee.status, store_id: employee.store_id
      })
      .map(res => res[0] as Employee)
      .catch(error => this.handleError(error));
  }
  updateemployee(employee: Employee): Observable<Employee> {
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/store/updateEmployee`,
      {
        id: employee.id, name: employee.name, role: employee.role, loginname: employee.loginname, password: employee.password,
        status: employee.status, store_id: employee.store_id
      })
      .map(res => res[0] as Employee)
      .catch(error => this.handleError(error));
  }
  deleteEmployee(employee: Employee): Observable<any> {
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/store/deleteEmployee`, {id: employee.id})
      .map(res => res[0])
      .catch(error => this.handleError(error));
  }
  getStores(): Observable<Store[]> {
    // http://api.retailmaster.xyz/index.php/rest/V1/store/storeViews
    return this.http.get(`${ConfigService.STORE_URL_VIEW}/store/getStoreList`)
      .map(res => res as Store[])
      .catch(error =>
        Observable.throw(error)
      );
  }
  getWebsiteById(wsid: string): Observable<Website> {
    return this.http.get(`${ConfigService.STORE_URL_VIEW}/store/websites/` + wsid)
      .map(res => res as Website)
      .catch(error =>
        Observable.throw(error)
      );
  }
  getWebsite(): Observable<Website[]> {
    return this.http.get(`${ConfigService.STORE_URL_VIEW}/store/getWebsiteList`)
      .map(res => res as Website[])
      .catch(error =>
        Observable.throw(error)
      );
  }
  getStoreGroupById(groupId: string): Observable<any> {
    return this.http.get(`${ConfigService.STORE_URL_VIEW}/store/storeGroups/` + groupId)
      .map(res => res)
      .catch(error =>
        Observable.throw(error)
      );
  }
  getStoreGroup(): Observable<StoreGroup[]> {
    return this.http.get(`${ConfigService.STORE_URL_VIEW}/store/getStoreGroupList`)
      .map(res => res as StoreGroup[])
      .catch(error =>
        Observable.throw(error)
      );
  }

  deleteWebsite(st: Website): Observable<any> {
    return this.http.delete(`${ConfigService.STORE_URL_VIEW}/store/websites/` + st.website_id)
      .map(res => res)
      .catch(error => this.handleError(error));
  }
  private handleError(error: any): Observable<any> {
    // console.log(error.message || error);
    return error.message;
  }
  saveWebSite(ws: Website): Observable<Website> {
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/store/websites`,
      {name: ws.name, code: ws.code, sort_order: ws.sort_order})
      .map(res => res as Website)
      .catch(error => this.handleError(error));
  }
  updateWebSite(ws: Website): Observable<Website> {
    // $website_id, $name, $code, $sort_order, $default_group_id, $is_default
    return this.http.put(`${ConfigService.STORE_URL_VIEW}/store/updatewebsite`,
      {
        website_id: ws.website_id, name: ws.name, code: ws.code, sort_order: ws.sort_order,
        default_group_id: ws.default_group_id, is_default: 0
      })
      .map(res => res as Website)
      .catch(error => this.handleError(error));
  }
  saveStoreView(st: Store): Observable<Store> {
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/store/storeViews`,
      {group_id: st.group_id, name: st.name, code: st.code, is_active: st.is_active, sort_order: st.sort_order})
      .map(res => res as Store)
      .catch(error => this.handleError(error));
  }
  updateStoreViews(st: Store): Observable<Store> {
    // $store_id, $group_id, $name, $code, $is_active, $sort_order
    return this.http.put(`${ConfigService.STORE_URL_VIEW}/store/updateStoreViews`,
      {
        store_id: st.store_id, group_id: st.group_id, name: st.name, code: st.code,
        is_active: st.is_active, sort_order: st.sort_order
      })
      .map(res => res as Store)
      .catch(error => this.handleError(error));
  }
  deleteStoreview(st: Store): Observable<any> {
    return this.http.delete(`${ConfigService.STORE_URL_VIEW}/store/storeViews/` + st.store_id).map(res => res)
      .catch(error => this.handleError(error));
  }
  getStoreById(storeid: string): Observable<Store> {
    return this.http.get(`${ConfigService.STORE_URL_VIEW}/store/storeViews/` + storeid)
      .map(res => res as Store)
      .catch(error =>
        Observable.throw(error)
      );
  }
  saveStoreGroup(st: StoreGroup): Observable<StoreGroup> {
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/store/storeGroups`,
      {website_id: st.website_id, name: st.name, root_category_id: 0})
      .map(res => res as StoreGroup)
      .catch(error => this.handleError(error));
  }
  updateStoreGroup(st: StoreGroup): Observable<StoreGroup> {
    // $group_id, $name, $root_category_id, $default_store_id
    // $group_id, $name, $root_category_id, $default_store_id
    return this.http.put(`${ConfigService.STORE_URL_VIEW}/store/updateStoreGroups`,
      {group_id: st.group_id, name: st.name, root_category_id: st.root_category_id, default_store_id: st.default_store_id})
      .map(res => res as StoreGroup)
      .catch(error => this.handleError(error));
  }
  // store/storeGroups/
  deleteStore(st: StoreGroup): Observable<any> {
    return this.http.delete(`${ConfigService.STORE_URL_VIEW}/store/storeGroups/` + st.group_id).map(res => res)
      .catch(error => this.handleError(error));
  }
  getBankList(): Observable<Bank[]> {
    return this.http.get(`${ConfigService.STORE_URL_VIEW}/store/banks`)
      .map(res => res as Bank[])
      .catch(error =>
        Observable.throw(error)
      );
  }
  updateBank(selectedbnk: Bank): Observable<Bank> {
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/store/updatebank`,
      {bank_id: selectedbnk.bank_id, name: selectedbnk.name, is_active: selectedbnk.is_active})
      .map(res => res as Bank)
      .catch(error =>
        Observable.throw(error)
      );
  }
  saveBank(bnk: Bank): Observable<Bank> {
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/store/addbank`,
      {name: bnk.name})
      .map(res => res as Bank)
      .catch(error =>
        Observable.throw(error)
      );
  }
  setBankSelected(banks: Bank[]): Observable<Bank[]> {
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/store/banks/set-selected`,
      {banks: banks})
      .map(res => res as Bank[])
      .catch(error =>
        Observable.throw(error)
      );
  }
  deleteSelectedBank(banks: Bank[]): Observable<Bank[]> {
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/store/banks/deleteselected`,
      {banks: banks})
      .map(res => res as Bank[])
      .catch(error =>
        Observable.throw(error)
      );
  }
  getLanguageList(): Observable<Language[]> {
    return this.http.get(`${ConfigService.STORE_URL_VIEW}/store/languages`)
      .map(res => res as Language[])
      .catch(error =>
        Observable.throw(error)
      );
  }
  saveLanguage(lang: Language): Observable<Language> {
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/store/addLanguage`,
      {language: lang.name, is_active: lang.is_active})
      .map(res => res as Language)
      .catch(error =>
        Observable.throw(error)
      );
  }
  updateLanguage(lang: Language): Observable<Language> {
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/store/updateLanguage`,
      {lang_id: lang.lang_id, name: lang.name, is_active: lang.is_active})
      .map(res => res as Language)
      .catch(error =>
        Observable.throw(error)
      );
  }
  setLanguageSelected(languageList: Language[]): Observable<Language[]> {
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/store/languages/set-selected`,
      {languages: languageList})
      .map(res => res as Language[])
      .catch(error =>
        Observable.throw(error)
      );
  }
  deleteSelectedLanguage(languageList: Language[]): Observable<Language[]> {
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/store/languages/deleteselected`,
      {languages: languageList})
      .map(res => res as Language[])
      .catch(error =>
        Observable.throw(error)
      );
  }
  getCurrencyList(): Observable<Currency[]> {
    return this.http.get(`${ConfigService.STORE_URL_VIEW}/store/currency`)
      .map(res => res as Currency[])
      .catch(error =>
        Observable.throw(error)
      );
  }
  updateCurrency(selectedCur: Currency): Observable<Currency> {
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/store/updatecurrency`,
      // $id, $name, $code, $symbol, $decimal
      {id: selectedCur.id, name: selectedCur.name, code: selectedCur.code, symbol: selectedCur.symbol, decimal: selectedCur.decimalvalue})
      .map(res => res as Currency)
      .catch(error =>
        Observable.throw(error)
      );
  }
  saveCurrency(cur: Currency): Observable<Currency> {
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/store/addcurrency`,
      {name: cur.name, code: cur.code, symbol: cur.symbol, decimal: cur.decimalvalue})
      .map(res => res as Currency)
      .catch(error =>
        Observable.throw(error)
      );
  }
  deleteSelectedCurrency(id: string): Observable<Currency[]> {
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/store/currency/deleteselected`,
      {id: id})
      .map(res => res as Currency[])
      .catch(error =>
        Observable.throw(error)
      );
  }
  getShippingMethodList(): Observable<ShippingMethod[]> {
    return this.http.get(`${ConfigService.STORE_URL_VIEW}/store/shippinglist`)
      .map(res => res as ShippingMethod[])
      .catch(error =>
        Observable.throw(error)
      );
  }
  updateShippingMethod(shippingMethod: ShippingMethod): Observable<ShippingMethod> {
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/store/updateshipping`,
      {shipping_id: shippingMethod.shipping_id, name: shippingMethod.name, is_active: shippingMethod.is_active})
      .map(res => res as ShippingMethod)
      .catch(error =>
        Observable.throw(error)
      );
  }
  saveShippingMethod(shippingMethod: ShippingMethod): Observable<ShippingMethod> {
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/store/addshipping`,
      {name: shippingMethod.name, is_active: shippingMethod.is_active})
      .map(res => res as ShippingMethod)
      .catch(error =>
        Observable.throw(error)
      );
  }
  setShippingMethodSelected(shippingmethods: ShippingMethod[]): Observable<ShippingMethod[]> {
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/store/shippingmethods/set-selected`,
      {shippingMethods: shippingmethods})
      .map(res => res as ShippingMethod[])
      .catch(error =>
        Observable.throw(error)
      );
  }
  deleteSelectedShippingMethod(shippingmethods: ShippingMethod[]): Observable<ShippingMethod[]> {
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/store/shippingmethods/deleteselected`,
      {shippingMethods: shippingmethods})
      .map(res => res as ShippingMethod[])
      .catch(error =>
        Observable.throw(error)
      );
  }
  getPaymentMethodList(): Observable<PaymentMethod[]> {
    return this.http.get(`${ConfigService.STORE_URL_VIEW}/store/paymentlist`)
      .map(res => res as PaymentMethod[])
      .catch(error =>
        Observable.throw(error)
      );
  }
  updatePaymentMethod(paymentMethod: PaymentMethod): Observable<PaymentMethod> {
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/store/updatepayment`,
      {payment_id: paymentMethod.payment_id, name: paymentMethod.name, is_active: paymentMethod.is_active})
      .map(res => res as PaymentMethod)
      .catch(error =>
        Observable.throw(error)
      );
  }
  savePaymentMethod(paymentMethod: PaymentMethod): Observable<PaymentMethod> {
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/store/addpayment`,
      {name: paymentMethod.name, is_active: paymentMethod.is_active})
      .map(res => res as PaymentMethod)
      .catch(error =>
        Observable.throw(error)
      );
  }
  deleteSelectedPaymentMethod(paymentmethods: PaymentMethod[]): Observable<PaymentMethod[]> {
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/store/paymentmethods/deleteselected`,
      {paymentMethods: paymentmethods})
      .map(res => res as PaymentMethod[])
      .catch(error =>
        Observable.throw(error)
      );
  }
  getTaxRuleList(): Observable<TaxRule[]> {
    return this.http.get(`${ConfigService.STORE_URL_VIEW}/store/taxrules`)
      .map(res => res as TaxRule[])
      .catch(error =>
        Observable.throw(error)
      );
  }
  updateTaxRule(tr: TaxRule): Observable<TaxRule> {
    // console.log('tr', tr);
    // updateTaxrule($rule_id, $tax_country_id, $tax_region_id, $region_name,
    //  $tax_postcode, $tax_name, $tax_rate, $customer_tax_class, $product_tax_class)
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/store/updatetaxrules`,
      {
        rule_id: tr.rule_id,
        tax_country_id: tr.tax_country_id,
        tax_region_id: tr.tax_region_id,
        region_name: '',
        tax_postcode: tr.tax_postcode,
        tax_name: tr.tax_name,
        tax_rate: tr.tax_rate,
        customer_tax_class: tr.customer_tax_class,
        product_tax_class: tr.product_tax_class,
        is_active: tr.is_active
      })
      .map(res => res as TaxRule)
      .catch(error =>
        Observable.throw(error)
      );
  }
  getCountries(): Observable<Country[]> {
    return this.http.get(`${ConfigService.BASE_URL}/admin/countries`)
      .map(res => res as Country[])
      .catch(error =>
        Observable.throw(error)
      );
  }
  getRegions(): Observable<Region[]> {
    return this.http.get(`${ConfigService.BASE_URL}/admin/regions`)
      .map(res => res as Region[])
      .catch(error =>
        Observable.throw(error)
      );
  }
  getTaxRuleClass(): Observable<TaxRuleClass[]> {
    return this.http.get(`${ConfigService.STORE_URL_VIEW}/store/gettaxruleclasses`)
      .map(res => res as TaxRuleClass[])
      .catch(error =>
        Observable.throw(error)
      );
  }
  saveTaxRule(tr: TaxRule): Observable<TaxRule> {
    // console.log('tr ');
    // console.log(tr);
    // $tax_country_id, $tax_region_id, $region_name, $tax_postcode, $tax_name, $tax_rate, $customer_tax_class, $product_tax_class
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/store/createtaxrules`,
      {
        tax_country_id: tr.tax_country_id,
        tax_region_id: tr.tax_region_id,
        region_name: '',
        tax_postcode: tr.tax_postcode,
        tax_name: tr.tax_name,
        tax_rate: tr.tax_rate,
        customer_tax_class: tr.customer_tax_class,
        product_tax_class: tr.product_tax_class,
        is_active: tr.is_active
      })
      .map(res => res as TaxRule)
      .catch(error =>
        Observable.throw(error)
      );
  }
  getStorePreferenceConfiguration(): Observable<any> {
    return this.http.get(`${ConfigService.STORE_URL_VIEW}/storeconfiguration/getList`)
      .map(res => res)
      .catch(error =>
        Observable.throw(error)
      );
  }
  //  getPaymentMethodForStoreConfiguration(store_config_id: string): Observable<PaymentMethod[]> {
  //    return this.http.get(`${ConfigService.STORE_URL_VIEW}/storeconfiguration/getPaymentMethodsByStoreConfiguration/` + store_config_id)
  //      .map(res => res as PaymentMethod[])
  //      .catch(error =>
  //        Observable.throw(error)
  //      );
  //  }
  //  getShippingMethodForStoreConfiguration(store_config_id: string): Observable<ShippingMethod[]> {
  //    return this.http.get(`${ConfigService.STORE_URL_VIEW}/storeconfiguration/getShippingMethodsByStoreConfiguration/` + store_config_id)
  //      .map(res => res as ShippingMethod[])
  //      .catch(error =>
  //        Observable.throw(error)
  //      );
  //  }
  saveStoreConfiguration(storeConfiguration: StorePreferenceConfiguration,
    paymentmethods: PaymentMethod[], shippingmethods: ShippingMethod[]): Observable<StorePreferenceConfiguration[]> {
    // $website_id, $store_group_id, $store_id, $name, $address, $url, $contact_number, $email, $tax_id
    // $custom_order_number, $custom_order_email1, $custom_order_email2, $language_id, $currency_id,
    //  $access_permission, $paymentMethods, $shippingMethods
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/storeconfiguration/createStoreConfiguration`,
      {
        website_id: storeConfiguration.website_id,
        store_group_id: storeConfiguration.store_group_id,
        store_id: storeConfiguration.store_id,
        name: storeConfiguration.name,
        address: storeConfiguration.address,
        url: storeConfiguration.url,
        contact_number: storeConfiguration.contact_number,
        email: storeConfiguration.email,
        tax_id: storeConfiguration.tax_id,
        custom_order_number: storeConfiguration.custom_order_number,
        sequence_number: storeConfiguration.sequence_number,
        suffix: storeConfiguration.suffix,
        language_id: storeConfiguration.language_id,
        currency_id: storeConfiguration.currency_id,
        access_permission: storeConfiguration.access_permission,
        paymentMethods: paymentmethods,
        shippingMethods: shippingmethods
      })
      .map(res => res as StorePreferenceConfiguration[])
      .catch(error =>
        Observable.throw(error)
      );
  }
  deleteStoreConfiguration(storeConfiguration: StorePreferenceConfiguration): Observable<StorePreferenceConfiguration> {
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/storeconfiguration/deleteStoreConfiguration`,
      {store_config_id: storeConfiguration.store_config_id})
      .map(res => res as StorePreferenceConfiguration)
      .catch(error =>
        Observable.throw(error)
      );
  }
  updateStoreConfiguration(storeConfiguration: StorePreferenceConfiguration,
    paymentmethods: PaymentMethod[], shippingmethods: ShippingMethod[]): Observable<StorePreferenceConfiguration> {
    // $store_config_id, $website_id, $store_group_id, $store_id, $name, $address, $url,
    // $contact_number, $email, $tax_id, $custom_order_number, $custom_order_email1,
    // $custom_order_email2, $language_id, $currency_id, $access_permission, $paymentMethods, $shippingMethods
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/storeconfiguration/updateStoreConfiguration`,
      {
        store_config_id: storeConfiguration.store_config_id,
        website_id: storeConfiguration.website_id,
        store_group_id: storeConfiguration.store_group_id,
        store_id: storeConfiguration.store_id,
        name: storeConfiguration.name,
        address: storeConfiguration.address,
        url: storeConfiguration.url,
        contact_number: storeConfiguration.contact_number,
        email: storeConfiguration.email,
        tax_id: storeConfiguration.tax_id,
        custom_order_number: storeConfiguration.custom_order_number,
        sequence_number: storeConfiguration.sequence_number,
        suffix: storeConfiguration.suffix,
        language_id: storeConfiguration.language_id,
        currency_id: storeConfiguration.currency_id,
        access_permission: storeConfiguration.access_permission,
        paymentMethods: paymentmethods,
        shippingMethods: shippingmethods
      })
      .map(res => res as StorePreferenceConfiguration)
      .catch(error =>
        Observable.throw(error)
      );
  }

  getEmployeeRoleList(): Observable<EmployeeRole[]> {
    return this.http.get(`${ConfigService.STORE_URL_VIEW}/store/employeeRolelist`)
      .map(res => res as EmployeeRole[])
      .catch(error =>
        Observable.throw(error)
      );
  }
  updateEmployeeRole(employeeRole: EmployeeRole): Observable<EmployeeRole> {
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/store/updateEmployeeRole`,
      {employee_role_id: employeeRole.employee_role_id, name: employeeRole.name})
      .map(res => res as EmployeeRole)
      .catch(error =>
        Observable.throw(error)
      );
  }
  saveEmployeeRole(employeeRole: EmployeeRole): Observable<EmployeeRole> {
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/store/addEmployeeRole`,
      {name: employeeRole.name})
      .map(res => res as EmployeeRole)
      .catch(error =>
        Observable.throw(error)
      );
  }
  setEmployeeRoleSelected(employeeRoles: EmployeeRole[]): Observable<EmployeeRole[]> {
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/store/employeeroles/set-selected`,
      {employeeRoles: employeeRoles})
      .map(res => res as EmployeeRole[])
      .catch(error =>
        Observable.throw(error)
      );
  }
  deleteSelectedEmployeeRole(employeeRoles: EmployeeRole[]): Observable<EmployeeRole[]> {
    return this.http.post(`${ConfigService.STORE_URL_VIEW}/store/employeeroles/deleteselected`,
      {employeeRoles: employeeRoles})
      .map(res => res as EmployeeRole[])
      .catch(error =>
        Observable.throw(error)
      );
  }
  getLocalList(): Observable<any> {
    return this.http.get(`http://127.0.0.1/magento2/Common-Currency.json`)
      .map(res => res)
      .catch(error =>
        Observable.throw(error)
      );
  }
  getStoreCondifgurationByStoreId(store_id: string): Observable<StorePreferenceConfiguration> {
    return this.http.get(`${ConfigService.STORE_URL_VIEW}/store/StoreConfigurationByStoreId/` + store_id)
      .map(res => res as StorePreferenceConfiguration)
      .catch(error =>
        Observable.throw(error)
      );

  }
  getCheckoutData(store_id: string): Observable<any> {
    return this.http.get(`${ConfigService.STORE_URL_VIEW}/checkout/getCheckoutData/` + store_id)
      .map(res => res )
      .catch(error =>
        Observable.throw(error)
      );

  }
}
