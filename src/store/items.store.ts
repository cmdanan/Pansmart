import { create } from 'zustand';
import { Item } from './interfaces/item.interface';
import items from '../data/items.json';
import { paginate } from '@/utils/paginator';

export interface ItemState {
  items: Item[];
  itemsInDisplay: Item[];
  filteredItems: Item[];
  filteredItemsInDisplay: Item[];
  isSearching: boolean;
  currentPage: number;
  selectedCategories: string[];
  sortBy: string | null;
  query: string;
  fetch: () => void;
  setItems: (items: Item[]) => void;
  setItemsInDisplay: (index: number) => void;
  setCurrentPage: (currentPage: number) => void;
  setIsSearching: (isSearching: boolean) => void;
  filterItems: (query: string) => void;
  setFilteredItemsInDisplay: (index: number) => void;
  clearFilteredItems: () => void;
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
  endSearchMode: () => void;
  startSearchMode: (query: string) => void;
  setSortBy: (sortBy: string) => void;
  setQuery: (query: string) => void;
}

const useItemsStore = create<ItemState>((set, get) => ({
  items: [],
  itemsInDisplay: [],
  currentPage: 1,
  isSearching: false,
  filteredItems: [],
  filteredItemsInDisplay: [],
  selectedCategories: [],
  sortBy: null,
  query: '',
  fetch: () => {
    set({ items: items as Item[] });
  },
  setItems: (items: Item[]) => set({ items }),
  setItemsInDisplay: (index: number) => {
    const list = get().items;
    const sortBy = get().sortBy;
    if (sortBy) {
      list.sort((a: Item, b: Item) => {
        return sortBy === 'lowest'
          ? a.unitPrice - b.unitPrice
          : sortBy === 'highest'
          ? b.unitPrice - a.unitPrice
          : 0;
      });
    }
    const items = paginate(list, index, 9);
    set({ itemsInDisplay: items });
  },
  setCurrentPage: (currentPage: number) => set({ currentPage }),
  setIsSearching: (isSearching: boolean) => set({ isSearching }),
  filterItems: (query: string) => {
    const list = get().items;
    const categories = get().selectedCategories;
    let items: Item[] = [];

    if (categories.length > 0 && query.length <= 0) {
      items = list.filter((item: Item) => categories.includes(item.category));
    } else if (categories.length > 0 && query.length > 0) {
      items = list.filter((item: Item) => {
        return (
          categories.includes(item.category) &&
          item.productName.toLowerCase().includes(query.toLowerCase())
        );
      });
    } else {
      items = list.filter((item: Item) => {
        return item.productName.toLowerCase().includes(query.toLowerCase());
      });
    }

    if (list.length !== items.length) {
      set({ currentPage: 1 });
    }

    const sortBy = get().sortBy;

    if (sortBy !== null) {
      items.sort((a: Item, b: Item) => {
        return sortBy === 'lowest'
          ? a.unitPrice - b.unitPrice
          : sortBy === 'highest'
          ? b.unitPrice - a.unitPrice
          : 0;
      });
    }

    set({ filteredItems: items });
  },
  setFilteredItemsInDisplay: (index: number) => {
    const list = get().filteredItems;
    const items = paginate(list, index, 9);
    set({ itemsInDisplay: items });
  },
  clearFilteredItems: () => set({ filteredItems: [], currentPage: 1 }),
  addCategory: (category: string) => {
    const categories = JSON.parse(JSON.stringify(get().selectedCategories));
    categories.push(category);
    set({ selectedCategories: categories });
  },
  removeCategory: (category: string) => {
    const categories = JSON.parse(JSON.stringify(get().selectedCategories));
    const index = categories.findIndex((cat: string) => cat === category);
    categories.splice(index, 1);
    set({ selectedCategories: categories });
  },
  startSearchMode: (query: string) => {
    set({ isSearching: true });
    get().filterItems(query);
    get().setFilteredItemsInDisplay(0);
  },
  endSearchMode: () => {
    get().setItemsInDisplay(0);
    set({ isSearching: false, filteredItems: [], currentPage: 1 });
  },
  setSortBy: (sortBy: string) => set({ sortBy }),
  setQuery: (query: string) => set({ query }),
}));

export default useItemsStore;
