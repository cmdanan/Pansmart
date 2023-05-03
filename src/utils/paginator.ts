import { Item } from '@/store/interfaces/item.interface';

export const paginate = (array: Item[], index: number, pageSize = 9) => {
  const totalItems = array.length;
  const endIndex = Math.min((index + 1) * pageSize, totalItems);
  return array.slice(Math.max(endIndex - pageSize, 0), endIndex);
};
