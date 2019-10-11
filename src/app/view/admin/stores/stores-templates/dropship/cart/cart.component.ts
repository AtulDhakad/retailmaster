import {Address} from '../../../../../../models/address';
import {CartItem} from '../../../../../../models/cartitem';
import {OrderItems} from '../../../../../../models/orderitems';
import {StockDetail} from '../../../../../../models/stockdetail';
import {Store} from '../../../../../../models/store';
import {DropshipCartService} from '../../../../../../services/cart.service';
import {DropshipStoreService} from '../../../../../../services/dropship.service';
import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BASE_URL} from '../dropship.models';
import {Utils} from '../../../../../../utils/utils';

@Component({
  selector: 'app-dropship-store-cart',
  templateUrl: './cart.html'
})
export class DropshipStoreCartComponent implements OnInit {
  loading: boolean = false;
  @Input() baseURL: string = '';
  @Input() cartItems: CartItem[] = [];
  @Input() taxRate: number = 0;
  @Input() websiteId: string;
  @Output() onRemoveCartItem: EventEmitter<CartItem> = new EventEmitter<CartItem>();
  @Output() onOpenView: EventEmitter<string> = new EventEmitter<string>();
  @Output() onEmptyCart: EventEmitter<string> = new EventEmitter<string>();
  subtotal: number = 0;
  // taxRt: number = 0;
  gst: number = 0;
  total: number = 0;
  isAllProductStockAvailable: boolean = false;
  stockDetails: StockDetail[] = [];
  constructor(private router: Router, private cart: DropshipCartService, private dropshipservice: DropshipStoreService) {
    //      this.cart.getCartItems().subscribe(res => {
    //         this.cartItems = res;
    //         this.calculateTotals();
    //      })
  }

  navigate(path: string): void {
    this.router.navigate([`${this.baseURL}${path}`]);
  }

  removeCartItem(cartItem: CartItem) {
    this.onRemoveCartItem.emit(cartItem);
    // this.cart.removeProductFromCart(id);
  }

  addQuantity(key: number) {
    this.isAllProductStockAvailable = false;
    this.cartItems[key].quantity++;
  }
  ngOnInit(): void {
    if (this.taxRate !== 0) {
      this.taxRate = +this.taxRate;
    }
    // if (this.cartItems !== undefined && this.cartItems.length > 0) {
    this.calculateTotals();
    // }
  }
  removeQuantity(key: number) {
    this.isAllProductStockAvailable = false;
    if (this.cartItems[key].quantity > 1) {
      this.cartItems[key].quantity--;
    }
  }

  emptyCart() {
    // this.cart.emptyCart()
    this.subtotal = 0;
    this.gst = 0;
    this.total = 0;
    this.onEmptyCart.emit('emptyCart');
  }

  updateCart() {
    this.calculateTotals();
  }

  calculateTotals(): void {
    // console.log(this.cartItems);
    this.subtotal = 0;
    this.gst = 0;
    this.cartItems.map((item) => {
      this.subtotal += +item.product.price * item.quantity;
    })
    this.gst = this.subtotal * this.taxRate / 100;
    this.total = this.subtotal + parseFloat(this.gst.toString());
  }

  addCommaUtils(number: number): number {
    return number;
  }
  calculatePrice(price, quantity): number {
    return price * quantity;
  }
  openView(view: string): void {
    this.onOpenView.emit(view);

  }
  checkAvailability(): void {
    // 0: "No Backorders"
    // 1: "Allow Qty Below 0 "
    // 2: "Allow Qty Below 0 and Notify Customer"
    this.setLoading(true);
    this.dropshipservice.checkAvailability(this.getOrderItems(), this.websiteId).subscribe(res => {
      // // console.log('Stock Details', res);
      this.stockDetails = res;
      for (const cartitem of this.cartItems) {
        const stockDt: StockDetail = this.getStockDetailsByProductId(cartitem.product.id);
        let qtyDiff: number = stockDt.stockItemQty - cartitem.quantity;
        // // console.log(qtyDiff);
        if (stockDt !== undefined) {
          // // console.log(stockDt.backOrder);
          if (stockDt.backOrder === 0) {
            if (qtyDiff < 0) {
              cartitem.stockMsg1 = ' ';
              cartitem.stockMsg2 = 'Remove this item as stock cannot be back-ordered';
              cartitem.isAvailable = false;
            } else {
              cartitem.stockMsg1 = 'Stock available';
              cartitem.stockMsg2 = ' ';
              cartitem.isAvailable = true;
            }
          }
          if (stockDt.backOrder === 1) {
            if (qtyDiff < 0) {
              qtyDiff = Math.abs(qtyDiff);
              if (stockDt.stockItemQty > 0 && qtyDiff !== cartitem.quantity) {
                const qtyAvail: number = cartitem.quantity - qtyDiff;
                cartitem.stockMsg1 = 'Only ' + qtyAvail + ' available';
                cartitem.stockMsg2 = qtyDiff + ' on backorder';
                cartitem.isAvailable = true;
              }
              if (stockDt.stockItemQty === 0) {
                cartitem.stockMsg1 = ' ';
                cartitem.stockMsg2 = 'No stock available ' + cartitem.quantity + ' on backorder';
                cartitem.isAvailable = true;
              }
            } else if (qtyDiff > 0) {
              cartitem.stockMsg1 = 'Stock available';
              cartitem.stockMsg2 = ' ';
              cartitem.isAvailable = true;
            }
          }
          //          // console.log('cartmsg1', cartitem.stockMsg1);
          //          // console.log('cartmsg2', cartitem.stockMsg2);
        }
      }
      let isAllStockAvailable: boolean = true
      for (const cartitem of this.cartItems) {
        if (cartitem.isAvailable === false) {
          isAllStockAvailable = false;
          break;
        }
      }
      this.isAllProductStockAvailable = isAllStockAvailable;
      this.setLoading(false);
    })
  }
  setLoading(show: boolean): void {
    this.loading = show;
  }
  getOrderItems(): OrderItems[] {
    let orderItems: OrderItems[];
    orderItems = new Array();
    let orderItem: OrderItems;
    if (this.cartItems.length > 0) {
      for (const cartitem of this.cartItems) {
        orderItem = new OrderItems();
        orderItem.product_id = cartitem.product.id;
        orderItem.price = cartitem.product.price;
        orderItem.quantity = cartitem.quantity.toString();
        orderItem.status = cartitem.product.status;
        orderItems.push(orderItem);
      }
    }
    return orderItems;
  }
  getStockDetailsByProductId(productId: string): StockDetail {
    let returnVal: StockDetail = new StockDetail();
    for (const stdt of this.stockDetails) {
      if (stdt.product_id === productId) {
        returnVal = stdt;
        break;
      }
    }
    return returnVal;
  }
}
