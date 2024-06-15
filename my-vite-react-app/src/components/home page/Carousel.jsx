import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../../axios/Axios'; // 引入自定义的 axios 实例
import styles from '../../CSS/homePageCSS/Carousel.module.css';

const Carousel = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const progressBarRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/product', {
          params: {
            tags: 'Carousel'
          }
        });
        setCarouselData(response.data.data);
      } catch (error) {
        console.error('Error fetching carousel data:', error);
      }
    };

    fetchData();
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
          <img 
            src={carouselData[activeIndex].mainImage} 
            alt={carouselData[activeIndex].name} 
            className={styles.carouselImage} 
          />
          <div className={styles.carouselInfo}>
            <h2>{carouselData[activeIndex].name}</h2>
            {/* 移除 Description */}
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