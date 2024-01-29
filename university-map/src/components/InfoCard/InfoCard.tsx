import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Menu } from 'antd';
import Image from 'next/image';
import styles from './InfoCard.module.css'
import InfoCardOverview from './InfoCardOverview';
import DataLoader from '@/services/DataLoader';

const InfoCard: React.FC = () => {
  const t = useTranslations('InfoCard');

  const fetchData = async () => {
    const dataLoader = DataLoader.getInstance();
    const data = await dataLoader.loadData('universities/Taiwan/National Cheng Kung University/_data.yml');
    const data2 = await dataLoader.getUnivLocations();
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <Menu.Item key='overview'>{t('overview')}</Menu.Item>
        <Menu.Item key='rankings'>{t('rankings')}</Menu.Item>
      </Menu>
      <div className={styles.MenuItemArea}>
        {menuSwtich(selectedMenuItem)}
      </div>
    </div>
  );
};

export default InfoCard;