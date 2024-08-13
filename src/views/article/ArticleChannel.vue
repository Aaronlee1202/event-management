<script setup>
import { onMounted, ref } from 'vue';
import { Edit, Delete } from '@element-plus/icons-vue';
import { getArticleSortList, deleteArticleSort } from '@/api/article';

import ChannelDialog from './src/ChannelEdit.vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const dialog = ref();
const channelList = ref([]);
const loading = ref(false);

onMounted(() => {
  getChannelList();
});

const getChannelList = async () => {
  loading.value = true;
  const res = await getArticleSortList(); // 獲取文章分類列表
  channelList.value = res.data.data;
  loading.value = false;
};

const onSuccess = () => {
  getChannelList();
};

const onDelete = async (row) => {
  await ElMessageBox.confirm('你確定刪除該分類嗎 :(', '溫馨提示', {
    type: 'warning',
    confirmButtonText: '確認',
    cancelButtonText: '取消'
  });
  await deleteArticleSort(row.id);
  ElMessage({
    type: 'success',
    message: '刪除成功'
  });
  getChannelList();
};

const onEditChannel = (row) => {
  dialog.value.open(row);
};

const onAddChannel = () => {
  // 變成調用子組件傳上來的 open 方法
  // 先利用 ref 獲取子組件的實例
  dialog.value.open({});
};
</script>

<template>
  <page-container title="文章分類">
    <!-- 具名插槽 -->
    <template #extra>
      <el-button @click="onAddChannel">新增分類</el-button>
    </template>
    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column label="序號" width="100" type="index"></el-table-column>
      <el-table-column label="分類名稱" prop="cate_name"></el-table-column>
      <el-table-column label="分類別名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            type="primary"
            plain
            @click="onEditChannel(row)"
          />
          <el-button
            :icon="Delete"
            type="danger"
            plain
            @click="onDelete(row)"
          />
        </template>
      </el-table-column>
      <template #empty> <el-empty description="No Data" /> </template>
    </el-table>
    <!-- 監聽 emit 事件 -->
    <ChannelDialog ref="dialog" @success="onSuccess" />
  </page-container>
</template>
