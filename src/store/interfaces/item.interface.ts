export interface Item {
  id: string;
  productName: string;
  description: string;
  unitPrice: number;
  imageUrl: string;
  category: string;
}

export interface CartItem {
  item: Item;
  quantity: number;
}
