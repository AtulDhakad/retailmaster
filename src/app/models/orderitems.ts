export class OrderItems {
  entity_id: string;
  order_id: string;
  product_id: string;
  quantity: string;
  name: string;
  id: string;
  sku: string;
  position: string;
  price: string;
  special_price: string = '0';
  description: string;
  url: string;
  image: string;
  status: string;
  price_rm2: string;
  category_id: string;
  sales_order_item_id: string;
  returnOfStock: boolean;
  damage: boolean;
  refundQty: number = 0;
  refundItemSubTotal: number = 0;
  refundItemTax: number = 0;
  refundRowTotal: number = 0;
}

