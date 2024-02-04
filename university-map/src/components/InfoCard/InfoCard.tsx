import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Menu } from 'antd';
import Image from 'next/image';
import styles from './InfoCard.module.css'
import InfoCardOverview from './InfoCardOverview';
import DataLoader from '@/services/DataLoader';
import { UniversityInfo } from '@/services/models';

const InfoCard: React.FC<{
  universityInfo: UniversityInfo,
}> = (props) => {
  const t = useTranslations('InfoCard');
  const [selectedMenuItem, setSelectedMenuItem] = useState('overview');
  const menuSwtich = (key: any) => {
    switch (key) {
      case 'overview':
        return (<InfoCardOverview universityInfo={props.universityInfo} />);
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
          src={props.universityInfo.banner}
        />
      </div>
      <div className={styles.Title}>
        {props.universityInfo.name}
      </div>
      <Menu
        mode='horizontal'
        selectedKeys={['selectedMenuItem']}
        onClick={(e) => setSelectedMenuItem(e.key)}
      >
        <Menu.Item key='overview'>{t('overview')}</Menu.Item>
        {/* <Menu.Item key='rankings'>{t('rankings')}</Menu.Item> */}
      </Menu>
      <div className={styles.MenuItemArea}>
        {menuSwtich(selectedMenuItem)}
      </div>
    </div>
  );
};

export default InfoCard;