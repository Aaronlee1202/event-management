import axios from '@/utils/request';

export const getArticleList = () => axios.get('/my/cate/list');

export const addArticle = (data) => axios.post('/my/cate/add', data);

export const editArticle = (data) => axios.put('/my/cate/info', data);

export const deleteArticle = (id) =>
  axios.delete(`/my/cate/del`, {
    params: {
      id
    }
  });
