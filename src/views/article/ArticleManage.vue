<script setup>
import { Edit, Delete } from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue';
import ChannelSelect from './src/ChannelSelect.vue';
import { getArticleList } from '@/api/article';

const onEdit = (row) => {
  console.log('編輯文章', row);
};

const onDelete = (row) => {
  console.log('刪除文章', row);
};

const getArticle = async () => {
  const res = await getArticleList(params.value);
  articleList.value = res.data.data;
  console.log(articleList.value);
};

onMounted(() => {
  getArticle();
});

// 假的文章列表
const articleList = ref([]);

// 發請求的參數
const params = ref({
  pagenum: 1,
  pagesize: 10,
  cate_id: '',
  state: ''
});
</script>

<template>
  <page-container title="文章分類">
    <!-- 具名插槽 -->
    <template #extra> <el-button>新增文章</el-button> </template>
    <!-- 表單區域 -->
    <el-form inline>
      <el-form-item label="文章分類：">
        <!-- v-model 是 :modelValue 和 @update:modelValue 的簡寫 -->
        <!-- 這邊需要與子組件雙向綁定 cateId 和 update 事件-->
        <channel-select v-model="params.cate_id" />
      </el-form-item>
      <el-form-item label="發布狀態：">
        <el-select v-model="params.state" style="width: 120px">
          <el-option label="已發布" value="已發布" />
          <el-option label="草稿" value="草稿" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查詢</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格區域 -->
    <el-table :data="articleList" style="width: 100%">
      <el-table-column prop="title" label="文章標題" width="400">
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
