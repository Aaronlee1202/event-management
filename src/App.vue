<script setup>
// import { RouterLink, RouterView } from 'vue-router'
// import { useRouter, useRoute } from 'vue-router'
// 1. 使用 Router 功能
//    const router = useRouter()
// 2. 取得路由參數 route
//    const route = useRoute()
import { onMounted } from 'vue';
// import { useUserStore, useCounterStore } from '@/stores';
// const userStore = useUserStore();
// const counterStore = useCounterStore();
// import { useRoute } from 'vue-router';
// const route = useRoute();
onMounted(() => {});
</script>

<template>
  <div>
    <router-view />
  </div>

  <!-- <div>我是 App</div>
  <text-demo></text-demo>
  <el-divider />
  <h3>{{ userStore.token }}</h3>
  <el-button @click="userStore.setToken('Bearer const')">登入</el-button>
  <el-button @click="userStore.removeToken()">登出</el-button>
  <el-divider />
  <h3>{{ counterStore.count }}</h3>
  <el-button @click="counterStore.increment()">+1</el-button>
  <el-button @click="counterStore.decrement()">-1</el-button> -->
</template>

<style scoped></style>
