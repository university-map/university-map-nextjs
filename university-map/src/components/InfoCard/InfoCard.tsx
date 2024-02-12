import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Tabs, Image, Title } from '@mantine/core';
import NextImage from 'next/image';
import InfoCardOverview from './InfoCardOverview';
import { UniversityInfo } from '@/services/models';
import styles from './InfoCard.module.css';

const InfoCard: React.FC<{
  universityInfo: UniversityInfo,
}> = (props) => {
  const t = useTranslations('InfoCard');
  const [activeTab, setActiveTab] = useState<string | null>('overview');

  return (
    <div className={styles.InfoCard}>
      <div className={styles.Banner}>
        <Image
          component={NextImage}
          fill
          sizes='100vw'
          alt='University Banner'
          style={{ objectFit: 'cover' }}
          src={props.universityInfo.banner}
          fallbackSrc='https://placehold.co/400x240/white/gray?text=Not%20Found'
        />
      </div>
      <Title order={2} m='xs'>
        {props.universityInfo.name}
      </Title>
      <Tabs
        value={activeTab}
        onChange={setActiveTab}
      >
        <Tabs.List>
          <Tabs.Tab value="overview">{t('overview')}</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="overview">
          <InfoCardOverview universityInfo={props.universityInfo} />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default InfoCard;
