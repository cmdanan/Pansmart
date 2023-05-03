import { FC } from 'react';
import SearchBar from './components/search';
import SortBy from './components/sort';
import Product from './components/item';
import { Item } from './interfaces/item.interface';
import { Empty, Pagination } from 'antd';
import useItemsStore from '@/store/items.store';

const Content: FC = () => {
  const itemsInDisplay: Item[] = useItemsStore((state) => state.itemsInDisplay);
  const filteredItems: Item[] = useItemsStore((state) => state.filteredItems);
  const isSearching = useItemsStore((state) => state.isSearching);
  const totalItems: number = useItemsStore((state) => state.items.length);
  const currentPage = useItemsStore((state) => state.currentPage);

  const setItemsInDisplay = (page: number) => {
    useItemsStore.getState().setCurrentPage(page);
    if (!isSearching) {
      useItemsStore.getState().setItemsInDisplay(page - 1);
    } else {
      useItemsStore.getState().setFilteredItemsInDisplay(page - 1);
    }
  };

  return (
    <>
      <div className='flex-1 p-5'>
        <SearchBar></SearchBar>
        <SortBy></SortBy>
        {itemsInDisplay.length === 0 ? (
          <Empty
            className='mt-32'
            description={
              <>
                <br />
                <span className='text-xl font-bold text-slate-700'>
                  No results found
                </span>
                <br />
                <span className='text-slate-500'>
                  Try adjusting your search or filter to find what you are
                  looking for
                </span>
              </>
            }
          />
        ) : (
          <>
            <div className='grid grid-cols-3 gap-4'>
              {itemsInDisplay.map((item) => (
                <Product item={item} key={item.id}></Product>
              ))}
            </div>
            <div className='my-10 flex justify-center pb-10'>
              <Pagination
                current={currentPage}
                total={!isSearching ? totalItems : filteredItems.length}
                showSizeChanger={false}
                onChange={(page) => {
                  setItemsInDisplay(page);
                }}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Content;
