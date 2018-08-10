import Draggabilly from 'draggabilly';
import { addClass } from '@utils/dom';
import { isOEmpty, hasOwn } from './util';
import CoursePop from './course-pop';

import PasteCourseBox from './dialog/paste-course-dialog';
import DeleteCourseBox from './dialog/delete-course-dialog';
import DragDialogBox from './dialog/drag-dialog';
import ArrangeCourseBox from './dialog/arrange-dialog';
import AttendanceBox from './dialog/attendance-dialog';
import EstimateHomeworkBox from './dialog/estimate-homework-dialog';
import InclassStudentBox from './dialog/inclass-student-dialog';

const isArray = Array.isArray;

function DialogGenerator(qid, dialogVue) {

  let dialog = {id: qid};

  dialog.DialogConstructor = Vue.extend(dialogVue);

  dialog.init = () => {
    dialog.instance = new dialog.DialogConstructor({
      el: document.createElement('div')
    });
  };

  return (op, options = {}) => {

    if (dialog && !dialog.instance) { dialog.init(); }
    if (op === 'open') {
      for (let p in options) {
        if (options.hasOwnProperty(p)) {
          dialog.instance[p] = options[p];
        }
      }

      let $dialog = document.body.querySelector(`.${qid}`);
      if (!$dialog) {
        document.body.appendChild(dialog.instance.$el);
      }
      Vue.nextTick(() => { dialog.instance.visible = true; });

    } else if (op === 'close' && dialog.instance) {
      dialog.instance.visible = false;
    } else if (op === 'destory' && dialog) {
      dialog.instance = null;
      dialog = null;
    }
  };
}

/**
 * 弹出对话框
 * @param {String} op      操作符 open, close, destory
 * @param {Object} options 选项参数
 */
export const pasteCourseDialog = DialogGenerator('paste-course-dialog', PasteCourseBox);
export const deleteCourseDialog = DialogGenerator('delete-course-dialog', DeleteCourseBox);
export const arrangeCourseDialog = DialogGenerator('arrange-course-dialog', ArrangeCourseBox);
export const estimateHomeworkDialog = DialogGenerator('estimate-homework-dialog', EstimateHomeworkBox);
export const inclassStudentDialog = DialogGenerator('inclass-student-dialog', InclassStudentBox);
export const attendanceDialog = DialogGenerator('attendance-course-dialog', AttendanceBox);
export const adjustCourseDialog = DialogGenerator('drag-course-dialog', DragDialogBox);

/**
 * 关联拖拽和课程数据
 * @param {Array} courses    课程数据
 * @param {Array} draggers   拖拽数据
 */
export const setDragElements = (courses, draggers) => {
  if (courses.length && draggers.length) {
    let elmId;
    courses.forEach((c) => {
      for (let i = 0; i < draggers.length; i++) {
        elmId = draggers[i]['element']['id'].replace('drag-course-', '');
        if (String(c.course['courseID']) === elmId) {
          c.course['dragElement'] = draggers[i];
          break;
        }
      }
    });
  }
};

/**
 * 解析禁用时间表
 * @param {Array} forbidhours 禁用时间列表
 */
export const getForbidHours = (forbidhours) => {
  let hours = [];
  let tmp;
  let max;
  let min;
  if (isArray(forbidhours)) {
    for (let i = 0; i < forbidhours.length; i++) {
      tmp = String(forbidhours[i]).split('-');
      if (tmp.length === 2) {
        min = Math.min(tmp[0], tmp[1]);
        max = Math.max(tmp[0], tmp[1]);
        for (let j = min; j <= max; j++) {
          hours.push(String(j));
        }
      } else {
        hours.push(String(forbidhours[i]));
      }
    }
  }
  return hours;
};

/* 课程简介弹出信息框 */

let courseInstance;

const CoursePopConstructor = Vue.extend(CoursePop);

const initCourseInstance = () => {
  courseInstance = new CoursePopConstructor({
    el: document.createElement('div')
  });
};

/**
 * 课程简介弹出信息框
 * @param {Object} event  事件对象
 * @param {Object} course  课程内容
 * @param {Object} currentDate  当前时间
 * @param {String} op     操作 open / close
 */
export const CourseInto = (event, course, currentDate, op) => {

  if (!courseInstance) { initCourseInstance(); }

  if (op === 'open') {
    if (!courseInstance.visible || courseInstance.course.courseID !== course.courseID) {
      courseInstance.event = event;
      courseInstance.course = course;
      courseInstance.currentDate = currentDate;
      courseInstance.enabledClose = true;
      let $coursepop = document.body.querySelector('.course-pop-over');
      if (!$coursepop) {
        document.body.appendChild(courseInstance.$el);
      }
      Vue.nextTick(() => { courseInstance.visible = true; });
    }
  } else if (event === 'close' && courseInstance) {
    courseInstance.closed();
  }
};

/**
 * 获取拖拽元素
 * @param {String} query        需要拖拽的元素选择符
 * @param {String} container    容器元素选择符
 * @param {Function} downHandler 拖拽开始处理
 * @param {Function} upHandler   拖拽放置处理
 * @param {Date} currentDate     当前时间线
 */
export const getDragableElems = (query, container, downHandler, upHandler, currentDate) => {

  let draggableElems = document.querySelectorAll(query);

  let draggies = [];

  for (let i = 0; i < draggableElems.length; i++) {
    let draggableElem = draggableElems[i];
    let startTime = parseInt(draggableElem.getAttribute('startTime'), 10);
    let draggie = new Draggabilly(draggableElem, {containment: container});

    draggie.on('pointerDown', function(event, pointer) { downHandler && downHandler(event); });
    draggie.on('pointerUp', function(event, pointer) { upHandler && upHandler(event); });

    if (startTime < currentDate.getTime()) {
      draggie.disable();
      draggableElem.setAttribute('dragenabled', 0);
    } else {
      addClass(draggableElem, 'move');
    }

    draggies.push(draggie);
  }
  return draggies;
};

/**
 * 位置计算课程
 * @param {Object} _courseBody  课程组件对象
 * @param {Object} course   课程数据
 * @param {Array} columns  列表分类数据
 * @param {Number} rowsNum  行数
 * @param {Number} W        单元格宽度
 * @param {Number} H        单元格高度
 * @param {Object} config   基本配置
 * @param {Number} X        坐标X
 * @param {Number} Y        坐标Y
 * @param {Number} oldXY    原坐标
 * @param {Number} dragElm  拖拽DOM
 * @return courseData  内容 { oldCourse, changed, newCourse }
 */
export const computedXYtoCourse = (_courseBody, course, columns, rowsNum, W, H, config, X, Y, oldXY, dragElm) => {

  let colNum = columns.length;
  let type = columns[0]['type'];
  let spanStep = config.spanStep;
  let startTime = parseInt(course.startTime, 10);
  let endTime = parseInt(course.endTime, 10);
  let justMins = 1;
  let courseData = {};
  let movedMinu = 0;
  let typeProp = '';
  let moveIndex = -1;

  let changedata = courseData.changed = {};
  courseData.courseBody = _courseBody;
  courseData.oldCourse = course;
  courseData.newCourse = JSON.parse(JSON.stringify(course));
  courseData.newCourse.dragElement = course.dragElement;

  if (type === 1) {          // 按教室排课
    typeProp = 'classRoomID';
  } else if (type === 2) {   // 按教师排课
    typeProp = 'teacherID';
  }

  if (config.justTime) {
    let jt = config.justTime.split(':');
    if (jt.length >= 2) {
      justMins = parseInt(jt[0], 10) * 60 + parseInt(jt[1], 10);
    }
  }

  // 获取移动分钟数
  function getMovMinutes(cH, span, nY, oY) {
    let per = cH / (60 * span);
    let mov = -(oY - nY);
    return mov / per;
  }

  // 获取Timestamp
  function getMinTimestamp(movedMins, time) {
    return time + movedMins * 60 * 1000;
  }

  function IsAllowTime(movedMinus, startTimes) {
    let start = new Date(startTimes);
    let h = start.getHours();
    let m = start.getMinutes();
    let cpm = (h * 60 + m) + movedMinus;
    return cpm > 0 || cpm < 60 * 24;
  }

  W = parseInt(W, 10);
  H = parseInt(H, 10);
  X = parseInt(X, 10);
  Y = parseInt(Y, 10);

  let XoX = oldXY.X - X;

  function getMovedColumnId() {
    let currentIndex = -1;
    let currentCourses;
    moveIndex = -1;

    for (let i = 0; i < colNum; i++) {
      currentCourses = columns[i]['courses'] || [];
      for (let j = 0; j < currentCourses.length; j++) {
        if (currentCourses[j][typeProp] === course[typeProp]) {
          currentIndex = i;
          break;
        }
      }
      if (currentIndex > -1) break;
    }

    moveIndex = Math.ceil(Math.abs(XoX) / W);

    if (XoX > 0) {
      moveIndex = currentIndex - moveIndex;
    } else {
      moveIndex = currentIndex + moveIndex;
    }

    if (moveIndex >= 0 && currentIndex !== moveIndex && moveIndex < colNum) {
      return columns[moveIndex]['id'];
    }
    return undefined;
  }

  let columnsId = getMovedColumnId();

  // 左右移动大于30%才处理
  if ((Math.abs(XoX) > (W * 0.3)) && (columnsId !== undefined)) {

    changedata[typeProp] = columnsId;

    _courseBody.$nextTick(()=>{
      dragElm.style.left = (W * moveIndex) + 'px';
    });

  } else {
    _courseBody.$nextTick(()=>{
      dragElm.style.left = oldXY.left;
    });
  }

  // 上下移动时间大于规定时间处理
  movedMinu = getMovMinutes(H, spanStep, Y, oldXY.Y);

  if ((Math.abs(movedMinu) > justMins) && IsAllowTime(movedMinu, startTime)) {

    movedMinu = Math.ceil(movedMinu / justMins) * justMins;

    changedata.startTime = getMinTimestamp(movedMinu, startTime);

    changedata.endTime = getMinTimestamp(movedMinu, endTime);

  } else {
    _courseBody.$nextTick(()=>{
      dragElm.style.top = oldXY.top;
    });
  }

  // columns[0].courses[0]['updatedXYposit'] = true;
  if (!isOEmpty(changedata)) {
    for (let k in changedata) {
      if (hasOwn.call(changedata, k)) {
        courseData.newCourse[k] = changedata[k];
      }
    }
  }

  return courseData;
};

/**
 * 计算开始结束时间在在表格上的位置
 * @param {Object} course   课程数据
 * @param {Array} columns  列表分类数据
 * @param {Number} rows     行数
 * @param {Number} w        单元格宽度
 * @param {Number} h        单元格高度
 * @param {Object} config   基本配置
 */
export const computeStartendToXY = (course, columns, rows, w, h, config) => {

  let type = columns[0]['type'];
  let hour = config.spanStep;
  let contentColWidth = parseInt(config.contentColWidth, 10);
  let spanStart = parseInt(config.spanStart, 10);
  let spanEnd = parseInt(config.spanEnd, 10);
  let start = (new Date(course.startTime)).getTime();
  let end = (new Date(course.endTime)).getTime();
  let startDate = new Date(start);
  let spanmin = (end - start) / (1000 * 60);     // 分钟数
  let width = /^\d+(\.\d+)?$/ig.test(w) ? parseInt(w, 10) : parseInt(String(w).replace('px', ''), 10);  // 宽度
  let cellHeight = parseInt(String(h).replace('px', ''), 10);
  let height = (hour * 60 / cellHeight * spanmin);               // 高度
  let left = 0;
  let top = 0;
  let current = -1;
  let courses;
  let styl = {};
  let startHour = startDate.getHours();
  let startMin = startDate.getMinutes();
  let typeProp = '';

  if (type === 1) {          // 按教室排课
    typeProp = 'classRoomID';
  } else if (type === 2) {   // 按教师排课
    typeProp = 'teacherID';
  }

  for (let i = 0; i < columns.length; i++) {
    courses = columns[i]['courses'];
    if (courses.length) {
      for (let j = 0; j < courses.length; j++) {
        if (courses[j][typeProp] === course[typeProp]) {
          current = i;
          break;
        }
      }
      if (current > -1) break;
    }
  }

  if (/^\d+(\.\d+)?(px)?$/.test(w) && current > -1) {
    left =  width * current + contentColWidth;
  }

  top = cellHeight * (startHour - spanStart) + (hour * 60 / cellHeight * startMin);
  styl = {width: width + 'px', height: height + 'px', left: left + 'px', top: top + 'px'};

  if (startHour > spanEnd || startHour < spanStart) styl.display = 'none';

  return styl;
};
