<template>
  <span class="el-address">
    地址组件
  </span>
</template>
<script>
  export default {
    name: 'ElxAddress',

    componentName: 'ElAddress',

    inject: {
      elForm: {
        default: ''
      },
      elFormItem: {
        default: ''
      }
    },

    provide() {
      return {
        elAddress: this
      };
    },

    props: {
      rules: Object,
      disabledTips: Boolean, // ext-> 禁用表单溢出和验证弹窗提示
      formPopTips: Boolean // ext-> 启用表单弹出提示，下方验证提示则不显示
    },
    watch: {

    },
    data() {
      return {
        fields: []
      };
    },
    created() {

    },
    methods: {

    }
  };
</script>
