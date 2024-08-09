<template>
  <page-container title="文章分類">
    <!-- 具名插槽 -->
    <template #extra> <el-button>添加分類</el-button> </template>
    <!-- 表單區域 -->
    <el-form label-width="80px">
      <el-form-item label="文章分類">
        <el-select>
          <el-option label="新聞" value="110" />
          <el-option label="體育" value="120" />
          <el-option label="其他" value="130" />
        </el-select>
      </el-form-item>
      <el-form-item label="發布狀態">
        <el-select>
          <el-option label="已發布" value="已發布" />
          <el-option label="未發布" value="未發布" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查詢</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格區域 -->
  </page-container>
</template>
