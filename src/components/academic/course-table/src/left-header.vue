<template>
<div class="left-header" v-show="isNoprintShow">
  <table class="grid-left" border="0" cellpadding="0" cellspacing="0">
    <tr class="hours-list" v-for="(item, index) in hours" :key="index">
      <td class="hour" v-text="item"></td>
    </tr>
  </table>
</div>
</template>
<script>

// 课程表编辑组件
export default {
  name: 'LeftHeader',

  componentName: 'LeftHeader',

  props: {
    isNoprintShow: Boolean,
    config: Object,   // 全局配置对象
    hours: Array        // 小时列表
  }
};
</script>
