
import React, { useRef } from 'react';
import NextImage from 'next/image';
import { useTranslations } from 'next-intl';
import { Divider, Image } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { UniversityInfo } from '@/services/models';
import styles from './InfoCardOverview.module.css';

const InfoCardOverview: React.FC<{
  universityInfo: UniversityInfo,
}> = (props) => {
  const t = useTranslations('InfoCard');
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const slides = props.universityInfo.gallery.map((image, index) =>
    <Carousel.Slide key={index}>
      <Image
        component={NextImage}
        fill
        sizes='100vw'
        alt='Gallery Image'
        style={{ objectFit: 'cover' }}
        src={image}
        fallbackSrc='https://placehold.co/400x240/white/gray?text=Not%20Found'
      />
    </Carousel.Slide>
  );

  return (
    <div>
      <div className={styles.Description}>
        {props.universityInfo.introduction}
      </div>
      <Divider my="md" />
      <div className={styles.SectionTitle}>
        {t('gallery')}
      </div>
      <Carousel
        loop
        height={240}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        {slides}
      </Carousel>
    </div>
  );
};

export default InfoCardOverview;
