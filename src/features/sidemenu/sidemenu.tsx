import { Checkbox } from 'antd';
import { FC } from 'react';
import { Item } from '../content/interfaces/item.interface';
import items from '@/data/items.json';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import useItemsStore from '@/store/items.store';

const getCategories = (items: Item[]) => {
  const categories = items.map((item) => item.category.toLowerCase());
  const uniqueCategories = [...new Set(categories)];
  return [...uniqueCategories];
};

const SideMenu: FC = () => {
  const categories = getCategories(items);

  const onChange = (e: CheckboxChangeEvent, index: number) => {
    if (e.target.checked) {
      useItemsStore.getState().addCategory(categories[index]);
    } else {
      useItemsStore.getState().removeCategory(categories[index]);
      const selectedCategories = useItemsStore.getState().selectedCategories;
      if (selectedCategories.length === 0) {
        useItemsStore.getState().endSearchMode();
      }
    }
    useItemsStore.getState().startSearchMode('');
  };

  return (
    <div className='flex w-40 flex-col p-4 '>
      {categories.map((category, index) => (
        <Checkbox
          key={index}
          style={{ margin: 0, marginTop: 5 }}
          className='capitalize'
          onChange={(e) => onChange(e, index)}>
          {category}
        </Checkbox>
      ))}
    </div>
  );
};

export default SideMenu;
