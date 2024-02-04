
import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Carousel, Divider } from 'antd';
import { UniversityInfo } from '@/services/models';
import styles from './InfoCardOverview.module.css';


const images: string[] = [
  'https://web.ncku.edu.tw/var/file/0/1000/img/2638/541084137.jpg',
  'https://web.ncku.edu.tw/var/file/0/1000/img/495849468.jpg',
  'https://web.ncku.edu.tw/var/file/0/1000/img/0111_Sel-044.jpg',
];

const InfoCardOverview: React.FC<{
  universityInfo: UniversityInfo,
}> = (props) => {
  const t = useTranslations('InfoCard');
  return (
    <div>
      <div className={styles.Description}>
        {props.universityInfo.introduction}
      </div>
      <Divider />
      <div className={styles.SectionTitle}>
        {t('gallery')}
      </div>
      <Carousel autoplay={true} >
        {props.universityInfo.gallery.map((image, index) => (
          <div key={index} className={styles.GalleryImage}>
            <Image
              fill sizes='100vw' alt='Gallery Image' style={{ objectFit: 'cover' }}
              src={image}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default InfoCardOverview;