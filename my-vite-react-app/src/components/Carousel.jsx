import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import styles from '../CSS/Carousel.module.css';

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
        modules={[Navigation, Pagination, Autoplay]}
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