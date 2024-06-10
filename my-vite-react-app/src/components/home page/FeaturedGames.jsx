import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios/Axios'; // 引入自定义的 axios 实例
import styles from '../../CSS/homePageCSS/FeaturedGames.module.css';

const FeaturedGames = ({ onProductClick }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/product', {
          params: { tags: 'featuredGame' }
        });

        // 处理数据，将折扣的小数换成百分比
        const formattedGames = response.data.data.map(game => ({
          ...game,
          discount: game.discount ? `${(game.discount * 100).toFixed(0)}%` : null // 将折扣转换为百分比形式
        }));

        setGames(formattedGames);
      } catch (error) {
        console.error('Error fetching featured games:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.featuredGamesContainer}>
      {games.map(game => (
        <div key={game.id} className={styles.gameCard} onClick={() => onProductClick(game)}>
          <img src={game.mainImage} alt={game.name} className={styles.gameImage} />
          <div className={styles.gameInfo}>
            <h3>{game.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedGames;