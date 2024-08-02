import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores';

// import.meta.env.BASE_URL is the base URL of the app.
// It is set to '/' in development and to the publicPath in production.
// import.meta.env.BASE_URL 是 vite 的環境變數 是在 vite.config.js 中配置的 base
// 簡單來說就是網址的前綴
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/LoginPage.vue')
    },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/manage', // 重定向
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
});

// 導航守衛
// 默認情況下，直接返回 undefined / true，表示放行
// 如果返回 false，則表示不放行
// 可以使用 具體的路徑 或者是 路由對象 來攔截判斷
router.beforeEach((to) => {
  // 如果沒有 token 且不在登入頁面，則跳轉到登入頁面
  const userStore = useUserStore();
  if (!userStore.token && to.path !== '/login') return '/login';

  return true; //可存在可不存在 默認true
});

export default router;
