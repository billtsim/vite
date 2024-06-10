import React, { useState } from 'react';
import axiosInstance from '../../axios/Axios';
import styles from '../../CSS/managementPageCSS/AddGame.module.css';
import TagSelector from './TagSelector'; // 引入 TagSelector 组件

const AddGame = ({ show, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState(null); // 新增状态变量
  const [minRequirements, setMinRequirements] = useState({
    os: '',
    processor: '',
    memory: '',
    graphics: '',
    directX: '',
    network: '',
    storage: ''
  });
  const [recRequirements, setRecRequirements] = useState({
    os: '',
    processor: '',
    memory: '',
    graphics: '',
    directX: '',
    network: '',
    storage: ''
  });

  const allCategories = [
    'Action Game', 'Action Role-Playing Game', 'Adventure Game', 'Action Adventure Game', 
    'Card Game', 'Fighting Game', 'Role-Playing Game', 'Real-Time Strategy', 
    'Turn-Based Strategy', 'Massively Multiplayer Online Role-Playing Game', 
    'Multi-User Dungeon/Dimension/Domain', 'Simulation Game', 'Simulation Role-Playing Game', 
    'Shooting Game', 'First-Person Shooter', 'Interactive Fiction', 'Third-Person Shooter', 
    'Sports Game', 'Tabletop Board Game', 'Puzzle Game', 'Racing Game'
  ];

  const allTags = ['new game', 'hot sale', 'popular game', 'up coming discount', 'recommended', 'free game', 'Carousel', 'featuredGame'];

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prevImages => [...prevImages, ...files]);
  };

  const handleMainImageChange = (e) => {
    setMainImage(e.target.files[0]);
  };

  const handleImageRemove = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handleMinRequirementsChange = (e) => {
    const { name, value } = e.target;
    setMinRequirements(prevState => ({ ...prevState, [name]: value }));
  };

  const handleRecRequirementsChange = (e) => {
    const { name, value } = e.target;
    setRecRequirements(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 去除 tags 中的空格并合并成字符串
    const trimmedTags = tags.map(tag => tag.trim()).join(',');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('originalPrice', originalPrice);
    formData.append('categories', categories.join(',')); // 将 categories 也处理成字符串
    formData.append('tags', trimmedTags);
    formData.append('discount', discount);
    if (mainImage) {
      formData.append('mainImage', mainImage);
    }
    formData.append('minRequirements', JSON.stringify(minRequirements));
    formData.append('recRequirements', JSON.stringify(recRequirements));
    images.forEach((image, index) => {
      formData.append('image', image);
    });

    try {
      await axiosInstance.post('/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      onSave(); // 只需调用 onSave 以通知父组件
    } catch (err) {
      console.error('Error adding game:', err);
    }
  };

  if (!show) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Add Game</h2>
          <span className={styles.close} onClick={onClose}>&times;</span>
        </div>
        <form onSubmit={handleSubmit}>
          <label className={styles.name}>
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
            Main Image:
            <input type="file" onChange={handleMainImageChange} disabled={mainImage}/>
          </label>
          {mainImage && (
          <div className={styles.imageName}>
            {mainImage.name}
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => {
                  setMainImage(null);
                }}
              >
                &times;
              </button>
              </div>
            )}
        {mainImage && (
          <div className={styles.imagePreviewContainer}>
              <img
                key={0}
                src={URL.createObjectURL(mainImage)}
                alt={`Preview ${0}`}
                className={styles.imagePreview}
              />
          </div>
        )}
          <label>
            New Images:
            <input type="file" onChange={handleImageChange} multiple />
          </label>
          <div className={styles.imageNamesContainer}>
            {images.map((image, index) => (
              <div key={index} className={styles.imageName}>
                {image.name}
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => handleImageRemove(index)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <div className={styles.imagePreviewContainer}>
            {images.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt={`Preview ${index}`}
                className={styles.imagePreview}
              />
            ))}
          </div>
          <fieldset>
            <legend>Minimum Requirements</legend>
            <label>
              Operating System:
              <input type="text" name="os" value={minRequirements.os} onChange={handleMinRequirementsChange} />
            </label>
            <label>
              Processor:
              <input type="text" name="processor" value={minRequirements.processor} onChange={handleMinRequirementsChange} />
            </label>
            <label>
              Memory:
              <input type="text" name="memory" value={minRequirements.memory} onChange={handleMinRequirementsChange} />
            </label>
            <label>
              Graphics:
              <input type="text" name="graphics" value={minRequirements.graphics} onChange={handleMinRequirementsChange} />
            </label>
            <label>
              DirectX:
              <input type="text" name="directX" value={minRequirements.directX} onChange={handleMinRequirementsChange} />
            </label>
            <label>
              Network:
              <input type="text" name="network" value={minRequirements.network} onChange={handleMinRequirementsChange} />
            </label>
            <label>
              Storage:
              <input type="text" name="storage" value={minRequirements.storage} onChange={handleMinRequirementsChange} />
            </label>
          </fieldset>
          <fieldset>
            <legend>Recommended Requirements</legend>
            <label>
              Operating System:
              <input type="text" name="os" value={recRequirements.os} onChange={handleRecRequirementsChange} />
            </label>
            <label>
              Processor:
              <input type="text" name="processor" value={recRequirements.processor} onChange={handleRecRequirementsChange} />
            </label>
            <label>
              Memory:
              <input type="text" name="memory" value={recRequirements.memory} onChange={handleRecRequirementsChange} />
            </label>
            <label>
              Graphics:
              <input type="text" name="graphics" value={recRequirements.graphics} onChange={handleRecRequirementsChange} />
            </label>
            <label>
              DirectX:
              <input type="text" name="directX" value={recRequirements.directX} onChange={handleRecRequirementsChange} />
            </label>
            <label>
              Network:
              <input type="text" name="network" value={recRequirements.network} onChange={handleRecRequirementsChange} />
            </label>
            <label>
              Storage:
              <input type="text" name="storage" value={recRequirements.storage} onChange={handleRecRequirementsChange} />
            </label>
          </fieldset>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default AddGame;