import { Product } from './product';
export class CartItem {
  quantity: number;
  product: Product;
  stockMsg1?: string;
  stockMsg2?: string;
  isAvailable?: boolean;
}
