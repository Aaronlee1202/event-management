import axios from '@/utils/request';

export const userRegister = ({ username, password, repassword }) =>
  axios.post('/api/reg', { username, password, repassword });

export const userLogin = ({ username, password }) =>
  axios.post('/api/login', { username, password });
// function 加上 {} 則需要 return

// 取得使用者資訊
export const getUserInfo = () => axios.get('/my/userinfo');
