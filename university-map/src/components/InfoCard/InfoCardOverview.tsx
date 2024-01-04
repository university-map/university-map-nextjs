
import React from 'react';
import Image from 'next/image';
import { Carousel, Divider } from 'antd';
import styles from './InfoCardOverview.module.css';

const images: string[] = [
  'https://web.ncku.edu.tw/var/file/0/1000/img/2638/541084137.jpg',
  'https://web.ncku.edu.tw/var/file/0/1000/img/495849468.jpg',
  'https://web.ncku.edu.tw/var/file/0/1000/img/0111_Sel-044.jpg',
];

const InfoCardOverview: React.FC = () => {
  return (
    <div>
      <div className={styles.Description}>
        國立成功大學（簡稱成大、NCKU）是一所校本部位於臺灣臺南市東區的研究型綜合大學，為南臺灣首座國立綜合大學，名稱由來為紀念延平郡王鄭成功開臺之功。校園除由相鄰7校區組成的校本部，另有同樣位於台南市的安南校區、歸仁校區，以及位於雲林縣斗六市的斗六校區。現設有9學院，下分44個學系、37個研究所、17個學位學程，醫學院附設醫院和附屬臺南高工。
        <br/>
        前身為1931年台灣日治時期創辦的「臺灣總督府臺南高等工業學校」，二戰後國民政府於1946年接收，改制為「臺灣省立臺南工業專科學校」，同年底升格為「臺灣省立工學院」，1971年改制為國立成功大學。
      </div>
      <Divider />
      <div className={styles.SectionTitle}>
        相片
      </div>
      <Carousel autoplay={true} >
        {images.map((image, index) => (
          <div key={index} className={styles.GalleryImage}>
            <Image
              fill sizes='100vw' alt='University Banner' style={{ objectFit: 'cover' }}
              src={image}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default InfoCardOverview;