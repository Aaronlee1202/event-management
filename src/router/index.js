import { createRouter, createWebHistory } from 'vue-router';

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
        // {
        //   path: '/article/channel',
        //   component: () => import('@/views/article/ArticleChannel.vue')
        // },
        // {
        //   path: '/user/profile',
        //   component: () => import('@/views/user/UserProfile.vue')
        // },
        // {
        //   path: '/user/avatar',
        //   component: () => import('@/views/user/UserAvatar.vue')
        // },
        // {
        //   path: '/user/password',
        //   component: () => import('@/views/user/UserPassword.vue')
        // }
      ]
    }
  ]
});

export default router;
