import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Address } from '../models/address';
import { Category } from '../models/category';
import { Customer } from '../models/customer';
import { CustomerCredit } from '../models/customercredit';
import { DropshipSalesOrderDetail } from '../models/dropshipsalesorderdetail';
import { OrderDetail } from '../models/orderdetail';
import { OrderItems } from '../models/orderitems';
import { PaymentMethod } from '../models/paymentmethod';
import { PaymentProcess } from '../models/paymentprocess';
import { Product } from '../models/product';
import { ProdutStore } from '../models/produtstore';
import { SearchParam } from '../models/searchparam';
import { StockDetail } from '../models/stockdetail';
import { Store } from '../models/store';
import { HttpClient } from '@angular/common/http';
import { ShippingMethod } from '../models/shippingmethod';
import { ConfigService } from './config.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class DropshipStoreService {
    // data holders
    private productsStore: ProdutStore[] = [];
    private products: Product[] = [];
    private categories: Category[] = [];
    private stores: Store[] = [];
    private product: Product;
    cusotmerAddress: Address;
    customerCredit: CustomerCredit;
    private custAddress$: BehaviorSubject<Address> = new BehaviorSubject<Address>(this.cusotmerAddress);
    customerAddress$: Observable<Address> = this.custAddress$.asObservable();
    public custCredit$: BehaviorSubject<CustomerCredit> = new BehaviorSubject<CustomerCredit>(this.customerCredit);
    customerCredit$: Observable<CustomerCredit> = this.custCredit$.asObservable();
    private productSource$: BehaviorSubject<Product> = new BehaviorSubject<Product>(this.product);
    constructor(private http: HttpClient, private httpclient: HttpClient) { }
    getProducts(category_id: number): Observable<Product[]> {
        return this.httpclient.get(`${ConfigService.STORE_URL}/categories/${category_id}/products`)
            .map(res => res as Product[])
            .catch(error => this.handleError(error)
                // Observable.throw(error)
            );
    }
    setCustomerCredit(customerCredit: CustomerCredit) {
        this.custCredit$.next(customerCredit);
    }
    setCustomerAddress(customerAdd: Address) {
        this.custAddress$.next(customerAdd);
    }
    private handleError(error: any) {
        // // console.log('erorr', error);
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        //  // console.error(error.message);
        //  // console.log(errMsg);
        return Observable.throw(error.error.message);
    }
    getCategories(store_group_id: string): Observable<Category[]> {
        return this.httpclient.get(`${ConfigService.BASE_URL}/admin/categories?group_id=` + store_group_id)
            .map(res => res as Category[])
            .catch(error =>
                Observable.throw(error)
            );
    }


    getStores(): Observable<Store[]> {
        return this.httpclient.get(`${ConfigService.STORE_URL_VIEW}/store/getStoreList`)
            .map(res => res as Store[])
            .catch(error =>
                Observable.throw(error)
            );
    }
    getStorebyStoreName(storeName: string): Observable<Store> {
        return this.httpclient.get(`${ConfigService.STORE_URL_VIEW}/store/storeViewsByStoreName/` + storeName)
            .map(res => res as Store)
            .catch(error => Observable.throw(error));
    }
    getProductById(productId: number): Observable<Product> {
        this.http.get(`${ConfigService.STORE_URL}/product/` + productId)
            .map(res => {
                this.product = res as Product;
                this.productSource$.next(this.product[0]);
            }).subscribe();
        return this.productSource$.asObservable();
    }

    getCustomers(searchString: string): Observable<Customer[]> {
        return this.httpclient.get(`${ConfigService.STORE_URL_VIEW}/webpos/customers/` + searchString)
            .map(res => res as Customer[])
            .catch(error =>
                Observable.throw(error)
            );
    }

    getCustomerById(customerId: string): Observable<any> {
        return this.httpclient.get(`${ConfigService.STORE_URL_VIEW}/checkout/getCustomer/` + customerId)
            .map(res => {
                console.log('selected res', res);
                this.cusotmerAddress = res[0].Customer[0] as Address;
                this.customerCredit = res[1].CustomerStoreCredit[0] as CustomerCredit;
                return res;
            })
            .catch(error =>
                Observable.throw(error)
            );
    }
    getTaxRateByStoreId(store_id: string): Observable<any> {
        return this.httpclient.get(`${ConfigService.STORE_URL_VIEW}/storeconfiguration/getTaxRateByStoreId/` + store_id)
            .map(res => res)
            .catch(error => Observable.throw(error));
    }
    salesOrderUpdate(addressList: Address[], orderDetail: OrderDetail, orderItems: OrderItems[], store_config_id: string,
        paymentProcess: PaymentProcess[], shippingMethod: ShippingMethod): Observable<any> {
        //  // console.log('store_config_id', store_config_id);
        return this.httpclient.post(`${ConfigService.STORE_URL_VIEW}/checkout/updateSalesOrder`,
            {
                addresss: addressList, orderDetail: orderDetail, orderItems: orderItems,
                store_config_id: store_config_id, paymentProcess: paymentProcess, shippingMethod
            })
            .map(res => res)
            .catch(error => this.handleError(error));
    }
    checkout(addressList: Address[], orderDetail: OrderDetail, orderItems: OrderItems[], store_config_id: string,
        sequenceNumber: number, paymentProcess: PaymentProcess[], shippingMethod: ShippingMethod): Observable<any> {
        // console.log('store_config_id', store_config_id);
        return this.httpclient.post(`${ConfigService.STORE_URL_VIEW}/checkout/checkout`,
            {
                addresss: addressList, orderDetail: orderDetail, orderItems: orderItems,
                store_config_id: store_config_id, sequenceNumber: sequenceNumber, paymentProcess: paymentProcess, shippingMethod
            })
            .map(res => res)
            .catch(error => this.handleError(error));
    }
    checkAvailability(orderItems: OrderItems[], websiteId: string): Observable<any> {
        return this.httpclient.post(`${ConfigService.STORE_URL_VIEW}/product/checkAvailability`,
            { orderItems: orderItems, websiteId: websiteId })
            .map(res => res)
            .catch(error => this.handleError(error));
    }
    saveContact(addressList: Address[]): Observable<Address> {
        return this.httpclient.post(`${ConfigService.STORE_URL_VIEW}/checkout/saveContact`,
            { addresss: addressList })
            .map(res => res as Address)
            .catch(error => Observable.throw(error));
    }
    updateContact(address: Address): Observable<Address> {
        return this.httpclient.post(`${ConfigService.STORE_URL_VIEW}/checkout/updateContact`,
            { address: address })
            .map(res => res as Address)
            .catch(error => Observable.throw(error));
    }
    searchOrders(status: string, searchStr: string, dt: any, storeId: string, pagenumber: number, pageSize: number): Observable<any> {
        const searchParam: SearchParam = new SearchParam();

        if (dt !== undefined) {
            if (dt !== null) {
                searchParam.date = dt.year + '-' + dt.month + '-' + dt.day;
            }
        }

        searchParam.searchstr = searchStr;
        searchParam.storeId = storeId;
        searchParam.status = status;
        searchParam.pageNumber = pagenumber.toString();
        searchParam.pageSize = pageSize.toString();
        // console.log('Date', searchParam.date);

        return this.httpclient.post(`${ConfigService.STORE_URL_VIEW}/dropshipsalesorder/getDetails`, { searchParame: searchParam })
            //  + `/` + pagenumber.toString() + `/` + pageSize.toString())
            .map(res => res as DropshipSalesOrderDetail[])
            .catch(error => Observable.throw(error));
    }
    getOrderDetails(orderId: string): Observable<any> {
        return this.httpclient.get(`${ConfigService.STORE_URL_VIEW}/dropshipsalesorder/getOrderDetails/` + orderId)
            .map(res => res)
            .catch(error => Observable.throw(error));
    }
    deletePayment(paymentId: string, orderId: string): Observable<any> {
        return this.httpclient.post(`${ConfigService.STORE_URL_VIEW}/dropshipsalesorder/deletePayment`,
            { paymentId: paymentId, orderId: orderId })
            .map(res => res)
            .catch(error => Observable.throw(error));
    }
    getProductBySearch(productSearchString: string): Observable<Product[]> {
        return this.httpclient.get(`${ConfigService.STORE_URL}/productSearch/` + productSearchString)
            .map(res => res as Product[])
            .catch(error => this.handleError(error)
                // Observable.throw(error)
            );
    }
    cancelOrder(orderDetail: OrderDetail): Observable<any> {
        return this.httpclient.post(`${ConfigService.STORE_URL}/order/cancelOrder`, { orderDetails: orderDetail })
            .map(res => res)
            .catch(error => this.handleError(error)
                // Observable.throw(error)
            );

    }
    onAddOrderPayment(paymentProcessArr: PaymentProcess[], orderDetails: OrderDetail): Observable<PaymentProcess[]> {
        return this.httpclient.post(`${ConfigService.STORE_URL}/order/addOrderPayment`,
            { paymentProcessArr: paymentProcessArr, orderDetails: orderDetails })
            .map(res => res as PaymentProcess[])
            .catch(error => this.handleError(error)
                // Observable.throw(error)
            );
    }
    onRefund(orderDetails: OrderDetail, orderItems: OrderItems[], adjustmentAmount: number,
        shippingAmount: number, comments: string, adjustmentFee: number, grandTotal: number, subtotal: number): Observable<any> {
        //  public function refundCode($orderDetail, $orderItems, $adjustmentAmount, $shippingAmount, $comments)
        // $orderDetails, $orderItems, $adjustmentRefund, $adjustmentFees, $shippingAmount, $comments, $grandTotal
        // $orderDetails, $orderItems, $adjustmentRefund, $adjustmentFees, $shippingAmount, $comments, $grandTotal        return this.httpclient.post(`${ConfigService.STORE_URL}/order/refund`,
            {
                orderDetails: orderDetails, orderItems: orderItems,
                adjustmentRefund: adjustmentAmount, adjustmentFees: adjustmentFee, shippingAmount:
                    shippingAmount, comments: comments, grandTotal: grandTotal, subTotal: subtotal
            })
            .map(res => res)
            .catch(error => this.handleError(error)
                // Observable.throw(error)
            );
    }
}
