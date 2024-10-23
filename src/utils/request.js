import axios from 'axios';
import { useUserStore } from '@/stores';
import { ElMessage } from 'element-plus';

const baseURL = import.meta.env.VITE_APP_BASE_API;

const instance = axios.create({
  // TODO: baseURL
  baseURL,
  timeout: 10000
});

// 請求的攔截器
instance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // TODO: 取得 Token
    const userStore = useUserStore();
    if (userStore.token) {
      config.headers.Authorization = userStore.token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 回應的攔截器
instance.interceptors.response.use(
  (response) => {
    // Do something with response data
    // TODO: 處理失敗的情況
    // 這裡能通過通常是狀態 200
    if (response.data.code === 0) {
      return response;
    }
    // TODO: 顯示錯誤訊息
    ElMessage.error(response.data.message || '服務異常');
    return Promise.reject(response.data);
  },
  (error) => {
    // Do something with response error
    // TODO: 401錯誤處理
    // 可能是 token 過期，或者是 token 無效
    if (error.response?.status === 401) {
      // 清除 token
      const userStore = useUserStore();
      userStore.removeToken();
      // 跳轉到登入頁面
      // router.push('/login');
    }
    // 默認錯誤訊息
    ElMessage.error(error.response.data.message || '服務異常');
    return Promise.reject(error);
  }
);

export default instance;
export { baseURL };
