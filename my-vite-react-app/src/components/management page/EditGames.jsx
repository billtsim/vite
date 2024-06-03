import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios/Axios';
import styles from '../CSS/EditGames.module.css';
import TagSelector from './TagSelector'; // 引入 TagSelector 组件

const EditGames = ({ show, onClose, game, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [oldImageUrl, setOldImageUrl] = useState('');

  const allCategories = [
    'Action Game', 'Action Role-Playing Game', 'Adventure Game', 'Action Adventure Game', 
    'Card Game', 'Fighting Game', 'Role-Playing Game', 'Real-Time Strategy', 
    'Turn-Based Strategy', 'Massively Multiplayer Online Role-Playing Game', 
    'Multi-User Dungeon/Dimension/Domain', 'Simulation Game', 'Simulation Role-Playing Game', 
    'Shooting Game', 'First-Person Shooter', 'Interactive Fiction', 'Third-Person Shooter', 
    'Sports Game', 'Tabletop Board Game', 'Puzzle Game', 'Racing Game'
  ];

  const allTags = ['new game', 'hot sale', 'popular game', 'up coming discount', 'recommended', 'free game'];

  useEffect(() => {
    if (game) {
      setName(game.name || '');
      setDescription(game.description || '');
      setOriginalPrice(game.originalPrice || '');
      setCategories(game.categories ? game.categories.split(',').map(cat => cat.trim()) : []);
      setTags(game.tags ? game.tags.split(',').map(tag => tag.trim()) : []);
      setDiscount(game.discount || 0);
      setPrice(game.price || '');
      setOldImageUrl(game.imageUrl ? game.imageUrl.split('/').pop() : '');
    }
  }, [game]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', game.id);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('originalPrice', originalPrice);
    formData.append('categories', categories.join(', ')); // 转换为字符串
    formData.append('tags', tags.join(', ')); // 转换为字符串
    formData.append('discount', discount);
    if (image) {
      formData.append('image', image);
      formData.append('oldImageUrl', oldImageUrl); // 传递旧图片URL
    }

    try {
      await axiosInstance.put('/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      onSave(); // 只需调用 onSave 以通知父组件
    } catch (err) {
      console.error('Error updating game:', err);
    }
  };

  if (!show) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Edit Game</h2>
          <span className={styles.close} onClick={onClose}>&times;</span>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Description:
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
          </label>
          <label>
            Original Price:
            <input type="number" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} required />
          </label>
          <label>
            Discount:
            <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} required />
          </label>
          <TagSelector
            label="Categories"
            options={allCategories}
            selectedOptions={categories}
            onChange={setCategories}
          />
          <TagSelector
            label="Tags"
            options={allTags}
            selectedOptions={tags}
            onChange={setTags}
          />
          <label>
            Image:
            <input type="file" onChange={handleImageChange} />
          </label>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditGames;