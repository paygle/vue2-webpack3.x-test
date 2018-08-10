<template>
  <div id="pagination" >
    <div class="clear" v-if="option.total!=0">
      <div class="fl mT20">
        <slot name="btns"></slot>
      </div>
      <div class="fr mT20">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="option.currentPage"
          :page-sizes="[10, 20, 50, 100, 150]"
          :page-size="option.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="option.total">
        </el-pagination>
      </div>
    </div>
    
    <div class="text-center" v-if="option.total==0">暂无数据</div>
  </div>
</template>

<script>
export default {
  props: ['option'],
  data() {
    return {
      bol: false
    };
  },
  methods: {
    // 条数
    handleSizeChange(val) {
      this.option.pageSize = val;
      this.bol = true;
      this.option.currentPage = 1;
      this.$emit('change');
    },
    // 页数
    handleCurrentChange(val) {
      if (val !== 1) {
        this.bol = false;
      }
      if (this.bol) {
        this.bol = false;
        return;
      }
      this.option.currentPage = val;
      this.$emit('change');
    }
  },
  mounted() {}
};
</script >

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>