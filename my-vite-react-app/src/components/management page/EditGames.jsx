import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios/Axios';
import styles from '../../CSS/managementPageCSS/EditGames.module.css';
import TagSelector from './TagSelector';

const EditGames = ({ show, onClose, game, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [oldImageUrls, setOldImageUrls] = useState([]);
  const [deletedOldImageUrls, setDeletedOldImageUrls] = useState([]);
  const [existingMainImage, setExistingMainImage] = useState('');
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

  useEffect(() => {
    if (game) {
      setName(game.name || '');
      setDescription(game.description || '');
      setOriginalPrice(game.originalPrice !== null && game.originalPrice !== undefined ? game.originalPrice : '');
      setCategories(game.categories ? game.categories.split(',').map(cat => cat.trim()) : []);
      setTags(game.tags ? game.tags.split(',').map(tag => tag.trim()) : []);
      setDiscount(game.discount || 0);
      setOldImageUrls(game.imageUrl
        ? game.imageUrl.split(',').map(url => url.trim()).filter(Boolean)
        : []);
      setMainImage(game.mainImage || null);
      setExistingMainImage(game.mainImage || '');
      setMinRequirements(typeof game.minRequirements === 'string' ? JSON.parse(game.minRequirements) : game.minRequirements || {
        os: '',
        processor: '',
        memory: '',
        graphics: '',
        directX: '',
        network: '',
        storage: ''
      });
      setRecRequirements(typeof game.recRequirements === 'string' ? JSON.parse(game.recRequirements) : game.recRequirements || {
        os: '',
        processor: '',
        memory: '',
        graphics: '',
        directX: '',
        network: '',
        storage: ''
      });
    }
  }, [game]);

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

  const handleOldImageRemove = (index) => {
    const fullUrl = oldImageUrls[index];
    const fileNameToDelete = fullUrl.substring(fullUrl.lastIndexOf('/') + 1);
    setDeletedOldImageUrls(prev => [...prev, fileNameToDelete]);
    setOldImageUrls(prevUrls => prevUrls.filter((_, i) => i !== index));
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
    const formData = new FormData();
    formData.append('id', game.id);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('originalPrice', originalPrice);
    formData.append('categories', categories.join(', '));
    formData.append('tags', tags.join(', '));
    formData.append('discount', discount);

    const existingImages = oldImageUrls.filter(url => !deletedOldImageUrls.includes(url));
    formData.append('existingImages', existingImages.join(','));

    images.forEach((image) => {
      formData.append('images', image);
    });

    deletedOldImageUrls.forEach((fileName) => {
      formData.append('oldImageUrl', fileName);
    });
    
    if (mainImage && typeof mainImage !== 'string') {
      formData.append('mainImage', mainImage);
    } else if (existingMainImage) {
      formData.append('existingMainImage', existingMainImage);
    }
    
    formData.append('minRequirements', JSON.stringify(minRequirements));
    formData.append('recRequirements', JSON.stringify(recRequirements));
    
    try {
      await axiosInstance.put('/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      onSave();
    } catch (err) {
      console.error('Error updating game:', err);
    }
    };
    
    if (!show) return null;
    
    return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Edit Game</h2>
          <span className={styles.closeButton} onClick={onClose}>&times;</span>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={styles.inputField} required />
          </label>
          <label className={styles.label}>
            Description:
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={styles.textareaField} required />
          </label>
          <label className={styles.label}>
            Original Price:
            <input type="number" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} className={styles.inputField} required />
          </label>
          <label className={styles.label}>
            Discount:
            <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} className={styles.inputField} required />
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
          <label className={styles.label}>
            Main Image:
            <input type="file" onChange={handleMainImageChange} disabled={mainImage} className={styles.inputField} />
          </label>
          <div className={styles.imageNamesContainer}>
            {mainImage && (
              <div className={styles.imageName}>
                {typeof mainImage === 'string' ? (
                  <>
                    {mainImage}
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => {
                        const fileNameToDelete = mainImage.substring(mainImage.lastIndexOf('/') + 1);
                        setDeletedOldImageUrls(prev => [...prev, fileNameToDelete]);
                        setMainImage(null);
                        setExistingMainImage(null);
                      }}
                    >
                      &times;
                    </button>
                  </>
                ) : (
                  <>
                    {mainImage.name}
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        setMainImage(null);
                      }}
                    >
                      &times;
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
          {mainImage && <div className={styles.imagePreviewContainer}>
            <img
              key={0}
              src={typeof mainImage == 'string' ? mainImage : URL.createObjectURL(mainImage)}
              alt={`url error`}
              className={styles.imagePreview}
            />
          </div>}
          <label className={styles.label}>
            New Images:
            <input type="file" onChange={handleImageChange} multiple className={styles.inputField} />
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
          <div className={styles.imageNamesContainer}>
            {oldImageUrls.filter(Boolean).map((fileName, index) => (
              <div key={index} className={styles.imageName}>
                {fileName}
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => handleOldImageRemove(index)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <div className={styles.imagePreviewContainer}>
            {oldImageUrls.map((image, index) => (
              <img
                key={index}
                src={`${image}`}
                alt={`Preview ${index}`}
                className={styles.imagePreview}
              />
            ))}
          </div>
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Minimum Requirements</legend>
            <label className={styles.label}>
              Operating System:
              <input type="text" name="os" value={minRequirements.os} onChange={handleMinRequirementsChange} className={styles.inputField} />
            </label>
            <label className={styles.label}>
              Processor:
              <input type="text" name="processor" value={minRequirements.processor} onChange={handleMinRequirementsChange} className={styles.inputField} />
            </label>
            <label className={styles.label}>
              Memory:
              <input type="text" name="memory" value={minRequirements.memory} onChange={handleMinRequirementsChange} className={styles.inputField} />
            </label>
            <label className={styles.label}>
              Graphics:
              <input type="text" name="graphics" value={minRequirements.graphics} onChange={handleMinRequirementsChange} className={styles.inputField} />
            </label>
            <label className={styles.label}>
              DirectX:
              <input type="text" name="directX" value={minRequirements.directX} onChange={handleMinRequirementsChange} className={styles.inputField} />
            </label>
            <label className={styles.label}>
              Network:
              <input type="text" name="network" value={minRequirements.network} onChange={handleMinRequirementsChange} className={styles.inputField} />
            </label>
            <label className={styles.label}>
              Storage:
              <input type="text" name="storage" value={minRequirements.storage} onChange={handleMinRequirementsChange} className={styles.inputField} />
            </label>
          </fieldset>
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Recommended Requirements</legend>
            <label className={styles.label}>
              Operating System:
              <input type="text" name="os" value={recRequirements.os} onChange={handleRecRequirementsChange} className={styles.inputField} />
            </label>
            <label className={styles.label}>
              Processor:
              <input type="text" name="processor" value={recRequirements.processor} onChange={handleRecRequirementsChange} className={styles.inputField} />
            </label>
            <label className={styles.label}>
              Memory:
              <input type="text" name="memory" value={recRequirements.memory} onChange={handleRecRequirementsChange} className={styles.inputField} />
            </label>
            <label className={styles.label}>
              Graphics:
              <input type="text" name="graphics" value={recRequirements.graphics} onChange={handleRecRequirementsChange} className={styles.inputField} />
            </label>
            <label className={styles.label}>
              DirectX:
              <input type="text" name="directX" value={recRequirements.directX} onChange={handleRecRequirementsChange} className={styles.inputField} />
            </label>
            <label className={styles.label}>
              Network:
              <input type="text" name="network" value={recRequirements.network} onChange={handleRecRequirementsChange} className={styles.inputField} />
            </label>
            <label className={styles.label}>
              Storage:
              <input type="text" name="storage" value={recRequirements.storage} onChange={handleRecRequirementsChange} className={styles.inputField} />
            </label>
          </fieldset>
          <button type="submit" className={styles.saveButton}>Save</button>
        </form>
      </div>
    </div>
    );
    };
    
    export default EditGames;