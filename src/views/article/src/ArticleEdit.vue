<script setup>
import { ref } from 'vue';
import ChannelSelect from './ChannelSelect.vue';

const drawerVisible = ref(false);
const formRef = ref(null);

const defaultFromModel = {
  title: '',
  cate_id: '',
  content: '',
  cover_img: '',
  state: ''
};

// 發布文章的 api 請求需要有五個參數
// 因此要先準備空數據
const formModel = ref({ ...defaultFromModel });

// 基於傳入的參數判斷是要新增還是編輯
// 傳入空對象代表新增
// 傳入有值的對象代表編輯
const openDrawer = (row) => {
  drawerVisible.value = true;
  console.log(row);

  if (row.id) {
    console.log('編輯文章');
  } else {
    // 新增文章前 先清空表單數據
    formModel.value = { ...defaultFromModel };
    console.log('新增文章');
  }
};

// 需要向外暴露的變量或方法
defineExpose({
  openDrawer
});
</script>

<template>
  <el-drawer
    v-model="drawerVisible"
    :title="formModel.id ? '編輯文章' : '新增文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 發表文章表單 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章標題" prop="title">
        <el-input v-model="formModel.title" placeholder="請輸入標題"></el-input>
      </el-form-item>
      <el-form-item label="文章分類" prop="cate_id">
        <ChannelSelect v-model="formModel.cate_id" width="100%"></ChannelSelect>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img"> 文件上傳 </el-form-item>
      <el-form-item label="文章內容" prop="content">
        <div class="editor">文章編輯器</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">發表</el-button>
        <el-button type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
