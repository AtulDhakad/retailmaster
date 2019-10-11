import {CartItem} from '../../../../../../models/cartitem';
import {Product} from '../../../../../../models/product';
import {Store} from '../../../../../../models/store';
import {DropshipCartService} from '../../../../../../services/cart.service';
import {DropshipStoreService} from '../../../../../../services/dropship.service';
import {Component, Input, Output, OnDestroy, EventEmitter} from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';

import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-dropship-store-home',
  templateUrl: './home.html'
})
export class DropshipStoreHomeComponent implements OnDestroy {
  @Input() baseURL: string = '';
  @Input() storeData: Store;
  @Input() products: Product[];
  @Input() cartItems: CartItem[];
  @Output() onRemoveCartItem: EventEmitter<CartItem> = new EventEmitter<CartItem>();
  @Output() onAddProductToCartClick: EventEmitter<CartItem> = new EventEmitter<CartItem>();
  @Output() onEditProductCartItem: EventEmitter<CartItem> = new EventEmitter<CartItem>();
  @Output() onOpenView: EventEmitter<string> = new EventEmitter<string>();
  @Output() onViewProduct: EventEmitter<any> = new EventEmitter<any>();
  private paramsSubscription: Subscription;
  category_id: number;
  quickViewProduct: any = {};
  quantity: number = 1;
  cartProducts: CartItem[] = [];
  cartItem: CartItem;
  constructor(
    private router: Router,
    private activated: ActivatedRoute,
    private service: DropshipStoreService,
    private cart: DropshipCartService
  ) {
    if (!this.paramsSubscription) {
      this.paramsSubscription = this.activated.params.subscribe(params => {
        this.category_id = params['category_id'] ? params['category_id'] : null;
        this.init();
      });
    }
  }

  init(): void {
    //    this.cart.getCartItems().subscribe(res => {
    //      this.cartProducts = res;
    //    })
  }
  onProductClick(product: Product) {
    this.onViewProduct.emit(product);
  }
  navigate(path: string): void {
    // console.log('productUrl', '/stores/external/' + this.storeData.name.trim().toLowerCase() + '/' + path);
    this.router.navigate([`/stores/external/${this.storeData.name.trim().toLowerCase()}/${path}`]);
  }

  ngOnDestroy(): void {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }


  increment() {
    if (this.quantity < 100) {
      this.quantity++;
    }
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  addtoCart(product) {
    // console.log('product', product);
    this.cartItem = {
      quantity: this.quantity,
      product: product
    }
    //  this.cart.addProductToCart(this.cartItem);
    this.onAddProductToCartClick.emit(this.cartItem);
  }
  removeItem(event: CartItem) {
    this.onRemoveCartItem.emit(event);
  }
  editProductCartItem(event: CartItem) {
    this.onEditProductCartItem.emit(event);
  }
  openView(event: string) {
    this.onOpenView.emit(event);
  }
  viewProduct(): void {
    this.onViewProduct.emit(this.quickViewProduct);
  }
}
