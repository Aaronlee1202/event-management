<script setup>
import { ref } from 'vue';
const drawerVisible = ref(false);

// 基於傳入的參數判斷是要新增還是編輯
// 傳入空對象代表新增
// 傳入有值的對象代表編輯
const openDrawer = (row) => {
  drawerVisible.value = true;
  console.log(row);
};

// 需要向外暴露的變量或方法
defineExpose({
  openDrawer
});
</script>

<template>
  <!-- 抽屜 -->
  <el-drawer title="新增文章" v-model="drawerVisible" size="40%">
    <el-form>
      <el-form-item>
        <el-button type="primary">確定</el-button>
        <el-button @click="drawerVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
