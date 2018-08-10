<template>
  <div class="bnj-search-box">
    <div class="search-header" :style="headerStyl">
      <slot name="header"></slot>
      <span v-if="!showAll" @click="change" class="advanced">
        <span class="text" v-text="text"></span>
        <i :class="icon"></i>
      </span>
    </div>
    <!-- 高级搜索 -->
    <el-collapse-transition>
      <div v-show="show" class="search-more">
        <slot></slot>
      </div>
    </el-collapse-transition>
    <div class="search-btns"><slot name="buttons"></slot></div>
  </div>
</template>
<script>
// import { setRunTimeout } from '@utils/utilstool';
// let timehandler;

export default {
  name: 'BnjSearchBox',
  componentName: 'BnjSearchBox',
  props: {
    showAll: Boolean // 全部展示
  },
  data() {
    return {
      icon: 'el-icon-arrow-down',
      headerStyl: {},
      show: false
    };
  },

  computed: {
    text() {
      if (this.show) {
        this.icon = 'el-icon-arrow-up';
        return '收起筛选';
      } else {
        this.icon = 'el-icon-arrow-down';
        return '高级筛选';
      }
    }
  },

  methods: {
    change() {
      if (!this.showAll) {
        this.show = !this.show;
        // setRunTimeout(timehandler, (_this, menu) => {
        //   this.$root.updateViewHeight();
        // }, [this], 300);
      }
    }
  },
  mounted() {
    if (this.showAll) {
      this.show = true;
      this.headerStyl = {paddingRight: 0};
    }
  }
};
</script>
