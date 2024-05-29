import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import styles from '../CSS/Carousel.module.css';

const Carousel = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const progressBarRef = useRef(null);

  useEffect(() => {
    // 假设从 API 获取数据
    fetch('/api/carousel')
      .then(response => response.json())
      .then( setCarouselData([
        {
          "name": "Wuthering Waves",
          "description": "Download for free now to explore the open world with casual but deep battle and claim your free Echo Starter Pack!",
          "imageUrl": "https://cdn2.unrealengine.com/egs-wuthering-waves-carousel-desktop-1248x702-ad7dee8b3a34.png?h=480&quality=medium&resize=1&w=854",
          "discount": "-50%",
          "category": "Free"
        },
        {
          "name": "Grand Theft Auto V",
          "description": "Experience the critically acclaimed open world game with new features and content.",
          "imageUrl": "https://cdn2.unrealengine.com/egs-wuthering-waves-carousel-desktop-1248x702-ad7dee8b3a34.png?h=480&quality=medium&resize=1&w=854",
          "discount": "-50%",
          "category": "Paid"
        },
        {
          "name": "Grand Theft Auto V",
          "description": "Experience the critically acclaimed open world game with new features and content.",
          "imageUrl": "https://cdn2.unrealengine.com/egs-wuthering-waves-carousel-desktop-1248x702-ad7dee8b3a34.png?h=480&quality=medium&resize=1&w=854",
          "discount": "-50%",
          "category": "Paid"
        },
        {
          "name": "Grand Theft Auto V",
          "description": "Experience the critically acclaimed open world game with new features and content.",
          "imageUrl": "https://cdn2.unrealengine.com/egs-wuthering-waves-carousel-desktop-1248x702-ad7dee8b3a34.png?h=480&quality=medium&resize=1&w=854",
          "discount": "-50%",
          "category": "Paid"
        },
        // more items...
      ]))
      .catch(error => console.error('Error fetching carousel data:', error));
  }, []);

  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.style.animation = 'none';
      // 触发重绘
      progressBarRef.current.offsetHeight; 
      progressBarRef.current.style.animation = '';
    }
  }, [activeIndex]);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  if (carouselData.length === 0) return <div>Loading...</div>;

  return (
    <div className={styles.carouselContainer} >
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => handleSlideChange(swiper)} // 初始化时设置第一个进度条动画
      >
        {carouselData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className={styles.carouselMain}>
              <img style={{display: 'flex'}} src={item.imageUrl} alt={item.name} className={styles.carouselImage} />
              <div className={styles.carouselInfo}>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <button className={styles.playButton}>Play Now</button>
                <button className={styles.wishlistButton}>Add to Wishlist</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div  className={styles.carouselSidebar}>
        {carouselData.map((item, index) => (
          <div
            key={index}
            className={`${styles.sidebarItem} ${index === activeIndex ? styles.active : ''}`}
          >
            <div className={styles.sidebarInfo}>
              <p className={styles.sidebarName}>{item.name}</p>
            </div>
            {index === activeIndex && <div ref={progressBarRef} className={styles.progressOverlay}></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;