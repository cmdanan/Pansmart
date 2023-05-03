import { create } from 'zustand';

export interface CategoryState {
  selectedCategories: string[];
}

const CategoryStore = create<CategoryState>((set, get) => ({
  selectedCategories: [],
  addToSelectedCategories: (category: string) => {
    const categories = JSON.parse(JSON.stringify(get().selectedCategories));
    categories.push(category);
    set({ selectedCategories: categories });
  },
}));
export default CategoryStore;
