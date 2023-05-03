import useItemsStore from '@/store/items.store';
import { AutoComplete } from 'antd';
import Search from 'antd/es/input/Search';
import { FC } from 'react';

const SearchBar: FC = () => {
  const onSearch = (value: string) => {
    useItemsStore.getState().setQuery(value);
    useItemsStore.getState().startSearchMode(value);
  };

  const options = useItemsStore((state) => {
    const listToUse = state.isSearching ? state.filteredItems : state.items;
    return listToUse.map((item) => ({
      value: item.productName,
    }));
  });

  const hasSelectedCategories = useItemsStore(
    (state) => state.selectedCategories.length > 0
  );

  return (
    <AutoComplete
      options={options}
      style={{ width: '100%' }}
      dropdownMatchSelectWidth={252}
      filterOption={(inputValue, option) =>
        option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
      onSelect={(e) => onSearch(e)}>
      <Search
        placeholder='Search for products'
        allowClear
        enterButton
        size='large'
        onPressEnter={(e) => {
          e.preventDefault();
          onSearch(e.currentTarget.value);
        }}
        onChange={(e) => {
          if (e.currentTarget.value === '') {
            if (!hasSelectedCategories) {
              useItemsStore.getState().endSearchMode();
            } else {
              useItemsStore.getState().startSearchMode('');
            }
          }
        }}
      />
    </AutoComplete>
  );
};

export default SearchBar;
