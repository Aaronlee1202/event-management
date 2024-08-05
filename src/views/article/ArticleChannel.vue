<script setup>
import { onMounted, ref } from 'vue';
import { getArticleList } from '@/api/article';

const channelList = ref([]);

onMounted(() => {
  getChannelList();
});

const getChannelList = async () => {
  const res = await getArticleList();
  channelList.value = res.data;
  console.log(channelList.value);
};
</script>

<template>
  <page-container title="文章分類">
    <!-- 具名插槽 -->
    <template #extra> <el-button>添加分類</el-button> </template>
    <el-table>
      <el-table-column label="序號"></el-table-column>
      <el-table-column label="分類名稱"></el-table-column>
      <el-table-column label="分類別名"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
  </page-container>
</template>
