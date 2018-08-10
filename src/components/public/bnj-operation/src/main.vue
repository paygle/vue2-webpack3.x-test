<template>
  <el-popover
    popper-class="bnj-operation"
    trigger="click"
    placement="left"
    v-model="visible"
    v-if="dialogvisible">
    <ul>
      <template v-for="item in setlist">
        <li
          v-if="item.promision"
          :key="item.name"
          @click="visible = false; item.fn(scope.$index, scope.row)">
          {{item.name}}
        </li>
      </template>
    </ul>
    <div slot="reference" class="name-wrapper">
      <el-button
        type="text"
        size="mini">操作
      </el-button>
    </div>
  </el-popover>
</template>
<script>

export default {
  name: 'BnjOperation',
  componentName: 'BnjOperation',
  props: {
    operation: Object,
    scope: Object
  },
  data() {
    return {
      visible: false,
      setlist: [],
      dialogvisible: true
    };
  },

  mounted() {
    if (this.operation) {
      if (typeof this.operation.filter === 'function') {
        this.setlist = this.operation.filter(this.scope, this.operation.list);
      } else {
        this.setlist = this.operation.list;
      }
      if (this.setlist.length === 0) {
        this.dialogvisible = false;
      } else {
        let off = false;
        for (let i = 0, len = this.setlist.length; i < len; i++) {
          if (this.setlist[i].promision) {
            off = true;
            break;
          }
        }
        this.dialogvisible = off;
      }
    }
  }
};
</script>
