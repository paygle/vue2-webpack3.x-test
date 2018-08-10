<template>
  <el-dialog
    class="dialog-two"
    :visible.sync="visible"
    width="65%">
    我不管，我是第二个弹窗
    <span slot="footer">
      <el-button type="success" @click="btnConfirm" :size="size">确定</el-button>
      <el-button @click="btnCancel" :size="size">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>

/* 新增排课对话框 */
export default {
  data() {
    return {
      size: 'small',
      visible: false
    };
  },

  methods: {
    btnConfirm() {
      this.visible = false;
    },

    btnCancel() {
      this.visible = false;
    }
  }
};
</script>
