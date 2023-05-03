import Content from '@/features/content/content';
import SideMenu from '@/features/sidemenu/sidemenu';
import { FC } from 'react';

const HomePage: FC = () => {
  return (
    <div className='flex'>
      <SideMenu></SideMenu>
      <Content />
    </div>
  );
};
export default HomePage;
