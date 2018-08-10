<template>
<div class="top-header">
  <div class="top-selector">
    <div v-if="hasleftFilter" class="sel-input">
      <input class="inner-input" v-model="modview" readonly>
    </div>
    <ul v-if="hasleftFilter" class="sel-list">
      <li @click="showViewModel(2)">按教师查看</li>
      <li @click="showViewModel(1)">按教室查看</li>
    </ul>
  </div>
  <table v-if="displayType=='day'" class="grid-top-header" border="0" cellpadding="0" cellspacing="0">
    <colgroup>
      <col v-for="(item, index) in headnavs" :key="index" name="header-col" :width="colWidth">
    </colgroup>
    <tbody>
      <tr class="head-nav">
        <td
          class="nav-item"
          :style="{width: `${colWidth}px`}"
          v-for="(item, index) in headnavs"
          :code="item.id"
          :key="index">
          <template v-if="showSelectors && item.selector">
            <input
              type="checkbox"
              v-model="item.selected"
              @change="headSelected(item)">
            <span class="check-tip el-icon-circle-check"></span>
          </template>
          <div class="txt-content" :class="{'is-one': type === 2}">
            <span
              class="head-txt"
              :style="{width: `${colWidth-20}px`}"
              v-for="(ctx, idx) in item.content"
              v-text="ctx"
              :title="ctx"
              :key="idx">
            </span>
          </div>
          <el-popover trigger="hover" :content="headtip">
            <span class="headtip" slot="reference"><i class="el-icon-question"></i></span>
          </el-popover>
        </td>
      </tr>
    </tbody>
  </table>
  <table v-else class="grid-top-header" border="0" cellpadding="0" cellspacing="0">
    <colgroup>
      <col v-for="(item, index) in headnavs" :key="index" name="header-col" :width="colWidth">
    </colgroup>
    <tbody>
      <tr class="head-nav">
        <td
          class="nav-item"
          :style="{width: `${colWidth}px`}"
          v-for="(item, index) in headnavs"
          :code="item.id"
          :key="index">
          <div class="txt-content">
            <span class="head-txt">{{item.week | weekday}}</span>
            <span class="head-txt">{{item.date}}</span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>
<script>
import {selectHeadProps} from './util';
import filters from '@mixins/filters';

// 课程表编辑组件
export default {
  name: 'TopHeader',

  componentName: 'TopHeader',

  mixins: [filters],

  props: {
    displayType: String,
    config: Object, // 全局配置对象
    hasleftFilter: Boolean,
    showSelectors: Boolean,
    type: Number,            // 查看类型
    colWidth: {              // 自适应列宽
      type: [String, Number],
      default: 'auto'
    },
    headSelectors: Function, // 头列选择回调
    data: Array  // 头部列表数据
  },

  data() {
    return {
      modview: '按教师查看',
      enableSelector: false, // 选择器是否可用
      headnavs: []  // { content: [1, '天河校区'], selector: 'nav', selected: false}
    };
  },

  computed: {
    headtip() {
      if (this.type === 1) {
        return '当学生有未交课费时，退费将先扣除掉未交课费课时，再扣减已交课费的课时';
      } else {
        // 当学生有未交课费时，退费将先扣除掉未交课费课时，再扣减已交课费的课时
        return '该教师当日的可授课时间为12:00至14:00';
      }
    }
  },

  watch: {
    data(n, o) {
      if (this.displayType === 'day') {
        this.updateDayHeadnavs();
      } else {
        this.headnavs = n; // 更新周头数据
      }
    }
  },

  methods: {
    // 按教室或老师分类查看课表
    showViewModel(a) {
      if (a === 1 && this.modview !== '按教室查看') {
        this.modview = '按教室查看';
      } else if (a === 2 && this.modview !== '按教师查看') {
        this.modview = '按教师查看';
      }
      this.$parent.changeCourseData(a);
    },
    // 头部点选操作
    headSelected(item) {
      this.headSelectors && this.headSelectors(item);
    },

    // 更新Day头数据
    updateDayHeadnavs() {
      const np = {content: [], selector: 'nav', selected: false};
      this.headnavs = selectHeadProps(np, this.data, this.type);
      this.$parent.setDayHeadnavs(this.headnavs);
    }
  },

  mounted() {
    debugger;
    if (this.displayType === 'day') {
      this.updateDayHeadnavs();
    } else {
      this.headnavs = this.data; // 更新周头数据
    }
  }
};
</script>
