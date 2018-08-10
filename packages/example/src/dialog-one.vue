<template>
  <el-dialog
    class="dialog-one"
    :visible.sync="visible"
    width="65%">
      <el-button type="success" @click="popother" :size="size">妞，再弹出一个给爷看看</el-button>
    <span slot="footer">
      <el-button type="success" @click="btnConfirm" :size="size">确定</el-button>
      <el-button @click="btnCancel" :size="size">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import createDialog from '@utils/create-dialog';
import DialogTwo from './dialog-two';
const dialogTwoInstance = createDialog(DialogTwo);

/* 新增排课对话框 */
export default {
  data() {
    return {
      size: 'small',
      visible: false
    };
  },

  methods: {
    popother() {
      dialogTwoInstance('open', {});
    },

    btnConfirm() {
      this.visible = false;
    },

    btnCancel() {
      this.visible = false;
    }
  }
};
</script>
