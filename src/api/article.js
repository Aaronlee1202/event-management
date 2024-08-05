import axios from '@/utils/request';

export const getArticleList = () => axios.get('/my/cate/list');
