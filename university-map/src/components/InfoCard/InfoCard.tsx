import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Tabs } from '@mantine/core';
import Image from 'next/image';
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
          fill sizes='100vw' alt='University Banner' style={{ objectFit: 'cover' }}
          src={props.universityInfo.banner}
        />
      </div>
      <div className={styles.Title}>
        {props.universityInfo.name}
      </div>
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
