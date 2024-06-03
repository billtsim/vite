import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios/Axios';
import styles from '../CSS/Games.module.css';
import EditGames from './EditGames';
import AddGame from './AddGame'; // 新增这个组件

const allCategories = [
  'Action Game', 'Action Role-Playing Game', 'Adventure Game', 'Action Adventure Game', 
  'Card Game', 'Fighting Game', 'Role-Playing Game', 'Real-Time Strategy', 
  'Turn-Based Strategy', 'Massively Multiplayer Online Role-Playing Game', 
  'Multi-User Dungeon/Dimension/Domain', 'Simulation Game', 'Simulation Role-Playing Game', 
  'Shooting Game', 'First-Person Shooter', 'Interactive Fiction', 'Third-Person Shooter', 
  'Sports Game', 'Tabletop Board Game', 'Puzzle Game', 'Racing Game'
];

const Games = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false); // 控制显示添加游戏的模态框
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedGames, setSelectedGames] = useState([]); // 用于存储选中的游戏ID
  const [filters, setFilters] = useState({
    name: '',
    categories: '',
    tags: '',
    minPrice: '',
    maxPrice: ''
  });
  const gamesPerPage = 5;

  const fetchGames = async (queryParams = {}) => {
    try {
      const response = await axiosInstance.get('/product', { params: queryParams });
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

  const handleDelete = (id, imageFileName) => {
    if (window.confirm('确定要删除这个游戏吗？')) {
      axiosInstance.delete(`/product/${id}`, { params: { imageFileName } })
        .then(response => {
          fetchGames(); // 删除后重新获取游戏列表
        })
        .catch(err => {
          setError(err);
        });
    }
  };

  const handleBatchDelete = () => {
    if (window.confirm('确定要删除选中的游戏吗？')) {
      Promise.all(selectedGames.map(gameId => {
        const game = games.find(g => g.id === gameId);
        return axiosInstance.delete(`/product/${gameId}`, { params: { imageFileName: game.imageUrl.split('/').pop() } });
      }))
        .then(() => {
          fetchGames(); // 删除后重新获取游戏列表
          setSelectedGames([]); // 清空已选中的游戏
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

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSave = async () => {
    await fetchGames(); // 保存后重新获取游戏列表
    setShowModal(false);
    setShowAddModal(false);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedGames(currentGames.map(game => game.id));
    } else {
      setSelectedGames([]);
    }
  };

  const handleSelectGame = (id) => {
    setSelectedGames(prevSelectedGames =>
      prevSelectedGames.includes(id)
        ? prevSelectedGames.filter(gameId => gameId !== id)
        : [...prevSelectedGames, id]
    );
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const applyFilters = () => {
    const queryParams = {};

    if (filters.name) {
      queryParams.name = filters.name;
    }

    if (filters.categories) {
      queryParams.categories = filters.categories;
    }

    if (filters.tags) {
      if (filters.tags === 'free') {
        queryParams.minPrice = 0;
        queryParams.maxPrice = 0;
      } else if (filters.tags === 'paid') {
        queryParams.minPrice = 1;
        queryParams.maxPrice = 99999;
      }
    }

    if (filters.minPrice) {
      queryParams.minPrice = filters.minPrice;
    }

    if (filters.maxPrice) {
      queryParams.maxPrice = filters.maxPrice;
    }

    fetchGames(queryParams); // 重新获取游戏列表并应用过滤器
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
      <div className={styles.filterContainer}>
        <label>
          Name:
          <input type="text" name="name" value={filters.name} onChange={handleFilterChange} />
        </label>
        <label>
          Categories:
          <select name="categories" value={filters.categories} onChange={handleFilterChange}>
            <option value="">All</option>
            {allCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </label>
        <label>
          Tags:
          <select name="tags" value={filters.tags} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="free">Free Game</option>
            <option value="paid">Paid Game</option>
          </select>
        </label>
        <label>
          Price:
          <div>
            <input type="number" name="minPrice" placeholder="Min" value={filters.minPrice} onChange={handleFilterChange} />
            <input type="number" name="maxPrice" placeholder="Max" value={filters.maxPrice} onChange={handleFilterChange} />
          </div>
        </label>
        <button onClick={applyFilters}>Apply Filters</button>
      </div>
      <div className={styles.TopButton}>
        <button onClick={handleAdd}>新增功能</button>
        <button onClick={handleBatchDelete} disabled={selectedGames.length === 0}>批量删除</button>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.gamesTable}>
          <thead>
            <tr>
              <th><input type="checkbox" onChange={handleSelectAll} /></th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Original Price</th>
              <th>Discount</th>
              <th>Categories</th>
              <th>Tags</th>
              <th>Create Time</th>
              <th>Update Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentGames.map(game => (
              <tr key={game.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedGames.includes(game.id)}
                    onChange={() => handleSelectGame(game.id)}
                  />
                </td>
                <td><img src={game.imageUrl} alt={game.name} className={styles.gameImage} /></td>
                <td>{game.name}</td>
                <td>
                  <div className={styles.descriptionContainer}>
                    {game.description}
                  </div>
                </td>
                <td>{game.price}</td>
                <td>{game.originalPrice}</td>
                <td>{`${game.discount * 100}%`}</td>
                <td>{game.categories}</td>
                <td>{Array.isArray(game.tags) ? game.tags.join(', ') : game.tags}</td>
                <td>{formatDate(game.createTime)}</td>
                <td>{formatDate(game.updateTime)}</td>
                <td>
                  <div className={styles.actions}>
                    <button onClick={() => handleEdit(game)} className={styles.editButton}>Edit</button>
                    <button onClick={() => handleDelete(game.id, game.imageUrl.split('/').pop())} className={styles.deleteButton}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
      {showAddModal && (
        <AddGame
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Games;