const { ElLoading } = require('element-plus');

/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // 自訂規則
    // 停用 prettier 並在 setting.json -> editor.formatOnSave 關閉 save 自動格式化
    // 使用前必須先安裝 Eslint 並在 setting.json -> editor.codeActionsOnSave 啟用 save 自動修正
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true, // 使用單引號
        semi: true, // 不使用分號
        printWidth: 80, // 一行最大 90 字元
        endOfLine: 'auto'
      }
    ],
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index'] // vue 組件名稱多單詞規範忽略 index
      }
    ],
    'vue/no-setup-props-destructure': ['off'], // 關閉 props 解構規則
    'no-undef': ['error'] // 未定義變數錯誤提示
  },
  globals: {
    ElMessage: 'readonly',
    ElMessageBox: 'readonly',
    ElLoading: 'readonly'
  }
};
