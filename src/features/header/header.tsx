import { Badge, Popover } from 'antd';
import { FC } from 'react';
import PopoverContent from './components/popover-content';
import useCartStore, { CartState } from '@/store/cart.store';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
}

const Header: FC<Props> = ({ title }) => {
  const itemCount: number = useCartStore(
    (state: CartState) => state.items.length
  );

  return (
    <div className='flex flex-1 bg-lime-600 px-10 align-middle'>
      <div className='flex self-center'>
        <img src='/src/assets/logo.png' alt='' style={{ width: 100 }} />
      </div>
      <div className='flex self-center'>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <h1 className='text-4xl font-extralight tracking-widest text-white'>
            {title}
          </h1>
        </Link>
      </div>
      <div className='ml-auto flex self-center tracking-widest text-white'>
        <Link to='cart'>
          <Badge count={itemCount}>
            <Popover
              placement='bottomRight'
              content={<PopoverContent></PopoverContent>}>
              <div className='flex self-center text-lg tracking-widest text-white'>
                My Cart
              </div>
            </Popover>
          </Badge>
        </Link>
      </div>
    </div>
  );
};
export default Header;
