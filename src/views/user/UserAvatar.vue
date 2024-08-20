<script setup>
import { ref } from 'vue';
import { Plus, Upload } from '@element-plus/icons-vue';
import { useUserStore } from '@/stores';
import { updateUserAvatar } from '@/api/user';

// 初始化大頭貼
const userStore = useUserStore();
const imgUrl = ref(userStore.user.user_pic);

const upload = ref();

const onUploadFile = (file) => {
  // 基於 FileReader 預覽圖片
  // 生成 base64 圖片
  const reader = new FileReader();
  reader.readAsDataURL(file.raw);
  reader.onload = () => {
    imgUrl.value = reader.result;
  };
};

const onUpdateAvatar = async () => {
  // 送出請求 更換大頭貼
  await updateUserAvatar(imgUrl.value);
  // 更新用戶資訊 重新渲染
  await userStore.getUser();
  // 提示成功
  ElMessage({
    type: 'success',
    message: '更換成功'
  });
};
</script>

<template>
  <page-container title="更換大頭貼">
    <el-upload
      ref="upload"
      class="avatar-uploader"
      :auto-upload="false"
      :show-file-list="false"
      :on-change="onUploadFile"
    >
      <img v-if="imgUrl" :src="imgUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <br />
    <el-button
      type="primary"
      :icon="Plus"
      @click="upload.$el.querySelector('input').click()"
      >選擇圖片</el-button
    >
    <el-button type="success" :icon="Upload" @click="onUpdateAvatar"
      >上傳圖片</el-button
    >
  </page-container>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
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
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
</style>
