<script setup>
import PageContainer from '@/components/PageContainer.vue';
import { useUserStore } from '@/stores';
import { ref } from 'vue';
import { editUserInfo } from '@/api/user';
import { ElMessage } from 'element-plus';

const {
  user: { username, nickname, email, id },
  getUser
} = useUserStore();

const formRef = ref();

// 使用 pinia 中的初始值，無須響應式
const userInfo = ref({ username, nickname, email, id });

const submitForm = async () => {
  try {
    // 驗證表單
    await formRef.value.validate();
    // 提交修改表單
    await editUserInfo(userInfo.value);
    // 提交成功後，更新用戶資訊
    await getUser();
    // 提示成功
    ElMessage({
      type: 'success',
      message: '修改成功'
    });
  } catch (error) {
    console.log(error);
  }
};

const rules = {
  nickname: [
    { required: true, message: '請輸入用戶暱稱', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '暱稱必須是2-10位的非空字符串',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '請輸入用戶信箱', trigger: 'blur' },
    { type: 'email', message: '信箱格式不正確', trigger: 'blur' }
  ]
};
</script>

<template>
  <page-container title="基本資料">
    <!-- 表單部分 -->
    <el-row>
      <el-col :span="12">
        <el-form
          :model="userInfo"
          :rules="rules"
          ref="formRef"
          label-width="100px"
          size="large"
        >
          <el-form-item label="登入名稱">
            <el-input v-model="userInfo.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="用戶暱稱" prop="nickname">
            <el-input v-model="userInfo.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用戶信箱" prop="email">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">送出修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </page-container>
</template>
