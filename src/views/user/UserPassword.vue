<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { updatePassword } from '@/api/user';
import { useUserStore } from '@/stores';
import { useRouter } from 'vue-router';

const router = useRouter();

const pwdForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
});

const formRef = ref(null);

const validateNotEmpty = (rule, value, callback) => {
  if (!value) {
    callback(new Error('該字段不能為空'));
  } else if (value.length < 6 || value.length > 15) {
    callback(new Error('長度應為6到15位'));
  } else {
    callback();
  }
};

const validateNewPwdDifferent = (rule, value, callback) => {
  if (value === pwdForm.value.old_pwd) {
    callback(new Error('新密碼不能與原密碼相同'));
  } else {
    callback();
  }
};

const validateRePwdMatch = (rule, value, callback) => {
  if (value !== pwdForm.value.new_pwd) {
    callback(new Error('確認密碼必須與新密碼相同'));
  } else {
    callback();
  }
};

const rules = ref({
  old_pwd: [{ validator: validateNotEmpty, trigger: 'blur' }],
  new_pwd: [
    { validator: validateNotEmpty, trigger: 'blur' },
    { validator: validateNewPwdDifferent, trigger: 'blur' }
  ],
  re_pwd: [
    { validator: validateNotEmpty, trigger: 'blur' },
    { validator: validateRePwdMatch, trigger: 'blur' }
  ]
});

const userStore = useUserStore();
const handleSubmit = async () => {
  await formRef.value.validate();
  await updatePassword(pwdForm.value);
  ElMessage({
    type: 'success',
    message: '修改成功'
  });

  // 清空 token 個人訊息
  userStore.removeToken();
  userStore.setUser({});
  // 跳轉到登入頁
  router.push('/login');
};

const onReset = () => {
  formRef.value.resetFields();
};
</script>

<template>
  <page-container title="重設密碼">
    <el-row>
      <el-col :span="12">
        <el-form
          :model="pwdForm"
          :rules="rules"
          ref="formRef"
          label-width="100px"
        >
          <!-- 原密碼 -->
          <el-form-item label="原密碼" prop="old_pwd">
            <el-input
              v-model="pwdForm.old_pwd"
              type="password"
              autocomplete="off"
            />
          </el-form-item>

          <!-- 新密碼 -->
          <el-form-item label="新密碼" prop="new_pwd">
            <el-input
              v-model="pwdForm.new_pwd"
              type="password"
              autocomplete="off"
            />
          </el-form-item>

          <!-- 確認密碼 -->
          <el-form-item label="確認密碼" prop="re_pwd">
            <el-input
              v-model="pwdForm.re_pwd"
              type="password"
              autocomplete="off"
            />
          </el-form-item>

          <!-- 按鈕組 -->
          <el-form-item>
            <el-button type="primary" @click="handleSubmit">修改密碼</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </page-container>
</template>
