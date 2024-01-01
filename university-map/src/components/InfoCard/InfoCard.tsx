import React, { useState } from 'react';
import Image from 'next/image';
import styles from './InfoCard.module.css'
import { Menu } from 'antd';
import InfoCardOverview from './InfoCardOverview';

const InfoCard: React.FC = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('overview');
  const menuSwtich = (key: any) => {
    switch (key) {
      case 'overview':
        return (<InfoCardOverview />);
      case 'rankings':
        return (<h3>Coming Soon.</h3>);
      default:
        break;
    }
  };

  return (
    <div className={styles.InfoCard}>
      <div className={styles.Banner}>
        <Image
          fill sizes='100vw' alt='University Banner' style={{ objectFit: 'cover' }}
          src='https://web.ncku.edu.tw/var/file/0/1000/img/495849468.jpg'
        />
      </div>
      <div className={styles.Title}>
        國立成功大學
      </div>
      <Menu mode='horizontal' selectedKeys={['selectedMenuItem']} onClick={(e) => setSelectedMenuItem(e.key)}>
        <Menu.Item key='overview'>總覽</Menu.Item>
        <Menu.Item key='rankings'>排名</Menu.Item>
      </Menu>
      <div className={styles.MenuItemArea}>
        {menuSwtich(selectedMenuItem)}
      </div>
    </div>
  );
};

export default InfoCard;