import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // 替换为你的 API 基础 URL
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // 从 localStorage 获取 token
    if (token) {
      config.headers['Authorization'] = token; // 直接将 token 添加到请求头中
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.code === 0) {
      // code 为 0 表示未登录或登录已失效
      localStorage.removeItem('token'); // 清除失效的 token
      // 使用 window.location.href 重定向到登录页
       window.location.href = '/login';
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;