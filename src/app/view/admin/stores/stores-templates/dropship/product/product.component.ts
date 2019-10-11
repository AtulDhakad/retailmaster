import {CartItem} from '../../../../../../models/cartitem';
import {Product} from '../../../../../../models/product';
import {DropshipCartService} from '../../../../../../services/cart.service';
import {DropshipStoreService} from '../../../../../../services/dropship.service';
import {Component, Input, Output, OnDestroy, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-dropship-store-product',
  templateUrl: './product.html'
})
export class DropshipStoreProductComponent {

  @Input() baseURL: string = '';
  paramSubscription: Subscription;
  productSubscription: Subscription;
  @Output() onAddProductToCartClick: EventEmitter<CartItem> = new EventEmitter<CartItem>();
  productId: number;
  @Input() product: Product;
  quantity: number = 1;
  cartItem: CartItem;
  message: boolean = false;
  constructor(
    private activated: ActivatedRoute,
    private storeService: DropshipStoreService,
    private cart: DropshipCartService) {
  }

  addQuantity(): void {
    this.quantity++;
  }

  removeQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addtoCart(product: Product) {
    this.cartItem = {
      quantity: this.quantity,
      product: product
    }
    this.onAddProductToCartClick.emit(this.cartItem);
    // this.cart.addProductToCart(this.cartItem);
    this.message = true;
  }

  ngOnDestroy() {
//    this.paramSubscription.unsubscribe();
//    this.productSubscription.unsubscribe();
  }

}
