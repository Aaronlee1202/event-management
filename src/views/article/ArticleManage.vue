<script setup>
import { Edit, Delete } from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue';
import ChannelSelect from './src/ChannelSelect.vue';
import { getArticleList } from '@/api/article';
import { formatTime } from '@/utils/format';
import ArticleEdit from './src/ArticleEdit.vue';

onMounted(() => {
  getArticle();
});

// 文章列表
const articleList = ref([]);
// 頁數
const total = ref(0);
// 發請求的參數
const params = ref({
  pagenum: 1, // 當前頁碼
  pagesize: 4, // 每頁顯示條數
  cate_id: '',
  state: ''
});
const loading = ref(false);
const addArticle = ref();

// 打開抽屜新增文章
const openDrawer = () => {
  addArticle.value.openDrawer({});
};

// 獲取文章列表
const getArticle = async () => {
  loading.value = true;
  const res = await getArticleList(params.value);
  articleList.value = res.data.data;
  total.value = res.data.total;
  loading.value = false;
};

const handleSizeChange = (size) => {
  params.value.pagenum = 1;
  params.value.pagesize = size;
  getArticle();
  console.log('當前每頁的條數', size);
};

const handleCurrentChange = (page) => {
  params.value.pagenum = page;
  getArticle();
  console.log('當前頁碼', page);
};

const onSearch = () => {
  params.value.pagenum = 1;
  getArticle();
  console.log('查詢文章');
};

const onReset = () => {
  params.value = {
    pagenum: 1,
    pagesize: 4,
    cate_id: '',
    state: ''
  };
  getArticle();
  console.log('重置文章');
};

const onEdit = (row) => {
  addArticle.value.openDrawer(row);
};

const onDelete = (row) => {
  console.log('刪除文章', row);
};

// 監聽子組件發布或修改成功
const onSuccess = (type) => {
  if (type === 'add') {
    // 發布成功 渲染最後一頁
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize);
    params.value.pagenum = lastPage;
    console.log('最後一頁', lastPage);
  }
  getArticle();
};
</script>

<template>
  <page-container title="文章分類">
    <!-- 具名插槽 -->
    <template #extra>
      <el-button @click="openDrawer">新增文章</el-button>
    </template>
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
        <el-button type="primary" @click="onSearch">查詢</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格區域 -->
    <el-table :data="articleList" style="width: 100%" v-loading="loading">
      <el-table-column prop="title" label="文章標題" width="400">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="pub_date" label="發布時間">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
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
    <!-- 表單區域 -->
    <el-pagination
      style="margin-top: 20px; justify-content: flex-end"
      :current-page="params.pagenum"
      :page-size="params.pagesize"
      :page-sizes="[2, 5, 10]"
      :background="true"
      :total="total"
      layout="jumper, total, sizes, prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <ArticleEdit ref="addArticle" @success="onSuccess" />
  </page-container>
</template>
