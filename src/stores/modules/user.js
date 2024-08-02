import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getUserInfo } from '@/api/user';

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('');

    // 設置 token
    const setToken = (newToken) => {
      token.value = newToken;
    };
    // 移除 token
    const removeToken = () => {
      token.value = '';
    };
    // 取得使用者資訊
    const user = ref({
      email: '',
      id: '',
      nickname: '',
      user_pic: '',
      username: ''
    });
    const getUser = async () => {
      const res = await getUserInfo();
      user.value = res.data.data;
    };

    return { token, setToken, removeToken, getUser, user };
  },
  { persist: true }
);
