import { FC } from 'react';
import { Item } from '../interfaces/item.interface';
import { Button, Card, message } from 'antd';
import useCartStore from '@/store/cart.store';

interface Props {
  item: Item;
}

const Product: FC<Props> = ({ item }) => {
  const onAddToCart = (item: Item) => {
    useCartStore.getState().addItem(item);
  };

  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Item added to cart!',
    });
  };

  return (
    <>
      {contextHolder}
      <Card
        style={{ width: 270 }}
        bodyStyle={{ padding: 0 }}
        cover={
          <div
            className='flex flex-1'
            style={{ overflow: 'hidden', height: '120px', marginTop: 10 }}>
            <img
              src={item.imageUrl}
              className='flex'
              style={{ height: '100%', margin: '0 auto', borderRadius: 0 }}
            />
          </div>
        }>
        <div className='p-5'>
          <div className='h-32'>
            <p className='font-semibold'>{item.productName}</p>
            <p className='my-2 text-sm capitalize text-green-500'>
              {item.category}
            </p>
            <p className='line-clamp-2 text-sm text-slate-700'>
              {item.description}
            </p>
          </div>
          <div className=''>
            <p className='text-xl font-bold text-red-500'>
              {Number(item.unitPrice).toLocaleString('ph-Ph', {
                style: 'currency',
                currency: 'PHP',
              })}
            </p>
            <div className='flex'>
              <Button
                className='mt-auto flex'
                block
                type='primary'
                style={{
                  padding: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                  backgroundColor: 'none',
                }}
                onClick={() => {
                  onAddToCart(item);
                  success();
                }}>
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};
export default Product;
