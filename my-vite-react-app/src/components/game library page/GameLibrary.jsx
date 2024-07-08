import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios/Axios';
import styles from '../../CSS/gameLibraryPageCSS/GameLibrary.module.css';
import Navigation from '../home page/Navigation';
import Footer from '../home page/Footer';

const GameLibrary = () => {
  const [games, setGames] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem('id'));
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axiosInstance.get(`/game-library/user/${userId}`);
        setGames(response.data.data);
      } catch (error) {
        console.error('Failed to fetch games:', error);
      }
    };
    fetchGames();
  }, [userId]);

  const handleGameClick = (game) => {
    setSelectedGame(game);
  };

  return (
    <div className={styles.pageContainer}>
      <Navigation />
      <div className={styles.gameLibraryContainer}>
        <h1>Game Library</h1>
        <div className={styles.libraryGrid}>
          <div className={styles.gameList}>
            {games.length === 0 ? (
              <p>No games found</p>
            ) : (
              games.map((game) => (
                <div
                  key={game.id}
                  className={styles.gameItem}
                  onClick={() => handleGameClick(game)}
                >
                  <span className={styles.gameName}>{game.productsDetail.name}</span>
                </div>
              ))
            )}
          </div>
          <div className={styles.gameDetails}>
            {selectedGame ? (
              <div className={styles.gameInfo}>
                <h2>{selectedGame.productsDetail.name}</h2>
                <img
                  src={selectedGame.productsDetail.mainImage}
                  alt={selectedGame.productsDetail.name}
                  className={styles.productImage}
                />
                <p><strong>Categories:</strong> {selectedGame.productsDetail.categories}</p>
                <p><strong>Additional Information:</strong> {selectedGame.additionalInformation}</p>
                <button className={styles.downloadButton}>Download</button>
              </div>
            ) : (
              <p>Select a game to see details</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GameLibrary;