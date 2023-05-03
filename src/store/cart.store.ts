import { create } from 'zustand';
import { CartItem, Item } from './interfaces/item.interface';
import { immer } from 'zustand/middleware/immer';

export interface CartState {
  items: CartItem[];
  addItem: (item: Item) => void;
  updateItems: (items: CartItem[]) => void;
  clearItems: () => void;
  updateQuantity: (item: Item, quantity: number) => void;
}

const useCartStore = create(
  immer<CartState>((set, get) => ({
    items: [],
    addItem: (item: Item) => {
      const items = JSON.parse(JSON.stringify(get().items));
      const index = items.findIndex(
        (product: CartItem) => product.item.id === item.id
      );
      if (index !== -1) {
        items[index].quantity += 1;
      } else {
        items.push({ item, quantity: 1 });
      }
      localStorage.setItem('items', JSON.stringify(items));
      set({ items });
    },
    updateItems: (items: CartItem[]) => {
      set({ items });
    },
    clearItems: () => {
      localStorage.removeItem('items');
      set({ items: [] });
    },
    updateQuantity: (item: Item, quantity: number) => {
      const items = JSON.parse(JSON.stringify(get().items));
      const index = items.findIndex(
        (product: CartItem) => product.item.id === item.id
      );
      if (index !== -1) {
        items[index].quantity = quantity;
      }
      set((state) => ({ ...state.items, ...{ items: items } }));
    },
  }))
);
export default useCartStore;
