import { createApp } from 'vue';
import pinia from '@/stores/index';
import '@/assets/main.scss';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(ElementPlus);
app.use(pinia);
app.use(router);

app.mount('#app');
