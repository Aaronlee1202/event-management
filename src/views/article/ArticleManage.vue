<script setup>
import { Edit, Delete } from '@element-plus/icons-vue';
import { ref } from 'vue';
import ChannelSelect from './src/ChannelSelect.vue';

const onEdit = (row) => {
  console.log('編輯文章', row);
};

const onDelete = (row) => {
  console.log('刪除文章', row);
};

// 假的文章列表
const articleList = ref([
  {
    id: 5961,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:53:52.604',
    state: '已發布',
    cate_name: '體育'
  },
  {
    id: 5962,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:54:30.904',
    state: null,
    cate_name: '體育'
  }
]);
</script>

<template>
  <page-container title="文章分類">
    <!-- 具名插槽 -->
    <template #extra> <el-button>新增文章</el-button> </template>
    <!-- 表單區域 -->
    <el-form inline>
      <el-form-item label="文章分類：">
        <channel-select />
      </el-form-item>
      <el-form-item label="發布狀態：">
        <el-select>
          <el-option label="已發布" value="已發布" />
          <el-option label="未發布" value="未發布" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查詢</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格區域 -->
    <el-table :data="articleList" style="width: 100%">
      <el-table-column prop="title" label="文章標題">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="pub_date" label="發布時間" />
      <el-table-column prop="state" label="發布狀態" />
      <el-table-column prop="cate_name" label="分類" />
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            type="primary"
            circle
            plain
            @click="onEdit(row)"
          >
          </el-button>
          <el-button
            :icon="Delete"
            type="danger"
            circle
            plain
            @click="onDelete(row)"
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </page-container>
</template>
