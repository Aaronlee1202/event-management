import axios from '@/utils/request';

// 取得文章分類
export const getArticleSortList = () => axios.get('/my/cate/list');

// 新增文章分類
export const addArticleSort = (data) => axios.post('/my/cate/add', data);

// 編輯文章分類
export const editArticleSort = (data) => axios.put('/my/cate/info', data);

// 刪除文章分類
export const deleteArticleSort = (id) =>
  axios.delete(`/my/cate/del`, {
    params: {
      id
    }
  });

// 取得文章列表
export const getArticleList = (params) =>
  axios.get('/my/article/list', { params });

// 新增文章
export const publishArticle = (data) => axios.post('/my/article/add', data);

// 取得文章詳情
export const getArticleInfo = (id) =>
  axios.get('/my/article/info', {
    params: {
      id
    }
  });

// 編輯文章
export const editArticleInfo = (data) => axios.put('/my/article/info', data);

// 刪除文章
export const deleteArticle = (id) =>
  axios.delete(`/my/article/info`, {
    params: {
      id
    }
  });
