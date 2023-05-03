import Header from '@/features/header/header';
import useItemsStore from '@/store/items.store';
import { Button, ConfigProvider, Result } from 'antd';
import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './Home';
import CartPage from './Cart';
import useCartStore from '@/store/cart.store';

function App() {
  useEffect(() => {
    useItemsStore.getState().fetch();
    useItemsStore.getState().setItemsInDisplay(0);
    const cartItems = localStorage.getItem('items');
    if (cartItems) {
      useCartStore.getState().updateItems(JSON.parse(cartItems));
    }
  }, []);
  const navigate = useNavigate();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#65a30d',
        },
      }}>
      <Header title={'Pansmart'}></Header>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route
          path='*'
          element={
            <div className='flex h-screen flex-1 justify-center bg-slate-50 align-middle'>
              <Result
                status='404'
                title='404'
                subTitle='Sorry, the page you visited does not exist.'
                extra={
                  <Button type='primary' onClick={() => navigate('/')}>
                    Back Home
                  </Button>
                }
              />
            </div>
          }
        />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
