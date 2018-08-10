<template>
<div class="course-body" @click="offMenusHandler">
  <div class="time-line" :style="timelineStyl"></div>
  <table class="course-grid" border="0" cellpadding="0" cellspacing="0">
    <colgroup>
      <col name="left-hours" width="120">
      <col v-for="col in colsNum" :key="col" name="course-col" :width="colWidth">
    </colgroup>
    <tbody>
      <tr class="course-column" v-for="(hour, index) in hours" :key="hour">
        <td class="hour" v-text="hour" :style="{width: '120px'}"></td>
        <td
          :style="{width: colWidth + 'px'}"
          v-for="col in colsNum"
          :key="col"
          :class="courseStatecls(hour, index)"
          @contextmenu.prevent="gridRightMenus($event, hour, col)"
          :row="index"
          :col="col">
        </td>
      </tr>
    </tbody>
  </table>
  <div class="drag-container" v-if="updatedCourses">
    <template v-for="item in data">
      <div
        class="course-draggable"
        dragenabled="1"
        v-if="!item.course.updatedXYposit"
        :class="dragbgcolor(item.course)"
        :key="item.course.courseID"
        :id="`drag-course-${item.course.courseID}`"
        :code="getIdcode(item.course)"
        :startTime="item.course.startTime"
        :style="getPosit(item.course)"
        @mouseenter="mouseEnterHandler"
        @mouseover="showCourseInto($event, item.course)"
        @contextmenu.prevent="courseRightMenus($event, item.course)">
        <template v-if="showSelectors && item.course.selector">
          <input
            type="checkbox"
            v-model="item.course.selected"
            @change="courseSelected(item.course)">
          <span class="box-notice"></span>
          <span class="check-tip el-icon-circle-check"></span>
        </template>
        <span v-text="getCourseLabel(item.course)"></span>
        <span v-text="getTeacherLabel(item.course)"></span>
      </div>
    </template>
  </div>
  <right-menus
    :show.sync="ctxmenuShow"
    :posit="positXY"
    :menu-dispose="rightMenuDispose"
    :menus="rmenusData">
  </right-menus>
</div>
</template>
<script>
import {on, off, addClass, removeClass} from '@utils/dom';
import RightMenus from './right-menus';
import {
  getDragableElems,
  computeStartendToXY,
  computedXYtoCourse,
  CourseInto,
  getForbidHours,
  setDragElements,
  adjustCourseDialog,
  pasteCourseDialog,
  deleteCourseDialog,
  arrangeCourseDialog,
  attendanceDialog,
  estimateHomeworkDialog,
  inclassStudentDialog
} from './rect-draw';
import {getLayout, isOEmpty, getDateStr} from './util';

let loading = true;
let isContextMenu = false;
let oldCourseDragxy = {};
let currentDragCourse;
let currentDragenabled = 1;
let preCurrentCourse; // 前一个课程
let currentCourse; // 当前右键课程
let clipboard; // 剪贴内容
let copyboard; // 复制内容
let gridData; // 网格数据
let pasteData; // 粘贴的内容数据

// 课表右键菜单
let rmenusData = [
  {key: 0, desc: '新增排课', actived: false}, // 新增排课
  {key: 1, desc: '复制', actived: false}, // 复制
  {key: 2, desc: '剪切', actived: false}, // 剪切
  {key: 3, desc: '粘贴', actived: false}, // 粘贴
  {key: 4, desc: '删除', actived: false}, // 删除
  {key: 5, desc: '清空粘贴板', actived: false}, // 清空粘贴板
  {key: 6, desc: '调整课程', actived: false}, // 调整课程
  {key: 7, desc: '考勤', actived: false}, // 考勤
  {key: 8, desc: '查看评价和作业', actived: false}, // 查看评价和作业
  {key: 9, desc: '班内学生', actived: false} // 班内学生
];

function getDragElem(e) {
  if (e.target) {
    let re = '^drag\\-course\\-\\d+';
    if (RegExp(re).test(e.target.id)) {
      return e.target;
    } else if (RegExp(re).test(e.target.parentNode.id)) {
      return e.target.parentNode;
    }
  }
  return undefined;
}

// 设置右键菜单状态
function setRightMEnabled(enableds) {
  enableds = Array.isArray(enableds) ? enableds : [];
  for (let i = 0; i < rmenusData.length; i++) {
    if (enableds.indexOf(i) > -1) {
      rmenusData[i]['actived'] = true;
    } else {
      rmenusData[i]['actived'] = false;
    }
  }
}

// 课程表编辑组件
export default {
  name: 'CourseBody',

  componentName: 'CourseBody',

  components: {
    RightMenus
  },

  props: {
    config: Object, // 全局配置对象
    hours: Array, // 时间列表
    forbidTimes: Array, // 禁用列表
    showSelectors: Boolean,
    courseSelectors: Function,
    columns: Array, // 列分类数据
    colWidth: { // 自适应列宽
      type: [String, Number],
      default: '120'
    },
    rowHight: [String, Number],
    colsNum: Number, // 列数
    rowsNum: Number, // 行数
    colsTotal: Number, // 列总宽度
    datetime: Number, // 服务器当前时间戳
    data: Array       // 课程数据
  },

  data() {
    return {
      currentDate: new Date(), // 当前系统时间
      forbidhours: [],
      updatedCourses: true,
      timelineStyl: {},
      dragElems: [],
      rmenusData: [],
      ctxmenuShow: false,
      positXY: {x: 0, y: 0},
      thandler: null
    };
  },

  watch: {
    data: {
      immediate: true,
      handler(n) {
        this.updateTimeLine();
      }
    }
  },

  methods: {
    getCourseLabel(course) {
      // 1 个体， 2 集体， 3 练琴
      if (course.courseType === 2) {
        return `班级：${course.className}`;
      } else {
        return `学生：${course.student}`;
      }
    },

    getTeacherLabel(course) {
      // 1 个体， 2 集体， 3 练琴
      if (course.courseType === 3) {
        return `教室：${course.classRoomName}`;
      } else {
        return `教师：${course.teacher}`;
      }
    },

    getIdcode(course) {
      let t = this.$parent.datatype;
      if (t === 1) {
        return course.classRoomID;
      } else if (t === 2) {
        return course.teacherID;
      }
    },

    // 背景状态样式
    courseStatecls(hour, index) {
      if (this.forbidhours.indexOf(String(hour).replace(/\:0{2}$/g, '')) > -1) {
        return 'cell-disabled';
      }
      return '';
    },

    // 更新时间线
    updateTimeLine() {
      let cdt = this.currentDate;
      let hour = cdt.getHours();
      let minus = cdt.getMinutes();
      let currentMinus = 60 * hour + minus;
      let spanStart = this.config.spanStart;
      let spanStep = this.config.spanStep;
      let spanEnd = this.config.spanEnd;
      let height = this.config.contentColHeight;
      let startMinus = 60 * spanStart;
      let stepMinus = 60 * spanStep;
      let endMinus = 60 * spanEnd;
      let timelineStyl = {
        width: this.colsTotal ? this.colsTotal + 'px' : 'auto'
      };
      let servDate = getDateStr(new Date(this.datetime)); // 当前课程日期
      let currDate = getDateStr(this.currentDate); // 当前日期

      // 仅处理在范围内的情况
      if (
        servDate === currDate &&
        currentMinus > startMinus &&
        currentMinus < endMinus
      ) {
        timelineStyl.top = `${height / stepMinus * (currentMinus - startMinus)}px`;
      } else {
        timelineStyl.display = 'none';
      }
      this.timelineStyl = timelineStyl;
    },
    // 点选当前课程
    courseSelected(item) {
      this.courseSelectors && this.courseSelectors(item);
    },

    showCourseInto(e, course) {
      currentDragCourse = course;
      if (!isContextMenu) CourseInto(e, course, this.currentDate, 'open');
    },

    // 右键菜单内容处理
    rightMenuDispose(item) {
      let key = item.key;
      // 清空前一个课程内容
      function resetPreCourse(courseID) {
        if (preCurrentCourse) {
          let preCourseID = preCurrentCourse.courseID;
          let preCourseDom = document.querySelector(
            `#drag-course-${preCourseID}`
          );
          if (preCourseID !== courseID) {
            removeClass(preCourseDom, 'is-copy is-clip');
          }
          preCurrentCourse = undefined;
        }
      }
      if (key === 0) {
        // 0 新增排课
        arrangeCourseDialog('open', {
          gridData: gridData,
          courseDate: this.datetime,
          currentDate: this.currentDate
        });
      }

      if (currentCourse) {
        let courseID = currentCourse.courseID;
        let courseDom = document.querySelector(`#drag-course-${courseID}`);
        let type = currentCourse.courseType;
        let typetxt = this.$parent.getCourseTypes(type);

        if (key === 1) {
          // 1 复制
          copyboard = JSON.parse(JSON.stringify(currentCourse));
          clipboard = undefined;
          removeClass(courseDom, 'is-clip');
          addClass(courseDom, 'is-copy');
          resetPreCourse(courseID);
        } else if (key === 2) {
          // 2 剪切
          clipboard = currentCourse;
          copyboard = currentCourse;
          removeClass(courseDom, 'is-copy');
          addClass(courseDom, 'is-clip');
          resetPreCourse(courseID);
        } else if (key === 3) {
          // 3 粘贴
          removeClass(courseDom, 'is-copy is-clip');
          pasteCourseDialog('open', {
            paste: pasteData,
            courseDate: this.datetime,
            currentDate: this.currentDate
          });
        } else if (key === 4) {
          // 4 删除
          deleteCourseDialog('open', {course: currentCourse});
        } else if (key === 5) {
          // 5 清空粘贴板
          removeClass(courseDom, 'is-copy is-clip');
          copyboard = undefined;
          clipboard = undefined;
        } else if (key === 6) {
          // 6 调整课程
          let courseData = {
            oldCourse: currentCourse,
            changed: {},
            newCourse: {}
          };
          adjustCourseDialog('open', {
            courseBody: this,
            courseData: courseData,
            currentDate: this.currentDate,
            typeText: typetxt
          });
        } else if (key === 7) {
          // 7 考勤
          attendanceDialog('open', {
            course: currentCourse,
            currentDate: this.currentDate,
            typeText: typetxt
          });
        } else if (key === 8) {
          // 8 查看评价和作业
          estimateHomeworkDialog('open', {
            course: currentCourse,
            currentDate: this.currentDate,
            typeText: typetxt
          });
        } else if (key === 9) {
          // 9 班内学生
          inclassStudentDialog('open', {
            course: currentCourse,
            currentDate: this.currentDate,
            typeText: typetxt
          });
        }
      }
    },

    // 表格上右键菜单显示
    // 0 新增排课 1 复制 2 剪切 3 粘贴 4 删除
    // 5 清空粘贴板 6 调整课程 7 考勤 8 查看评价和作业 9 班内学生
    gridRightMenus(e, row, col) {
      loading = false;
      isContextMenu = true;
      this.ctxmenuShow = true;
      this.positXY = {x: e.clientX, y: e.clientY};

      let menus = [];
      let column = this.columns[col];
      let isTempData = clipboard || copyboard;

      if (column) {
        gridData = {
          columnId: column.id,
          dataType: column.type,
          span: this.config.spanStep,
          hour: row
        };
      }

      // 添加粘贴时需要的数据
      if (column && isTempData) {
        pasteData = {
          columnId: column.id,
          dataType: column.type,
          span: this.config.spanStep,
          hour: row
        };

        if (clipboard) {
          pasteData.course = clipboard;
        } else {
          pasteData.course = copyboard;
        }
      } else {
        pasteData = undefined;
      }

      // 右键菜单设置
      menus = [0];
      if (isTempData) {
        menus.push(3, 5);
      }

      setRightMEnabled(menus);
      this.rmenusData = rmenusData;
    },

    // 课程上右键菜单显示
    courseRightMenus(e, course) {
      loading = false;
      isContextMenu = true;
      this.ctxmenuShow = true;
      this.positXY = {x: e.clientX, y: e.clientY};

      if (!preCurrentCourse && currentCourse) {
        preCurrentCourse = currentCourse;
      }

      currentCourse = course; // 当前右键课程暂存

      let ctime = this.currentDate.getTime();
      let endTime = parseInt(course.endTime, 10);
      let courseType = parseInt(course.courseType, 10);
      let isTempData = clipboard || copyboard;
      let menus = [];

      // 0 新增排课 1 复制 2 剪切 3 粘贴 4 删除
      // 5 清空粘贴板 6 调整课程 7 考勤 8 查看评价和作业 9 班内学生
      // 过去时间的课程
      if (endTime < ctime) {
        menus = [1, 7, 8];

        if (courseType === 2) {
          // 集体课
          menus = [1, 7, 8, 9];
        }

        if (isTempData) menus.push(5);
        setRightMEnabled(menus);
      } else {
        // 未来时间的课程
        menus = [1, 2, 4, 6, 7];

        if (courseType === 2) {
          // 集体课
          menus = [1, 2, 4, 6, 7, 9];
        }

        if (isTempData) menus.push(5);
        setRightMEnabled(menus);
      }
      this.rmenusData = rmenusData;
    },

    // 关闭右键菜单
    offMenusHandler() {
      isContextMenu = false;
      this.ctxmenuShow = false;
      CourseInto('close');
      this.updateTimeLine();
    },

    resizeHandler() {
      this.loading = true;
      this.updatedCourses = false;
      this.updateTimeLine();
      this.$nextTick(() => {
        this.updatedCourses = true;
      });
    },

    dragbgcolor(course) {
      // 课表颜色
      if (parseInt(course.color, 10) === 1) {
        // 未考勤
        return 'red';
      } else if (parseInt(course.color, 10) === 2) {
        // 已考勤
        return 'green';
      } else if (parseInt(course.color, 10) === 3) {
        // 未上课(排课)
        return 'blue';
      } else if (parseInt(course.color, 10) === 4) {
        // 请假
        return 'dotted';
      }
    },

    // 获取课程初始化位置
    getPosit(course) {
      if (loading) {
        this.currentDate = new Date();
        return computeStartendToXY(
          course,
          this.columns,
          this.rowsNum,
          this.colWidth,
          this.rowHight,
          this.config
        );
      } else {
        let $course = this.$el.querySelector(`#drag-course-${course.courseID}`);
        let st = ($course && $course.style) || {};
        return {
          display: st.display,
          width: this.colWidth,
          height: st.height,
          left: st.left,
          top: st.top
        };
      }
    },
    // 暂存值
    mouseEnterHandler(e) {
      let elm = getDragElem(e);
      if (elm) {
        let s = getComputedStyle(elm);
        oldCourseDragxy.left = s.left;
        oldCourseDragxy.top = s.top;
        currentDragenabled = parseInt(elm.getAttribute('dragenabled'), 10);
      }
    },

    pointerDown(e) {
      if (currentDragenabled === 1) {
        document.querySelector('.course-pop-over').style.zIndex = 1;
      }
      oldCourseDragxy.X = parseInt(e.x, 10);
      oldCourseDragxy.Y = parseInt(e.y, 10);
    },

    // 移动课程块处理
    pointerUp(e) {
      let elm = getDragElem(e);
      let type = this.columns[0]['type'];
      let typetxt = this.$parent.getCourseTypes(type);
      debugger;
      if (elm && currentDragenabled === 1) {
        let el = getLayout(elm);
        let courseData = computedXYtoCourse(
          this,
          currentDragCourse,
          this.columns,
          this.rowsNum,
          el.width,
          parseInt(String(this.rowHight).replace('px', ''), 10),
          this.config,
          e.x,
          e.y,
          oldCourseDragxy,
          elm
        );

        document.querySelector('.course-pop-over').style.zIndex = 100;

        // 有修改时才给于弹出修改权限
        if (!isOEmpty(courseData.changed)) {
          adjustCourseDialog('open', {
            courseData: courseData,
            currentDate: this.currentDate,
            typeText: typetxt
          });
        }
      }
    }
  },

  created() {
    this.forbidhours = getForbidHours(this.forbidTimes);
  },

  mounted() {
    loading = true;
    on(window, 'resize', this.resizeHandler);
    on(window, 'scroll', this.offMenusHandler);
    this.$nextTick(() => {
      this.updateTimeLine();
      setDragElements(
        this.data,
        getDragableElems(
          '.course-draggable',
          '.course-body',
          this.pointerDown,
          this.pointerUp,
          this.currentDate
        )
      );
    });
  },

  closeDestroy() {
    adjustCourseDialog('destory');
    pasteCourseDialog('destory');
    arrangeCourseDialog('destory');
    attendanceDialog('destory');
    estimateHomeworkDialog('destory');
    inclassStudentDialog('destory');
  },

  beforeDestroy() {
    off(window, 'resize', this.resizeHandler);
    off(document.body, 'scroll', this.offMenusHandler);
  }
};
</script>
