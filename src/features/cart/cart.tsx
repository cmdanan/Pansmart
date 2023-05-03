import useCartStore from '@/store/cart.store';
import { CartItem } from '@/store/interfaces/item.interface';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Col,
  Input,
  InputRef,
  List,
  Modal,
  Result,
  Row,
  Space,
} from 'antd';
import { FC, useRef, useState } from 'react';

const Cart: FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const inputRef = useRef<InputRef[]>([]);
  const itemsInCart = useCartStore((state) => state.items);
  const totalItems = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, '')
  );

  const checkInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    data: CartItem
  ) => {
    let input = e.currentTarget.value;
    if (input === '') {
      input = '1';
    }
    useCartStore.getState().updateQuantity(data.item, +input);
  };

  const onKeyPress = (e: React.KeyboardEvent) => {
    const testNaN = /[^0-9\b]+/;
    const pressedKey = e.key;
    if (testNaN.test(pressedKey)) {
      e.preventDefault();
      return false;
    }
  };

  const onIncrementQty = (data: CartItem) => {
    const input = data.quantity + 1 >= 999 ? 999 : data.quantity + 1;
    useCartStore.getState().updateQuantity(data.item, input);
  };

  const onDecrementQty = (data: CartItem) => {
    const input = data.quantity - 1 <= 0 ? 1 : data.quantity - 1;
    useCartStore.getState().updateQuantity(data.item, input);
  };

  const getTotalAmount = () => {
    return itemsInCart.reduce((acc, item) => {
      return acc + item.quantity * item.item.unitPrice;
    }, 0);
  };

  const onCheckOut = () => {
    setIsModalVisible(true);
    useCartStore.getState().clearItems();
  };

  const onModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className='flex h-screen flex-row'>
      <div className='flex-1 flex-row p-5'>
        <List
          dataSource={itemsInCart}
          renderItem={(data, index) => (
            <List.Item key={data.item.id}>
              <Row gutter={16} className='flex-1 flex-row'>
                <Col span={14}>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        shape='square'
                        size={64}
                        src={data.item.imageUrl}
                      />
                    }
                    title={
                      <div className='truncate font-normal'>
                        {data.item.productName}
                      </div>
                    }
                    description={
                      <div className='text text-orage font-medium'>
                        {Number(data.item.unitPrice).toLocaleString('ph-Ph', {
                          style: 'currency',
                          currency: 'PHP',
                        })}
                      </div>
                    }
                  />
                </Col>
                <Col span={5} className='flex justify-end self-center '>
                  <Space.Compact>
                    <Button type='primary' onClick={() => onDecrementQty(data)}>
                      <MinusOutlined />
                    </Button>
                    <Input
                      ref={(ref: InputRef) => (inputRef.current[index] = ref)}
                      defaultValue={data.quantity}
                      value={data.quantity}
                      className='w-14 text-center'
                      maxLength={3}
                      min={1}
                      max={999}
                      onChange={(e) => checkInput(e, data)}
                      onKeyPress={onKeyPress}
                    />
                    <Button type='primary' onClick={() => onIncrementQty(data)}>
                      <PlusOutlined />
                    </Button>
                  </Space.Compact>
                </Col>
                <Col span={5} className='flex justify-end self-center'>
                  <div className='flex flex-1 justify-end text-lg font-bold text-red-500'>
                    {Number(data.quantity * data.item.unitPrice).toLocaleString(
                      'ph-Ph',
                      {
                        style: 'currency',
                        currency: 'PHP',
                      }
                    )}
                  </div>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </div>
      <div
        className='w-1/4 bg-slate-50 p-5'
        style={{ border: 1, borderWidth: 1, borderColor: 'black' }}>
        <h2 className='font-light text-slate-700'>Order Summary</h2>
        <div className='flex flex-1 flex-row'>
          <p className='font-normal text-slate-700'>Total Items:</p>
          <p className='ml-auto font-bold text-red-500'>{totalItems}</p>
        </div>
        <div className='flex flex-1 flex-col'>
          <p className='text-xl font-semibold text-slate-700'>Total Amount</p>
          <label className='ml-auto text-2xl font-bold text-red-500'>
            {Number(getTotalAmount()).toLocaleString('ph-Ph', {
              style: 'currency',
              currency: 'PHP',
            })}
          </label>
        </div>
        <Button
          className='mt-5'
          block
          type='primary'
          style={{
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            backgroundColor: 'none',
          }}
          onClick={() => onCheckOut()}>
          Checkout
        </Button>
        <Modal
          transitionName=''
          open={isModalVisible}
          cancelText=''
          footer={null}
          onCancel={() => onModalCancel()}>
          <Result status='success' title='Thank you for purchasing!' />
        </Modal>
      </div>
    </div>
  );
};

export default Cart;
