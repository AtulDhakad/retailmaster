import {Address} from '../../../../../models/address';
import {CartItem} from '../../../../../models/cartitem';
import {Category} from '../../../../../models/category';
import {Customer} from '../../../../../models/customer';
import {OrderDetail} from '../../../../../models/orderdetail';
import {OrderItems} from '../../../../../models/orderitems';
import {PaymentProcess} from '../../../../../models/paymentprocess';
import {Product} from '../../../../../models/product';
import {Region} from '../../../../../models/region';
import {Store} from '../../../../../models/store';
import {CustomerCredit} from '../../../../../models/customercredit';
import {DropshipStoreService} from '../../../../../services/dropship.service';
import {SharedService} from '../../../../../services/shared.service';
import {StoresService} from '../../../../../services/stores.service';
import {Utils} from '../../../../../utils/utils';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-dropship-store',
  templateUrl: './dropship.component.html'
})
export class DropshipStoreComponent implements OnInit {
  searchString: string;
  productSearchString: string;
  categories: Category[] = [];
  isCategorySelected: boolean = false;
  cartItems: CartItem[] = [];
  products: Product[] = [];
  originalProductList: Product[] = [];
  toggleSearch: boolean = false;
  selectedCustomer: Address;
  customerCredit: CustomerCredit;
  showCustomerSearch: boolean = false;
  showSelectedCustomer: boolean = false;
  taxRate: string = '';
  views = [{
    name: 'STORE',
    state: true,
    path: '/home'
  }, {
    name: 'Cart',
    state: false,
    path: '/cart'
  }, {
    name: 'Product',
    state: false,
    path: '/product'
  }, {
    name: 'Checkout',
    state: false,
    path: '/checkout'
  }];
  WARNING: string = 'WARNING';
  SUCCESS: string = 'SUCCESS';
  customers: Customer[];
  originalCustomersList: Customer[];
  stores: Store[] = [];
  store: Store;
  currentView = {};
  currentRoute: string;
  baseURL: string = '';
  storeId: any = '';
  routerSubscription: Subscription;
  message: string;
  alertType: string;
  regionList: Region[];
  selectedRegionId: string;
  viewProduct: Product;
  loading: boolean = false;
  selectedOrderDetails: OrderDetail;
  selectedOrderItems: OrderItems[];
  selectedOrderPayments: PaymentProcess[] = [];
  selectedAddress: Address[] = [];
  billingAddress: Address = new Address();
  shipingAddress: Address = new Address();
  isSaleHistory: boolean = false;
  currentStoreName = '';
  constructor(private router: Router, private activated: ActivatedRoute, public dropshipService: DropshipStoreService, private sharedService: SharedService,
    private storeService: StoresService) {
    activated.params.subscribe(val => {
      // put the code from `ngOnInit` here
      //      if (val.storeName !== undefined) {
      //        this.loadComponent(val.storeName);
      //      }

      // console.log(val);
    });
    // console.log('router', router);
    this.routerSubscription = this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        this.currentRoute = this.router.url;
        // console.log('this.currentRoute', this.currentRoute);
        if (this.currentRoute !== undefined && this.currentStoreName === '') {
          this.currentStoreName = this.currentRoute.split('/')[3];
          console.log('current route', this.currentRoute);
          this.loadComponent(this.currentStoreName);
        }
      }
    });
  }
  setLoading(show: boolean): void {
    this.loading = show;
  }
  ngOnInit() {
    //    if (this.currentRoute !== undefined) {
    //      const currentStoreName = this.currentRoute.split('/')[3];
    //      console.log('current route', this.currentRoute);
    //      this.loadComponent(currentStoreName);
    //    }
  }

  loadComponent(storeName: string): void {
    this.isSaleHistory = false
    this.isCategorySelected = false;
    this.message = '';
    this.alertType = '';
    this.setLoading(true);
    if (this.currentRoute.includes('external')) {
      this.isSaleHistory = false;
      this.getStoreDetailsByStoreName(storeName);
    } else {
      this.isSaleHistory = true;
      // console.log('from sales order', currentStoreName);
      this.reloadOrder(storeName);
    }

  }
  getStoreDetailsByStoreName(storeName): void {
    this.dropshipService.getStorebyStoreName(storeName).subscribe(res => {
      this.store = res[0] as Store;
      this.activateView();
    });
  }
  showProduct(event: any): void {
    this.viewProduct = event as Product;
    this.openView('product');
    this.sharedService.emit(false);
  }
  openView(event: string): void {
    if (event === 'new') {
      this.cartItems = [];
      this.products = [];
      this.originalProductList = [];
      this.customers = [];
      this.searchString = '';
      this.dropshipService.setCustomerAddress(new Address());
      window.scroll(0, 0);
      // this.dropshipService.customerAddress$ = new Observable<Address>();
      //  this.router.navigate(['stores/external/' + this.currentRoute.split('/')[3] + '/home']);
      event = 'home';
    }

    (this.views || []).forEach(view => {
      if (view.path.indexOf(event) !== -1) {
        this.currentView = view;
        view.state = true;
      } else {
        view.state = false;
      }
    });
    // console.log('event ', event);
    if (event === 'home') {
      this.toggleSearch = true;
    } else {
      this.toggleSearch = false;
    }
  }
  activateView(): void {
    (this.views || []).forEach(view => {
      if (this.currentRoute.includes(view.path)) {
        this.currentView = view;
        view.state = true;
      } else {
        view.state = false;
      }
    });

    if (this.store !== undefined && this.store.group_id !== undefined) {
      this.dropshipService.getCategories(this.store.group_id).subscribe(catres => {
        this.categories = catres;

        this.dropshipService.getTaxRateByStoreId(this.store.store_id).subscribe(res => {
          if (res !== undefined && res[0] !== undefined) {
            this.taxRate = res[0].rate;
          } else {
            this.taxRate = '0.00';
          }
          if (this.isSaleHistory) {
            // console.log('from sales history')
            this.openView('cart');
          }
          this.setLoading(false);
        });
      });
    }

    //  // console.log('this.storename', this.storeName);

    let url: any = this.currentRoute.split('/');
    url.pop();
    url = `/${url.join('/')}`;
    this.baseURL = url;
    console.log('this.baseUrl', this.baseURL);
  }
  onCustomerSearchClick(event: string): void {
    this.showCustomerSearch = true;
  }
  onCustomerSearchClose(): void {
    this.showCustomerSearch = false;
  }

  //  ngOnDestroy(): void {
  //    if (this.routerSubscription) {
  //      this.routerSubscription.unsubscribe();
  //    }
  //  }
  onProductSearch(event: any): void {
    this.productSearchString = event;
    this.products = [];
    if (this.productSearchString !== '' || this.productSearchString.length > 3) {
      //      this.showMessage('Please enter more than 3 character to search', this.WARNING);
      //      return;
      // }
      if (this.isCategorySelected === false) {
        this.setLoading(true);
        this.dropshipService.getProductBySearch(this.productSearchString).subscribe(res => {
          // console.log(res);
          this.products = res as Product[];
          if (this.products.length === 1) {
            const singleCartItem: CartItem = {
              quantity: 1,
              product: this.products[0]

            }
            this.addProductToCart(singleCartItem);
          }
          this.setLoading(false);
        });
      } else if (this.isCategorySelected === true) {
        this.products = this.originalProductList.filter(item => {
          return item.sku.toLowerCase().includes(this.productSearchString.toLowerCase()) || item.name.toLowerCase().includes(this.productSearchString.toLowerCase());
        });
        if (this.products.length === 1) {
          const singleCartItem: CartItem = {
            quantity: 1,
            product: this.products[0]

          }
          this.addProductToCart(singleCartItem);
        }
      }
      this.searchString = '';
      this.productSearchString = '';
      // console.log('products length', this.products.length);

    } else {
      if (this.isCategorySelected === true) {
        this.products = this.originalProductList;
      }
    }
  }
  onKeyUp(event: any): void {
    if (event.keyCode === 13) {
      if (this.searchString !== undefined && this.searchString.length > 3) {
        this.onCustomerSearch();
      } else {
        this.showMessage('Please enter more than 3 characters to search', this.WARNING)
      }
    }
  }
  onSelectedRegion(selectedId: string): void {
    this.selectedRegionId = selectedId;
  }
  onCustomerSearch(): void {
    if (this.searchString !== undefined && this.searchString.length > 3) {
      this.setLoading(true);
      this.dropshipService.getCustomers(this.searchString).subscribe(custres => {
        this.customers = custres;
        this.originalCustomersList = custres;
        this.showCustomerSearch = true;
        this.setLoading(false);
        if (this.customers.length === 0) {
          this.showMessage('No matching records found', this.WARNING)
        }
        this.storeService.getRegions().subscribe(regionList => {
          this.regionList = regionList.filter(item => item.country_id === 'MY');
          // console.log('this.regionList', this.regionList);
        });
      });
    } else {
      this.showMessage('Please enter more than 3 characters to search', this.WARNING)
    }
  }
  onCategorySelected(event: Category): void {
    if (event.id) {
      this.isCategorySelected = true;
      this.products = [];
      this.originalProductList = [];
      this.setLoading(true);
      this.dropshipService.getProducts(event.id).subscribe(res => {
        // console.log(res);
        this.originalProductList = res as Product[];
        this.products = this.originalProductList;
        this.setLoading(false);
      });
    }
  }
  onCustomerSelected(customer: Customer): void {
    this.setLoading(true);
    this.dropshipService.getCustomerById(customer.entity_id).subscribe(res => {
      this.selectedCustomer = undefined;
      this.customerCredit = undefined;
      this.selectedCustomer = res[0].Customer[0] as Address;
      this.customerCredit = res[1].CustomerStoreCredit[0] as CustomerCredit;
      this.showSelectedCustomer = true;
      this.showCustomerSearch = false;
      // console.log('this.selectedCustomer', this.selectedCustomer);
      this.setLoading(false);
    });
  }
  onShowSelectedCustomerPopupClose(): void {
    this.showSelectedCustomer = false;
  }
  onShowSelectedCustomer(): void {
    this.dropshipService.setCustomerAddress(this.selectedCustomer);
    this.dropshipService.setCustomerCredit(this.customerCredit);
    this.showSelectedCustomer = false;
  }
  onEmptyCart($event): void {
    this.cartItems = [];
  }
  onNewCustomerClick(): void {
    this.selectedCustomer = new Address();
  }
  addProductToCart(item: CartItem): void {
    let itemId = null;
    this.cartItems.forEach((citem, i) => {
      if (citem.product.id === item.product.id) {
        itemId = i;
      }
    });

    if (itemId !== null) { // already exist
      this.cartItems[itemId].quantity = this.cartItems[itemId].quantity + item.quantity;
      this.cartItems[itemId].product.price_rm2 = Utils.addCommaToNumber(parseFloat(this.cartItems[itemId].product.price)
        * this.cartItems[itemId].quantity);
    } else {
      item.product.price_rm2 = Utils.addCommaToNumber(parseFloat(item.product.price) * item.quantity);
      this.cartItems.push(item);
    }
    this.openView('home');
  }
  removeProductFromCart(cartItem: CartItem): void {
    this.cartItems.forEach((item, i) => {
      if (item.product.id === cartItem.product.id) {
        this.cartItems.splice(i, 1);
      }
    });
    // this.cartItems$.next(this.cartItems);
    // this.saveState();
  }
  editProductToCart(item: CartItem) {
    this.cartItems.forEach((citem, i) => {
      if (citem.product.id === item.product.id) {
        this.cartItems[i].quantity = item.quantity;
        this.cartItems[i].product.price = Utils.addCommaToNumber(parseFloat(this.cartItems[i].product.price));
        // const gst = parseFloat(this.cartItems[i].product.price) * 14 / 100;
        //  this.cartItems[i].product.price_rm =   this.addCommaToNumber(gst);
        this.cartItems[i].product.price_rm2 = Utils.addCommaToNumber(parseFloat(this.cartItems[i].product.price) * item.quantity);
      }
    });
  }
  showMessage(msg: string, alertType: string): void {
    this.message = msg;
    this.alertType = alertType;
    setTimeout(() => {
      this.message = '';
    }, Utils.MILISECONDS);
  }
  reloadOrder(incrementId: string): void {
    this.dropshipService.getOrderDetails(incrementId).subscribe(res => {
      // console.log('res', res);
      this.selectedOrderDetails = res[0].OrderDetails[0] as OrderDetail;
      this.selectedOrderItems = res[1].OrderItems as OrderItems[];
      this.selectedOrderPayments = res[2].OrderPayment as PaymentProcess[];
      this.selectedAddress = res[3].OrderAddress as Address[];
      this.getStoreDetailsByStoreName(this.selectedOrderDetails.store_name);
      let cartItem: CartItem = null;
      let product: Product = null;
      this.cartItems = [];
      for (const orderItem of this.selectedOrderItems) {
        cartItem = new CartItem();
        product = new Product();
        cartItem.quantity = +orderItem.quantity;
        product.id = orderItem.product_id;
        product.name = orderItem.name;
        product.description = orderItem.description;
        product.sku = orderItem.sku;
        product.image = orderItem.image;
        product.price = orderItem.price;
        product.special_price = orderItem.special_price;
        product.category_id = orderItem.category_id;
        cartItem.product = product;

        this.cartItems.push(cartItem);

      }
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
    this.selectedCustomer = this.billingAddress;
    this.dropshipService.setCustomerAddress(this.billingAddress);
    // console.log('this.billingAddress', this.billingAddress);
    // console.log('this.shipingAddress', this.shipingAddress);
  }

}

