import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios/Axios';
import styles from '../CSS/Games.module.css';
import EditGames from './EditGames';

const Games = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const gamesPerPage = 5;

  const fetchGames = async () => {
    try {
      const response = await axiosInstance.get('/product');
      setGames(response.data.data); // 假设服务器返回的游戏数据是一个数组
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  // 格式化日期时间字符串
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const handleDelete = (id) => {
    if (window.confirm('确定要删除这个游戏吗？')) {
      axiosInstance.delete(`/product/${id}`)
        .then(response => {
          fetchGames(); // 删除后重新获取游戏列表
        })
        .catch(err => {
          setError(err);
        });
    }
  };

  const handleEdit = (game) => {
    setSelectedGame(game);
    setShowModal(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSave = async () => {
    await fetchGames(); // 保存后重新获取游戏列表
    setShowModal(false);
  };

  // 分页逻辑
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(games.length / gamesPerPage); i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={styles.pageButton}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.gamesContainer}>
      <h1>Games</h1>
      <table className={styles.gamesTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Original Price</th>
            <th>Discount</th>
            <th>Category</th>
            <th>Tags</th>
            <th>Create Time</th>
            <th>Update Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentGames.map(game => (
            <tr key={game.id}>
              <td>{game.id}</td>
              <td><img src={game.imageUrl} alt={game.name} className={styles.gameImage} /></td>
              <td>{game.name}</td>
              <td>{game.description}</td>
              <td>{game.price}</td>
              <td>{game.originalPrice}</td>
              <td>{`${game.discount * 100}%`}</td>
              <td>{game.category}</td>
              <td>{Array.isArray(game.tags) ? game.tags.join(', ') : game.tags}</td>
              <td>{formatDate(game.createTime)}</td>
              <td>{formatDate(game.updateTime)}</td>
              <td >
                <div className={styles.actions}>
                <button onClick={() => handleEdit(game)} className="edit">Edit</button>
                <button onClick={() => handleDelete(game.id)} className="delete">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        {renderPageNumbers()}
      </div>
      {showModal && (
        <EditGames
          show={showModal}
          onClose={() => setShowModal(false)}
          game={selectedGame}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Games;