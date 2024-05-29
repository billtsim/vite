import React, { useState, useEffect, useRef } from 'react';
import styles from '../CSS/Carousel.module.css';

const Carousel = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const progressBarRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    // 假设从 API 获取数据
    setCarouselData([
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
      // more items...
    ]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
    }, 3000);
    intervalRef.current = interval;
    return () => clearInterval(interval);
  }, [carouselData.length]);

  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.style.animation = 'none';
      // 触发重绘
      progressBarRef.current.offsetHeight; 
      progressBarRef.current.style.animation = '';
    }
  }, [activeIndex]);

  const handleSidebarItemClick = (index) => {
    setActiveIndex(index);
    resetInterval();
  };

  const resetInterval = () => {
    clearInterval(intervalRef.current);
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
    }, 3000);
    intervalRef.current = interval;
  };

  if (carouselData.length === 0) return <div>Loading...</div>;

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselMain}>
        <div className={styles.carouselContent}>
          <img src={carouselData[activeIndex].imageUrl} alt={carouselData[activeIndex].name} className={styles.carouselImage} />
          <div className={styles.carouselInfo}>
            <h2>{carouselData[activeIndex].name}</h2>
            <p>{carouselData[activeIndex].description}</p>
            <button className={styles.playButton}>Play Now</button>
            <button className={styles.wishlistButton}>Add to Wishlist</button>
          </div>
        </div>
      </div>
      <div className={styles.carouselSidebar}>
        {carouselData.map((item, index) => (
          <div
            key={index}
            className={`${styles.sidebarItem} ${index === activeIndex ? styles.active : ''}`}
            onClick={() => handleSidebarItemClick(index)}
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