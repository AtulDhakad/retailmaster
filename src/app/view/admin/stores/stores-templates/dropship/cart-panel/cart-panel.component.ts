import {CartItem} from '../../../../../../models/cartitem';
import {Product} from '../../../../../../models/product';
import {DropshipCartService} from '../../../../../../services/cart.service';
import {Utils} from '../../../../../../utils/utils';
import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dropship-store-cart-panel',
  templateUrl: './cart-panel.html'
})
export class DropshipStoreCartPanelComponent {
  @Input() baseURL: string = '';
  option1: number = undefined;
  option2: number = undefined;
  @Input() cartItems: CartItem[] = [];
  @Output() onRemoveCartItem: EventEmitter<CartItem> = new EventEmitter<CartItem>();
  @Output() onOpenView: EventEmitter<string> = new EventEmitter<string>();
  @Output() onEditProductCartItem: EventEmitter<CartItem> = new EventEmitter<CartItem>();
  editItem: CartItem;
  customPrice: number = undefined;
  discount: number = undefined;
  constructor(private router: Router, private cart: DropshipCartService) {
  }
  removeProduct(cartItem: CartItem): void {
    //  // console.log(id)
    // this.cart.removeProductFromCart(id);
    this.onRemoveCartItem.emit(cartItem);
  }
  getEditItem(item: CartItem) {
    this.editItem = item
  }

  openView(path: string): void {
    //    this.router.navigate([`/stores/external/dropship/${path}`]);
    this.onOpenView.emit(path);
  }

  addQuantity(): void {
    this.editItem.quantity++;
  }

  removeQuantity(): void {
    this.editItem.quantity--;
  }

  getTotalPrice(price: string, quantity: number): number {
    return parseFloat(price) * quantity;
  }
  editProduct() {
    if (this.option1 !== undefined) {
      this.editItem.product.price = Utils.addCommaToNumber(this.customPrice);
    } else if (this.option2 !== undefined && this.option2 === 1) {
      this.editItem.product.price = Utils.addCommaToNumber((parseFloat(this.editItem.product.price) - this.discount));
    } else if (this.option2 !== undefined && this.option2 === 2) {
      const dis_price = parseFloat(this.editItem.product.price) * (this.discount) / 100;
      this.editItem.product.price = Utils.addCommaToNumber((parseFloat(this.editItem.product.price) - dis_price));
    }
    this.onEditProductCartItem.emit(this.editItem);
    // this.cart.editProductToCart(this.editItem)
  }
}
