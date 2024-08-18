<script setup>
import { onMounted, ref } from 'vue';
import { getArticleSortList } from '@/api/article';

const channelList = ref([]);

defineProps({
  // 組件的寬度 可以由外部傳入設定
  width: {
    type: String,
    default: '120px'
  }
});

// 此組件有使用 v-model 進行雙向綁定
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
  <el-select v-model="cateId" :style="{ width }">
    <el-option
      v-for="list in channelList"
      :key="list.id"
      :label="list.cate_name"
      :value="list.id"
    />
  </el-select>
</template>
