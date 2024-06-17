import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios/Axios';
import Navigation from '../home page/Navigation';
import styles from '../../CSS/allProductCSS/AllProduct.module.css';
import _ from 'lodash';
import { FaSearch } from 'react-icons/fa'; // 导入搜索图标

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [filters, setFilters] = useState({
    name: '',
    categories: '',
    tags: '',
    minPrice: 0,
    maxPrice: 1000,
    sortBy: ''
  });
  const [inputValue, setInputValue] = useState(''); // 新增状态保存用户输入的值
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(12);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const debounceFetch = useRef(_.debounce((filters, page) => {
    fetchProducts(filters, page);
    fetchTotalProducts(filters);
  }, 300)).current;

  const fetchProducts = async (filters, page) => {
    setLoading(true);
    try {
      const { name, categories, tags, minPrice, maxPrice, sortBy } = filters;
      const params = new URLSearchParams({
        page: page,
        limit: gamesPerPage,
        name,
        categories,
        tags,
        minPrice,
        maxPrice,
        sortBy
      });

      const response = await axiosInstance.get(`/product?${params.toString()}`);
      const productList = response.data.data;
      setProducts(productList);

      // Extract unique categories and tags
      const uniqueCategories = [...new Set(productList.flatMap(product => product.categories.split(',')))];
      const uniqueTags = [...new Set(productList.flatMap(product => product.tags.split(',')))];
      setCategories(uniqueCategories);
      setTags(uniqueTags);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalProducts = async (filters) => {
    try {
      const { name, categories, tags, minPrice, maxPrice } = filters;
      const params = new URLSearchParams({
        name,
        categories,
        tags,
        minPrice,
        maxPrice
      });

      const response = await axiosInstance.get(`/product/count?${params.toString()}`);
      setTotalProducts(response.data.data); // 设置总记录数
    } catch (error) {
      console.error('Failed to fetch total products:', error);
    }
  };

  useEffect(() => {
    debounceFetch(filters, currentPage);
  }, [filters, currentPage]);

  const handleFilterChange = useCallback(
    (name, value) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value
      }));
      setCurrentPage(1); // Reset to first page when filters change
    },
    []
  );

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      name: inputValue
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    handleFilterChange(name, value);
  };

  const handleTagChange = (e) => {
    const { name, value } = e.target;
    handleFilterChange(name, value);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      maxPrice: value
    }));
  };

  const handlePriceChangeEnd = (e) => {
    debounceFetch(filters, currentPage);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (e) => {
    const { value } = e.target;
    setFilters({
      ...filters,
      sortBy: value
    });
    setCurrentPage(1); // Reset to first page when sort changes
  };

  const handleProductClick = (name) => {
    navigate(`/product-detail/${name}`);
  };

  // Render page numbers
  const renderPageNumbers = () => {
    const totalPages = Math.ceil(totalProducts / gamesPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? styles.activePage : styles.pageButton}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div style={{ backgroundColor: 'black', color: 'white', width: 'auto', display: 'flex', flexDirection: 'column' }}>
      <Navigation />
      <div className={styles.allProductContainer}>
        <div className={styles.filterContainer}>
          <div className={`${styles.searchContainer} ${styles.filterItem}`}>
            <input
              type="text"
              name="name"
              placeholder="搜索游戏"
              value={inputValue} // 使用 inputValue 作为输入框的值
              onChange={handleInputChange}
              className={styles.filterInput}
              style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' }}
            />
            <button style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }} onClick={handleSearch} className={styles.searchButton}>
              <FaSearch className={styles.searchIcon} /> {/* 使用搜索图标 */}
            </button>
          </div>
          <select name="categories" value={filters.categories} onChange={handleCategoryChange} className={`${styles.filterSelect} ${styles.filterItem}`}>
            <option value="">所有类别</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          <select name="tags" value={filters.tags} onChange={handleTagChange} className={`${styles.filterSelect} ${styles.filterItem}`}>
            <option value="">所有标签</option>
            {tags.map((tag, index) => (
              <option key={index} value={tag}>{tag}</option>
            ))}
          </select>
          <div className={`${styles.priceFilter} ${styles.filterItem}`}>
            <span>价格: 低于 HK${filters.maxPrice}</span>
            <input
              type="range"
              name="price"
              min="0"
              max="1000"
              value={filters.maxPrice}
              onChange={handlePriceChange}
              onMouseUp={handlePriceChangeEnd}
              onTouchEnd={handlePriceChangeEnd}
              className={styles.priceRange}
            />
          </div>
          <select name="sortBy" value={filters.sortBy} onChange={handleSortChange} className={`${styles.filterSelect} ${styles.filterItem}`}>
            <option value="">排序方式</option>
            <option value="priceAsc">价格：低至高</option>
            <option value="priceDesc">价格：高至低</option>
            <option value="nameAsc">名称：A-Z</option>
            <option value="createTime">最新发布</option>
          </select>
        </div>
        
        {loading ? (
          <div>加载中...</div>
        ) : (
          <div className={styles.productList}>
            {products.map(product => (
              <div key={product.id} className={styles.productCard} onClick={() => handleProductClick(product.name)}>
                <img src={product.mainImage} alt={product.name} className={styles.productImage} />
                <div className={styles.productInfo}>
                  <h3>{product.name}</h3>
                  <p>HK${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className={styles.pagination}>
          {renderPageNumbers()}
        </div>
      </div>
    </div>
  );
};

export default AllProduct;