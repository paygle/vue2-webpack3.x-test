<template>
  <div>
    <el-checkbox class="fl mR30" v-model="allCheck" @change="allCheckOp" :name="obj.name">全选</el-checkbox>
    <el-checkbox-group v-model="formobj[obj.arrname]">
      <el-checkbox 
        class="mR30 mL0"
        v-for="item in obj.list" 
        @change="checkOp(item[obj.id])"
        :label="item[obj.id]"
        :key="item[obj.id]" 
        :name="obj.id">{{item[obj.name]}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>

export default {
  name: 'BnjCheckbox',
  componentName: 'BnjCheckbox',
  props: ['obj', 'formobj'],
  data() {
    return {
      allCheck: false,
      allidsList: []
    };
  },
  methods: {
    // 全选
    allCheckOp() {
      if (this.allCheck) {
        if (this.allidsList.length === 0) {
          for (var i = 0, len = this.obj.list.length; i < len; i++) {
            this.allidsList.push(this.obj.list[i][this.obj.id]);
          }
        };
        this.formobj[this.obj.arrname] = this.allidsList;
      } else {
        this.formobj[this.obj.arrname] = [];
      }
      if (this.obj.fn) {
        this.obj.fn();
      }
    },

    // 切换勾选
    checkOp(id) {
      let str = this.formobj[this.obj.arrname].sort().join(); // 勾选的id串ids（已从小到大排序）
      
      if (this.allidsList.length === 0) {
        for (var i = 0, len = this.obj.list.length; i < len; i++) {
          this.allidsList.push(this.obj.list[i][this.obj.id]);
        }
      }
      
      if (str === this.allidsList.sort().join()) {   // 勾选的ids和所有数组ids(已从小到大排序)对比
        this.allCheck = true;
      } else {
        this.allCheck = false;
      };
      if (this.obj.fn) {
        this.obj.fn(id);
      }
    }
  },
  mounted() {
    
  }
};
</script>

<style lang="scss" scoped>
.mL0{margin-left:0 !important;}
</style>

