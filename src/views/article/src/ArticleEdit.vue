<script setup>
import { ref } from 'vue';
import ChannelSelect from './ChannelSelect.vue';
import { Plus } from '@element-plus/icons-vue';
import { nextTick } from 'vue';

import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { publishArticle, getArticleInfo } from '@/api/article';
import { baseURL } from '@/utils/request';
import axios from 'axios';
import { ElMessage } from 'element-plus';

const drawerVisible = ref(false);
const formRef = ref();
const quillEditorRef = ref();

// 圖片上傳
const imgUrl = ref('');
// 上傳圖片 預覽
const onUploadFile = (file) => {
  imgUrl.value = URL.createObjectURL(file.raw);

  formModel.value.cover_img = file.raw;
};

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

// 通知父組件
const emit = defineEmits(['success']);
// 提交文章
const onPublish = async (state) => {
  formModel.value.state = state;

  const formData = new FormData();
  for (let key in formModel.value) {
    console.log(key, formModel.value[key]);

    formData.append(key, formModel.value[key]);
  }
  console.log(formData.get('cover_img'));

  if (formModel.value.id) {
    console.log('編輯文章');
  } else {
    console.log('發布文章');
    try {
      await publishArticle(formData);
      ElMessage({
        type: 'success',
        message: '新增成功'
      });
      // 通知父組件新增成功
      emit('success', 'add');
    } catch (error) {
      console.error('發布文章失敗:', error);
      ElMessage({
        type: 'error',
        message: '發布文章失敗'
      });
    }
  }
  drawerVisible.value = false;
};

// 基於傳入的參數判斷是要新增還是編輯
// 傳入空對象代表新增
// 傳入有值的對象代表編輯
const openDrawer = async (row) => {
  drawerVisible.value = true;
  if (row.id) {
    const res = await getArticleInfo(row.id);
    formModel.value = res.data.data;
    // 圖片需要單獨處理
    imgUrl.value = baseURL + formModel.value.cover_img;
    // NOTICE: 編輯之後要將圖片傳送給後端時，後端圖片需要的格式為 File
    // 因此需要圖片轉換為 File 對象，並且儲存起來
    formModel.value.cover_img = await imageURLToFile(
      imgUrl.value,
      formModel.value.cover_img
    );

    console.log('編輯文章');
  } else {
    // 發布文章前 先清空表單數據
    formModel.value = { ...defaultFromModel };
    imgUrl.value = '';

    nextTick(() => {
      // 清空編輯器內容
      quillEditorRef.value.setHTML('');
    });
    console.log('發布文章');
  }
};

// 使用 axios 將圖片地址轉換為 File 對象
const imageURLToFile = async (url, fileName) => {
  try {
    // 1. 使用 axios 下載圖片
    const res = await axios.get(url, { responseType: 'arraybuffer' });
    const imageData = res.data;
    // 2. 將圖片轉換為 Blob 對象
    const blob = new Blob([imageData], { type: res.headers['content-type'] });
    // 3. 將 Blob 對象轉換為 File 對象
    return new File([blob], fileName, { type: blob.type });
  } catch (error) {
    console.error('圖片轉換失敗:', error);
    throw error;
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
    :title="formModel.id ? '編輯文章' : '發布文章'"
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
      <el-form-item label="文章封面" prop="cover_img">
        <!-- 已關閉自動上傳 -->
        <!-- 只需要在本地預覽 無須及時上傳 -->
        <!-- URL.createObjectURL(...) create 一個本地預覽的地址 -->
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章內容" prop="content">
        <div class="editor">
          <quill-editor
            ref="quillEditorRef"
            theme="snow"
            v-model:content="formModel.content"
            contentType="html"
          >
          </quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPublish('已发布')">發表</el-button>
        <el-button type="info" @click="onPublish('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}

.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
