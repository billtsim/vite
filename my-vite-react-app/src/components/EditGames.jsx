import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios/Axios';
import styles from '../CSS/EditGames.module.css';

const EditGames = ({ show, onClose, game, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [oldImageUrl, setOldImageUrl] = useState('');

  useEffect(() => {
    if (game) {
      setName(game.name || '');
      setDescription(game.description || '');
      setOriginalPrice(game.originalPrice || '');
      setCategory(game.category || '');
      setTags(Array.isArray(game.tags) ? game.tags.join(', ') : game.tags || '');
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
    formData.append('category', category);
    formData.append('tags', tags);
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
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Description:
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
          <label>
            Original Price:
            <input type="number" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} />
          </label>
          <label>
            Discount:
            <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} />
          </label>
          <label>
            Price (calculated):
            <input type="number" value={price} readOnly />
          </label>
          <label>
            Category:
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
          </label>
          <label>
            Tags:
            <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
          </label>
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