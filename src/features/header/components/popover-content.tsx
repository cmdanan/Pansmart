import useCartStore from '@/store/cart.store';
import { Avatar, Button, List } from 'antd';
import { FC } from 'react';

const PopoverContent: FC = () => {
  const itemsInCart = useCartStore((state) => state.items);

  return (
    <div
      className=' flex flex-1 flex-col '
      style={{
        width: 300,
        height: 400,
        overflow: 'auto',
        padding: '0 16px',
      }}>
      <List
        className='flex-1'
        dataSource={itemsInCart}
        renderItem={(data) => (
          <List.Item key={data.item.id}>
            <List.Item.Meta
              avatar={<Avatar src={data.item.imageUrl} />}
              title={<div className='truncate'>{data.item.productName}</div>}
              description={<div className='truncate'>Qty: {data.quantity}</div>}
            />
            <div className='font-bold text-red-500'>
              {Number(data.item.unitPrice).toLocaleString('ph-Ph', {
                style: 'currency',
                currency: 'PHP',
              })}
            </div>
          </List.Item>
        )}
      />
      <Button
        className='sticky bottom-0 mb-auto'
        block
        type='primary'
        style={{
          padding: 20,
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          backgroundColor: 'none',
        }}>
        View My Cart
      </Button>
    </div>
  );
};
export default PopoverContent;
