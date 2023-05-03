import useItemsStore from '@/store/items.store';
import { Select } from 'antd';
import { FC } from 'react';

const SortBy: FC = () => {
  const options = [
    { label: 'Lowest Price', value: 'lowest' },
    { label: 'Highest Price', value: 'highest' },
  ];
  const selectedCategories = useItemsStore((state) => state.selectedCategories);
  const query = useItemsStore((state) => state.query);

  return (
    <div className='my-5 flex flex-1 items-center justify-end'>
      <p className='mr-3'>Sort By:</p>
      <Select
        defaultValue='Price'
        style={{ width: 150 }}
        options={options}
        onSelect={(e) => {
          useItemsStore.getState().setSortBy(e);
          if (query.length > 0 || selectedCategories.length > 0) {
            useItemsStore.getState().startSearchMode(query);
          } else {
            useItemsStore.getState().endSearchMode();
          }
        }}
      />
    </div>
  );
};
export default SortBy;
