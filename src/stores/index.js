import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;

// import { useUserStore } from './modules/user'
// export { useUserStore }
export * from './modules/user'; // 等同以上兩行，將所有export的東西都export出去
export * from './modules/counter';
