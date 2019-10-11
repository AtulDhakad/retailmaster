import {CartItem} from '../models/cartitem';
import {Product} from '../models/product';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class DropshipCartService {
  private cartItems: CartItem[] = [];
  private cartItems$: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>(this.cartItems);
  private KEY: string = 'items';
  constructor() {
//    this.cartItems = JSON.parse(localStorage.getItem(this.KEY));
//    if (this.cartItems === null) {
//      localStorage.clear();
//      this.cartItems = [];
//      this.saveState();
//    }
  }

//  getCartItems(): Observable<CartItem[]> {
//    return this.cartItems$.asObservable();
//  }

//  addProductToCart(item: CartItem): void {
//    let itemId = null;
//    this.cartItems.forEach((citem, i) => {
//      if (citem.product.id === item.product.id) {
//        itemId = i;
//      }
//    });
//
//    if (itemId !== null) { // already exist
//      this.cartItems[itemId].quantity = this.cartItems[itemId].quantity + item.quantity;
//      this.cartItems[itemId].product.price_rm2 = this.addCommaToNumber(parseFloat(this.cartItems[itemId].product.price)
//        * this.cartItems[itemId].quantity);
//    } else {
//      item.product.price_rm2 = this.addCommaToNumber(parseFloat(item.product.price) * item.quantity);
//      // item.product = this.readyProduct(item.product);
//      this.cartItems.push(item);
//    }
//
//    this.cartItems$.next(this.cartItems);
//    this.saveState();
//  }
//  emptyCart() {
//    localStorage.clear();
//    this.cartItems = [];
//    this.cartItems$.next(this.cartItems);
//    this.saveState();
//  }
//  private readyProduct(product: Product): Product {
//    /*  product.price = this.addCommaToNumber(parseFloat(product.price));
//       const gst = parseFloat(product.price) * 14 / 100;
//       product.price_rm =   this.addCommaToNumber(gst);
//       product.price_rm2 = this.addCommaToNumber(parseFloat(product.price)); */
//    return product;
//  }

  private addCommaToNumber(number: number): string {
    return number.toLocaleString(undefined, {
      minimumFractionDigits: 2
    });
  }

  private saveState(): void {
    localStorage.removeItem(this.KEY);
    localStorage.setItem(this.KEY, JSON.stringify(this.cartItems));
  }
}
