<script setup>
import { onMounted, ref } from 'vue';
import { getArticleSortList } from '@/api/article';

const channelList = ref([]);

const cateId = defineModel('cateId', {
  type: [Number, String]
});

const getChannelList = async () => {
  const res = await getArticleSortList();
  channelList.value = res.data.data;
};

onMounted(() => {
  getChannelList();
});
</script>

<template>
  <el-select v-model="cateId" style="width: 120px">
    <el-option
      v-for="list in channelList"
      :key="list.id"
      :label="list.cate_name"
      :value="list.id"
    />
  </el-select>
</template>
