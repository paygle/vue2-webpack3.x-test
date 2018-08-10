<template>
  <el-dialog
    class="six-service-dialog"
    :visible.sync="visible"
    width="770px" center>
    <div class="check-menus-wrapper">
      <template v-for="(item, index) in menusData">
        <div class="main-item" v-if="item.children" :key="index">
          <label class="title" v-text="item.label"></label>
          <template v-for="(menu, idx) in item.children">
            <div class="chkbox" :key="idx">
              <el-checkbox
                v-model="menu.checked"
                @change="checkboxChange(menu)"
                :disabled="!menu.checked && forbid">
                {{menu.label}}
              </el-checkbox>
              <span v-show="menu.flag">*</span>
            </div>
          </template>
        </div>
      </template>
    </div>
    <span slot="footer">
      <el-button type="primary" @click="btnConfirm" :size="size">完成</el-button>
      <span v-if="forbid" class="notice">最多只能选6个</span>
    </span>
  </el-dialog>
</template>
<script>

/* 右侧功能区添加常用服务对话框 */
export default {
  data() {
    return {
      size: 'small',
      visible: false,
      forbid: false,
      selectedMenus: [],
      menusData: []
    };
  },

  watch: {
    selectedMenus(n, o) {
      if (Array.isArray(n) && n.length >= 6) {
        this.forbid = true;
      } else {
        this.forbid = false;
      }
    }
  },

  methods: {

    checkboxChange(menu) {
      let stm = this.selectedMenus;
      if (menu.checked && stm.length < 6) {
        stm.push(menu);
      } else {
        let index = stm.indexOf(menu);
        if (index > -1) {
          stm.splice(index, 1);
        }
      }
    },

    btnConfirm() {
      this.visible = false;
    }
  }
};
</script>
