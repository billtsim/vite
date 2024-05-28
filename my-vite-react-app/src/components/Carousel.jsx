import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
import styles from '../CSS/Carousel.module.css';

SwiperCore.use([Autoplay, Pagination, Navigation]);

const Carousel = () => {
  const slides = [
    {
      id: 1,
      imageUrl: 'https://via.placeholder.com/800x300?text=Discount+Product+1',
      title: 'Discount Product 1',
      description: 'Limited time offer on Product 1'
    },
    {
      id: 2,
      imageUrl: 'https://via.placeholder.com/800x300?text=Discount+Product+2',
      title: 'Discount Product 2',
      description: 'Limited time offer on Product 2'
    },
    {
      id: 3,
      imageUrl: 'https://via.placeholder.com/800x300?text=Featured+Product+1',
      title: 'Featured Product 1',
      description: 'Check out our featured Product 1'
    },
    // 添加更多幻灯片
  ];

  return (
    <div className={styles.carouselContainer}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className={styles.swiperContainer}
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id} className={styles.swiperSlide}>
            <img src={slide.imageUrl} alt={slide.title} className={styles.image} />
            <div className={styles.caption}>
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;