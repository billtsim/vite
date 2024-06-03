import React from 'react';
import styles from '../CSS/FeaturedGames.module.css';

const FeaturedGames = () => {
  const games = [
    {
      id: 1,
      imageUrl: 'https://cdn2.unrealengine.com/egs-wuthering-waves-carousel-desktop-1248x702-ad7dee8b3a34.png?h=480&quality=medium&resize=1&w=854',
      title: 'Find it in Fortnite',
      description: "A new way to discover what's happening in Fortnite."
    },
    {
      id: 2,
      imageUrl: 'https://cdn2.unrealengine.com/egs-wuthering-waves-carousel-desktop-1248x702-ad7dee8b3a34.png?h=480&quality=medium&resize=1&w=854',
      title: 'LEGO Fortnite',
      description: 'Mello out! Marshmello, Marsha, and MASHINOBI have returned!',
      actionText: 'Play For Free'
    },
    {
      id: 3,
      imageUrl: 'https://cdn2.unrealengine.com/egs-wuthering-waves-carousel-desktop-1248x702-ad7dee8b3a34.png?h=480&quality=medium&resize=1&w=854',
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