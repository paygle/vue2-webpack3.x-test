<template>
<div class="course-table">
  <div v-if="hasTopOperater" class="course-opt" v-show="isNoPrintShow">
    <el-button v-show="!batdel" type="primary" @click="printCourse">课表打印</el-button>
    <el-button type="danger" @click="delCourse">批量删除</el-button>
    <el-button v-show="batdel" @click="delCourseCancel">取消</el-button>
    <div class="week-chge">
      <span class="go-pre el-icon-arrow-left" @click="goweeks('pre')"></span>
      <ul class="days-week">
        <li
          v-for="(wk, index) in weeks"
          @click="showDayCourse(wk)"
          :class="{'actived': wk.checked}"
          :key="index">
          <span>{{wk.week | weekday}}</span>
          <span v-text="wk.date"></span>
        </li>
      </ul>
      <span class="go-next el-icon-arrow-right" @click="goweeks('next')"></span>
    </div>
  </div>
  <div class="course-wrapper" ref="courseWrapper">
    <course-body
      ref="courseBody"
      v-if="isdataUpdated"
      :config="setting"
      :hours="hours"
      :forbid-times="setting.forbidTimes"
      :show-selectors="showSelectors"
      :course-selectors="courseSelectors"
      :columns.sync="columns"
      :data.sync="courses"
      :datetime="datetime"
      :cols-total="colsTotal"
      :col-width="colWidth"
      :row-hight="rowHight"
      :cols-num="colsNum"
      :rows-num="rowsNum">
    </course-body>
    <left-header
      ref="leftHeader"
      v-if="hasLeftTime && isdataUpdated"
      :is-noprint-show="isNoPrintShow"
      :config="setting"
      :hours="hours">
    </left-header>
    <top-header
      ref="topHeader"
      v-if="hasHeader && isdataUpdated"
      :hasleft-filter="hasleftFilter"
      :config="setting"
      :data="headList"
      :col-width="colWidth"
      :show-selectors="showSelectors"
      :head-selectors="headSelectors"
      :display-type="displayType"
      :type="datatype">
    </top-header>
  </div>
  <div class="course-footer">
    <div v-if="displayType=='day'" class="fleft">
      <el-radio-group v-model="shwroom" @change="filterStatusRoom">
        <el-radio :label="1">显示所有启用教室</el-radio>
        <el-radio :label="0">仅显示禁用教室</el-radio>
      </el-radio-group>
      <div class="notify" v-text="statistics"></div>
    </div>
    <div class="fright">
      <span class="stat-grey">请假</span>
      <span class="stat-red">未考勤</span>
      <span class="stat-green">已考勤</span>
      <span class="stat-blue">排课</span>
    </div>
  </div>
</div>
</template>
<script>
import TopHeader from './top-header';
import LeftHeader from './left-header';
import CourseBody from './course-body';
import {setRunTimeout} from '@utils/utilstool';
import {on, off, setStyle, getStyle, addClass} from '@utils/dom';
import {vmConfiger} from '@utils/dynamic-data';
import merge from '@utils/merge';
import emitter from '@mixins/emitter';
import filters from '@mixins/filters';
let printTimeHandler;

import {
  getLayout,
  getWeeks,
  courseProps,
  getColumsData,
  columnSelector,
  courseSelector,
  isFFChrome
} from './util';

// 显示隐藏top选择
// function changeTopSelector(dom, isshow) {
//   if (dom) {
//     const tsr = dom.querySelector('.top-selector')
//     if (isshow && tsr) {
//       tsr.style.display = 'block';
//     } else if (tsr) {
//       tsr.style.display = 'none';
//     }
//   }
// }

// 课程表编辑组件
export default {
  name: 'CourseTable',

  mixins: [emitter, filters],

  componentName: 'CourseTable',

  components: {
    TopHeader,
    LeftHeader,
    CourseBody
  },

  props: {
    typeData: Object,      // 各类型对应数据集合
    displayType: {         // 课表显示类型，支持 day, week, private, group, piano, teacher, student
      type: String,
      default: 'day'
    },
    config: Object, // 配置对象
    disautoWidth: Boolean // 禁用内容布局自适应宽度
  },

  data() {
    return {
      lang: Vue.config.lang,
      setting: {
        spanStart: 0, // 时间跨度开始(默认单位小时)
        spanStep: 1, // 风格布局小时间隔
        spanEnd: 23, // 时间跨度结束(默认单位小时)
        justTime: '00:05', // 时间选择调整最小单位 HH:mm 格式
        forbidTimes: [], // 禁用时间集合
        topHeadHeight: 50, // 表头高度（单位px)
        contentColHeight: 60, // 内容列高度（单位px）
        contentColWidth: '120', // 内容列宽度（不给单位是px，可以给%百分比）
        contentColMaxWidth: 220 // 内容列最大宽度（单位px）
      },
      shwroom: 0,
      batdel: false, // 删除状态
      weeks: [], // 周日期数据 [{week: '周一', date: '2018-01-01', checked: false}]
      datatype: 2, // 默认为教室 1， 老师 2
      showNum: 0, // 仅显示的资源数
      useNum: 0, // 使用中的资源数
      datetime: 0, // 服务器当前时间，用于设定当前时间线
      currentDate: 0, // 当前浏览器日期
      headList: [], // 头部列表数据
      hours: [], // 时间分布列表
      rowHight: '120',
      colWidth: '120', // 自适应列宽
      colsNum: 0, // 列数
      rowsNum: 0, // 行数
      courses: [], // 排课数据
      colsTotal: 0, // 列总和宽度
      columns: [], // 所有列分类数据
      timeTHandler: null, // time handler
      headnavs: [],
      selections: [], // 已经选择的内容
      isdataUpdated: false,
      isNoPrintShow: true, // 不打印区域是否显示
      showSelectors: false // 删除选择器显示状态
    };
  },

  watch: {
    currentDate(n) {
      this.$emit('current-date', n, this.weeks);
    }
  },

  computed: {
    statistics() {
      let word = ' 在用 ';
      if (this.datatype === 2) word = ' 在职 ';
      return `显示 ${this.showNum}${word}${
        this.useNum
      } 系统默认显示今日有课的教师`;
    },
    // 课表上部操作区显示
    hasTopOperater() {
      const arrangeType = ['week', 'private', 'group', 'piano', 'teacher', 'student'];
      if (arrangeType.indexOf(this.displayType) > -1) return false;
      return true;
    },
    // 课表上头部显示
    hasHeader() {
      return true;
    },
    // 课表头部左侧筛选
    hasleftFilter() {
      const arrangeType = ['week', 'private', 'group', 'piano', 'teacher', 'student'];
      if (arrangeType.indexOf(this.displayType) > -1) return false;
      return true;
    },
    // 课表左头部显示
    hasLeftTime() {
      const arrangeType = ['private', 'group', 'piano', 'teacher', 'student'];
      if (arrangeType.indexOf(this.displayType) > -1) return false;
      return true;
    }
  },

  methods: {
    // 获取课程类型
    // 1 个体， 2 集体， 3 练琴
    getCourseTypes(t) {
      if (String(t) === '1') {
        return '个别课';
      } else if (String(t) === '2') {
        return '集体课';
      } else if (String(t) === '3') {
        return '练琴课';
      }
      return '';
    },
    // 前一周，后一周
    // to 参数: pre, next, now
    goweeks(to, date) {
      // 日课表
      if (this.displayType === 'day') {
        this.weeks = getWeeks(this, this.currentDate, to);
      } else {
        let currentDate = this.currentDate;
        if (to === 'now') {
          currentDate = new Date();        // 本周
          if (date) currentDate = date;    // 选定日期
          this.currentDate = currentDate;
        }
        this.headList = getWeeks(this, currentDate, to, 'NOW-MD');
        this.weeks = this.headList;
      }
    },

    // 筛选显示禁用与否的教室
    filterStatusRoom() {
      debugger;
    },

    // 打印课程表
    printCourse() {
      this.$emit('print-state', false);
      this.isNoPrintShow = false;
      setRunTimeout(printTimeHandler, ()=>window.print(), 300);
    },

    afterprintHandler(e) {
      this.$emit('print-state', true);
      this.isNoPrintShow = true;
    },

    // 删除排课
    delCourse() {
      if (this.batdel) {
        // 过去时间里的课程不允许删除
        debugger;
      } else {
        this.showSelectors = true;
        this.batdel = true;
      }
    },

    // 取消批量删除
    delCourseCancel() {
      this.showSelectors = false;
      this.batdel = false;
      this.selections = [];
      this.courses.forEach(item => {
        item.course.selected = false;
      });
      this.headnavs.forEach(item => {
        item.selected = false;
      });
    },

    // 显示所点击天的排课
    showDayCourse(wk) {
      this.currentDate = new Date(wk.date.replace(/\-/gi, '/')).getTime();
      this.weeks = getWeeks(this, wk.date);
    },

    // 更新布局
    updateLayout() {

      if (this.$refs.courseBody && this.$refs.topHeader) {

        let cols = this.colsNum;
        let cttColW = this.setting.contentColWidth;
        let cttColH = this.setting.contentColHeight;
        // let colMaxW = this.setting.contentColMaxWidth;

        this.colWidth = cttColW;
        this.colWidth = /^\d+$/gi.test(cttColW) && cttColW;
        this.rowHight = cttColH;
        this.rowHight = /^\d+$/gi.test(cttColH) && cttColH + 'px';

        if (!this.disautoWidth && cols > 0) {
          this.dispatch('MainBody', 'update-bodystyle');
          let $courseBody = this.$refs.courseBody.$el;
          let $topHeader = this.$refs.topHeader.$el;
          // let layoutBody = getLayout($courseBody);
          let $courseGrid = $courseBody.querySelector('.course-grid');
          let $gridTopHeader = $topHeader.querySelector('.grid-top-header');
          let colsTotal; // 内容列总宽度(单位px)
          let bodywidth;

          this.$nextTick(()=>{
            if (!isFFChrome()) {
              let $cols = $courseBody.querySelectorAll('.course-column');
              for (let i = 0; i < $cols.length; i++) {
                addClass($cols[i], 'ie-fix');
              }
            }
          });

          if (/^\d+$/gi.test(cttColW)) {
            cttColW = parseInt(cttColW, 10);
            colsTotal = cols * cttColW;
            // let bodyw = parseInt(Number(layoutBody.width).toFixed(2), 10);
            // let colBodyw = bodyw - cttColW;
            // 总列宽度小于视口宽度
            // if (colsTotal < colBodyw && colBodyw < innerWidth) {

            //   let colw = parseInt(colBodyw / cols > colMaxW ? colMaxW : colBodyw / cols, 10);
            //   colw = parseInt(colw / 10, 10) * 10;
            //   colsTotal = colw * cols;
            //   bodywidth = (colsTotal + cttColW) + 'px';

            //   this.colWidth = colw;
            //   this.$refs.courseWrapper.style.width = bodyw + 'px';
            //   vmConfiger('contentWidth', bodyw, true);
            //   $gridTopHeader.style.width = colsTotal + 'px';
            // } else {
            let bw = colsTotal + cttColW;
            bodywidth = bw + 'px';
            this.colWidth = colsTotal / cols;
            this.$refs.courseWrapper.style.width = (bw + 20) + 'px';
            vmConfiger('contentWidth', bw + 20, true);
            $gridTopHeader.style.width = colsTotal + 'px';
            // }
            this.colsTotal = colsTotal;
            $courseBody.style.width = bodywidth;
            $courseGrid.style.width = bodywidth;
          }
        }

        this.$nextTick(() =>{
          this.dispatch(
            'MainBody',
            'update-bodystyle',
            true
            // this.$refs.courseWrapper.style.width.replace(/px/g, '')
          );
        });
      }
    },

    // 更新滚动时的样式
    updateScroll(e) {

      let layoutBody = getLayout('courseBody', this.$refs);
      let $topHeader = this.$refs.topHeader && this.$refs.topHeader.$el;
      let $leftHeader = this.$refs.leftHeader && this.$refs.leftHeader.$el;
      let layoutToph = getLayout($topHeader);
      let pos = getStyle($topHeader, 'position');
      let resizeTop = 64;
      let resizeLeft = 130;

      // 是否最大化状态
      if (this.$root.maxsized) {
        resizeTop = 0;
        resizeLeft = 0;
      }

      if ($topHeader && layoutBody.top < resizeTop && pos !== 'fixed') {
        setStyle($topHeader, {
          position: 'fixed',
          left: `${layoutToph.left}px`,
          top: `${resizeTop}px`,
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
        });
      } else if ($topHeader && layoutBody.top >= resizeTop && pos !== 'absolute') {
        setStyle($topHeader, {
          position: 'absolute',
          left: 0,
          top: 0,
          boxShadow: 'none'
        });
      } else if ($topHeader && pos === 'fixed') {
        let wrap = getLayout('courseWrapper', this.$refs);
        setStyle($topHeader, {left: `${wrap.left}px`});
      }

      if ($leftHeader && (layoutBody.left - resizeLeft) < 0) {
        setStyle($leftHeader, {
          left: `${-(layoutBody.left - resizeLeft)}px`,
          boxShadow: '1px 0 2px rgba(0,0,0,0.3)'
        });
      } else if ($leftHeader && (layoutBody.left - resizeLeft) >= 0) {
        setStyle($leftHeader, { left: 0, boxShadow: 'none' });
      }
    },

    // 初始化
    initHours(s) {
      // init time header
      let start = s.spanStart;
      let span = s.spanStep;
      let end = s.spanEnd;
      let hours = [];
      let sp;

      for (let s = start; s <= end; s += span) {
        if (/^\d+$/gi.test(s)) {
          hours.push(s + ':00');
        } else if (/^\d+\.\d+$/gi.test(s)) {
          sp = String(s).split('.');
          if (sp.length === 2) {
            sp[1] = Math.round(60 * parseFloat('0.' + sp[1], 10).toFixed(4));
            if (String(sp[1]).length === 1) {
              sp[1] = sp[1] + '0';
            } else if (String(sp[1]).length > 2) {
              sp[1] = sp[1].substr(0, 2);
            }
          }
          hours.push(sp.join(':'));
        }
      }
      this.rowsNum = hours.length;
      this.hours = hours;
    },

    // 头部数据回填
    setDayHeadnavs(data) {
      this.headnavs = data;
    },

    // 头部选择处理
    headSelectors(item) {
      // { coldata, content, id, selected, selector }
      this.selections = columnSelector(
        this.selections,
        this.columns,
        item,
        this.datatype
      );
    },
    // 课程选择处理
    courseSelectors(course) {
      courseSelector(
        this.selections,
        this.columns,
        course,
        this.headnavs,
        this.datatype
      );
    },

    resizeHandler() {
      if (this.$refs.courseWrapper && this.$refs.courseBody) {
        this.$refs.courseWrapper.style.width = 'auto';
        this.$refs.courseBody.$el.style.width = 'auto';
      }
      this.updateLayout();
    },
    scrollHandler() {
      clearTimeout(this.timeTHandler);
      this.timeTHandler = setTimeout(this.updateScroll, 20);
    },

    // 切换[教师/教室 ]课程类型数据
    changeCourseData(t) {
      this.isdataUpdated = false;
      let data = {};

      if (t === 1) { // 按教室
        data = window.classrooms;
      } else if (t === 2) { // 按老师
        data = window.teachers;
      }

      if (data) {

        // 获取数据
        this.headList = data.classRoomTitleList || data.teacherTitleList || [];
        this.colsNum = this.headList.length;
        this.datatype = data.type;
        this.showNum = data.classRoomOnShowNum || data.teacherOnShowNum;
        this.useNum = data.classRoomOnUseNum || data.teacherOnUseNum;
        this.courses = courseProps(data.courses || [], {selector: true, selected: false, dragElement: null});
        this.currentDate = this.datetime = data.datetime;
        this.columns = getColumsData(this.headList, this.courses, this.datatype);
        this.weeks = getWeeks(this, data.datetime);
        this.resizeHandler();
        this.$nextTick(() => { this.isdataUpdated = true; });
      }
    },

    // 初始化周课表排课
    initWeekCourse() {
      let data = window.weekCourse;
      if (data) {
        this.initWeekHeader(data);

      }
    },

    // 初始化个体课排课
    initPrivateCourse() {
      let data = window.personalCourse;
      if (data) {
        this.initWeekHeader(data);

      }
    },

    // 初始化集体课排课
    initGroupCourse() {
      let data = window.groupCourse;
      if (data) {
        this.initWeekHeader(data);

      }
    },

    // 初始化练琴课排课
    initPianoCourse() {
      let data = window.pianoCourse;
      if (data) {
        this.initWeekHeader(data);

      }
    },
    // 获取周共同头部
    initWeekHeader(data) {
      this.headList = getWeeks(this, new Date(), null, 'MD');
      this.colsNum = this.headList.length;
      this.currentDate = new Date();
    },

    // 初始化排课
    initArrangeCourse() {

      this.initHours(this.setting);

      switch (this.displayType) {
        // 日课表
        case 'day':
          this.changeCourseData(2);
          break;
        // 周课表
        case 'week':
          this.initWeekCourse();
          break;
        // 个体课表
        case 'private':
          this.initPrivateCourse();
          break;
        // 班级课表
        case 'group':
          this.initGroupCourse();
          break;
        // 练琴课表
        case 'piano':
          this.initPianoCourse();
          break;
      }
    }
  },

  mounted() {
    this.isdataUpdated = true;
    this.updateLayout();
    this.$nextTick(() => this.updateLayout());
    on(window, 'resize', this.resizeHandler);
    on(window, 'scroll', this.scrollHandler);
  },

  created() {
    window.onafterprint = this.afterprintHandler;
    if (this.config) this.setting = merge(this.setting, this.config);
    this.rowHight = this.setting.contentColHeight;
    this.colWidth = this.setting.contentColWidth;
    this.initArrangeCourse();
  },

  beforeDestroy() {
    off(window, 'resize', this.resizeHandler);
    off(document.body, 'scroll', this.scrollHandler);
  }
};
</script>
