<script setup>
import { ref } from 'vue';
import { editArticle, addArticle } from '@/api/article';
import { ElMessage } from 'element-plus';

const formRef = ref();
const dialogVisible = ref(false);

const formModel = ref({
  cate_alias: '',
  cate_name: ''
});

// 這是一個封裝的彈出視窗組件
// 可以暴露一些彈出視窗的方法
// 例如：show、hide、open
// open: () => {} 空的代表沒有值 無須渲染
// open: () => { id, name } 有值代表需要渲染
// 再基於傳入的值判斷是要新增還是編輯
const open = async (row) => {
  dialogVisible.value = true;
  formModel.value = { ...row };
};

const rules = {
  cate_name: [
    { required: true, message: '請輸入分類名稱', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分類名必須是1-10位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '請輸入分類別名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分類別名必須是1-15位的字母數字',
      trigger: 'blur'
    }
  ]
};

const emit = defineEmits(['success']);

const onSubmit = async () => {
  await formRef.value.validate();
  console.log(formModel.value);

  formModel.value.id
    ? await editArticle(formModel.value)
    : await addArticle(formModel.value);

  ElMessage({
    type: 'success',
    message: formModel.value.id ? '修改成功' : '新增成功'
  });

  dialogVisible.value = false;
  // 通知父組件重新獲取分類列表
  emit('success');
};

// 向外部暴露的變量
defineExpose({
  open
});
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '編輯分類' : '新增分類'"
    width="30%"
  >
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="分類名稱" prop="cate_name">
        <el-input
          v-model="formModel.cate_name"
          minlength="1"
          maxlength="10"
        ></el-input>
      </el-form-item>
      <el-form-item label="分類別名" prop="cate_alias">
        <el-input
          v-model="formModel.cate_alias"
          minlength="1"
          maxlength="15"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onDelete">取消</el-button>
        <el-button @click="onSubmit" type="primary"> 確認 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
