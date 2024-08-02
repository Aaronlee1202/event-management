<script setup>
import { User, Lock } from '@element-plus/icons-vue';
import { useUserStore } from '@/stores';
import { userRegister, userLogin } from '@/api/user';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();

const router = useRouter();
const form = ref();
const isRegister = ref(false);

watch(isRegister, () => {
  // 切換表單時，清空表單數據
  fromModel.value = {
    username: '',
    password: '',
    repassword: ''
  };
});

// 表單提交數據
const fromModel = ref({
  username: '',
  password: '',
  repassword: ''
});

const rules = {
  username: [
    { required: true, message: '請輸入用戶名', trigger: 'blur' },
    { min: 3, max: 10, message: '長度在 3 到 10 個字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '必須是 6-15 位的密碼', trigger: 'blur' }
  ],
  repassword: [
    { required: true, message: '請再次輸入密碼', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '必須是 6-15 位的密碼', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== fromModel.value.password) {
          callback(new Error('兩次輸入的密碼不一致'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ]
};

// 送出註冊前 檢查表單
const register = async () => {
  // 點擊送出時，觸發表單驗證
  // 會回應 Promise
  await form.value.validate();
  // 送出註冊
  await userRegister(fromModel.value);
  ElMessage.success('註冊成功');
  // 註冊成功後，切換到登入
  isRegister.value = false;
};

const login = async () => {
  await form.value.validate();
  // 這邊需要得到登入後的 token
  const res = await userLogin(fromModel.value);
  userStore.setToken(res.data.token);
  ElMessage.success(res.data.message);
  router.push('/');
};
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 註冊表單 -->
      <el-form
        :model="fromModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>註冊</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="fromModel.username"
            :prefix-icon="User"
            placeholder="請輸入用戶名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="fromModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="請輸入密碼"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="fromModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="請輸入再次密碼"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="register"
            class="button"
            type="primary"
            auto-insert-space
          >
            註冊
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 登入表單 -->
      <!-- 將 fromModel rules 綁定到 form -->
      <el-form
        :model="fromModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-else
      >
        <el-form-item>
          <h1>登入</h1>
        </el-form-item>
        <!-- prop 綁定驗證方法 -->
        <el-form-item prop="username">
          <el-input
            v-model="fromModel.username"
            :prefix-icon="User"
            placeholder="請輸入用戶名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="fromModel.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="請輸入密碼"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>記住我</el-checkbox>
            <el-link type="primary" :underline="false">忘記密碼？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="login"
            class="button"
            type="primary"
            auto-insert-space
            >登入</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            註冊 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background: linear-gradient(
      to right,
      rgba(15, 255, 197, 1) 0%,
      rgba(32, 175, 255, 1) 15%,
      rgba(113, 101, 255, 1) 36%
    );
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
