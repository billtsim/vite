import React from 'react';
import styles from '../CSS/FeaturedGames.module.css';

const FeaturedGames = () => {
  const games = [
    {
      id: 1,
      imageUrl: 'https://via.placeholder.com/400x200?text=Game+1',
      title: 'Find it in Fortnite',
      description: "A new way to discover what's happening in Fortnite."
    },
    {
      id: 2,
      imageUrl: 'https://via.placeholder.com/400x200?text=Game+2',
      title: 'LEGO Fortnite',
      description: 'Mello out! Marshmello, Marsha, and MASHINOBI have returned!',
      actionText: 'Play For Free'
    },
    {
      id: 3,
      imageUrl: 'https://via.placeholder.com/400x200?text=Game+3',
      title: 'Fortnite x Eminem',
      description: 'Eminem has returned to the Fortnite Item Shop!',
      actionText: 'Play For Free'
    },
    // 添加更多游戏
  ];

  return (
    <div className={styles.featuredGamesContainer}>
      {games.map(game => (
        <div key={game.id} className={styles.gameCard}>
          <img src={game.imageUrl} alt={game.title} className={styles.gameImage} />
          <div className={styles.gameInfo}>
            <h3>{game.title}</h3>
            <p>{game.description}</p>
            {game.actionText && <p className={styles.actionText}>{game.actionText}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedGames;