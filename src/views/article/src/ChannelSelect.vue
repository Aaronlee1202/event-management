<script setup>
import { onMounted, ref } from 'vue';
import { getArticleList } from '@/api/article';

const channelList = ref([]);

const getChannelList = async () => {
  const res = await getArticleList();
  channelList.value = res.data.data;

  console.log(channelList.value);
};

onMounted(() => {
  getChannelList();
});
</script>

<template>
  <el-select>
    <el-option
      v-for="list in channelList"
      :key="list.id"
      :label="list.cate_name"
      :value="list.id"
    />
  </el-select>
</template>
