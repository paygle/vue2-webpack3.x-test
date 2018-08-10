<template>
  <transition name="msgbox-fade">
    <div
      v-show="visible"
      class="course-pop-over"
      :style="posit"
      v-clickoutside="closed"
      @mouseover="showCourseInto">
      <table border="0" cellpadding="0" cellspacing="0">
        <template v-for="(item, index) in courseprops">
          <tr :key="index">
            <td class="label" v-text="item.label + '：'"></td>
            <td class="content">
              {{ item.content }}
              <span v-if="item.flag" class="flag" v-text="item.flag"></span>
            </td>
          </tr>
        </template>
      </table>
    </div>
  </transition>
</template>
<script>
import { getTimeHHmm, getLayout } from './util';
import Clickoutside from '@utils/clickoutside';

function getPropsExcluded(o, ex) {
  let p = [];
  for (let i = 0; i < o.length; i++) {
    if (ex.indexOf(o[i]) < 0) {
      p.push(o[i]);
    }
  }
  return p;
}

export default {

  directives: { Clickoutside },

  data() {
    return {
      visible: false,
      enabledClose: true,
      currentDate: null,
      event: null,
      course: null,
      posit: {left: 0, top: 0},
      thandler: null
    };
  },

  computed: {
    courseprops() {
      let showdata = [];
      if (this.course) {
        let course =  this.course;
        let courseType = course.courseType;
        let start = (new Date(course.startTime)).getTime();
        let end = (new Date(course.endTime)).getTime();
        let arrange = course['arrangeCourseType'];
        let allprop = ['campusName', 'courseType', 'courseName', 'classLevelConfigName', 'classRoomName', 'classStudentNumber', 'time', 'teacher', 'student', 'courseAttenceStatus', 'studentReviewContent', 'teacherReviewContent', 'homework'];
        let prop = allprop;
        // className  班级名称
        let showProps = {
          campusName: '所属分校',                // 所属分校
          courseType: '授课形式',                // 授课形式  1 个别  2 集体 3 钢琴
          courseName: '课程名称',                // 课程名称
          classLevelConfigName: '班别',         // 班别
          classRoomName: '教室',                // 教室
          classStudentNumber: '班级人数',        // 集体 - 班级人数
          time: '时间',    // startTime， endTime，arrangeCourseType  一直显示
          teacher: '教师姓名',                   // 教师姓名
          student: '学生姓名',                   // 学生姓名
          courseAttenceStatus: '考勤结果',       // 个体还未上课时 显示 考勤结果
          studentReviewContent: '学生评价老师',     // 个体 学生评价老师
          teacherReviewContent: '老师评价学生',     // 个体 老师评价学生
          homework: '课后作业'                     // 个体 课后作业
        };

        if (courseType === 1) { // 个别课
          prop = getPropsExcluded(allprop, ['classLevelConfigName', 'classStudentNumber']);
        } else if (courseType === 2) { // 集体课
          prop = getPropsExcluded(allprop, ['teacher']);
        } else if (courseType === 3) { // 钢琴课
          prop = ['campusName', 'courseType', 'classRoomName', 'time', 'student'];
        }

        for (let i = 0; i < prop.length; i++) {
          // arrangeCourseType ; 排课类型(null-正常排课，0-排课补录,1-集体课一对一补课,2-长期)
          if (prop[i] === 'time') {
            let flag = this.getArrangeFlag(arrange);
            showdata.push({
              label: showProps[prop[i]],
              content: `${getTimeHHmm(start)} - ${getTimeHHmm(end)}`,
              flag: flag
            });
          } else if (prop[i] === 'courseAttenceStatus') {
            showdata.push({
              label: showProps[prop[i]],
              content: course[prop[i]] ? course[prop[i]] : '漏考勤',
              flag: undefined
            });
          } else if (prop[i] === 'courseType') {
            showdata.push({
              label: showProps[prop[i]],
              content: this.getCourseMode(course[prop[i]]),
              flag: undefined
            });
          } else if (prop[i] === 'studentReviewContent' || prop[i] === 'teacherReviewContent') {
            showdata.push({
              label: showProps[prop[i]],
              content: course[prop[i]] ? course[prop[i]] : '未评价',
              flag: undefined
            });
          } else if (prop[i] === 'homework') {
            showdata.push({
              label: showProps[prop[i]],
              content: course[prop[i]] ? course[prop[i]] : '未布置',
              flag: undefined
            });
          } else {
            showdata.push({
              label: showProps[prop[i]],
              content: this.course[prop[i]],
              flag: undefined
            });
          }
        }
      }
      return showdata;
    }
  },

  watch: {
    event: {
      immediate: true,
      handler(e) {
        this.$nextTick(() => {
          if (e) {
            this.posit = {
              left: (e.clientX + 10) + 'px',
              top: (e.clientY + 10) + 'px',
              visibility: 'hidden'
            };
            this.$nextTick(() => { this.updateXY(e); });
          }
        });
      }
    }
  },

  methods: {

    getCourseMode(k) {
      let word = '';
      switch (k) {
        case 1:
          word = '个别课';
          break;
        case 2:
          word = '集体课';
          break;
        case 3:
          word = '练琴课';
          break;
        default:
          word = '';
      }
      return word;
    },

    // arrangeCourseType ; 排课类型(null-正常排课，0-排课补录,1-集体课一对一补课,2-长期)
    getArrangeFlag(f) {
      if (parseInt(f, 10) === 0) {
        return '补录';
      } else if (parseInt(f, 10) === 1) {
        return '补课';
      } else if (parseInt(f, 10) === 2) {
        return '长期';
      }
      return null;
    },

    updateXY(e) {
      let lo = getLayout(this.$el);
      let pos = {};
      if (e.clientX > (innerWidth * 0.7)) {
        pos.left = 'auto';
        pos.right = (innerWidth - e.clientX + 30) + 'px';
      } else {
        pos.left = (e.clientX + 30) + 'px';
      }
      if (e.clientY > (innerHeight - lo.height)) {
        pos.top = 'auto';
        pos.bottom = (innerHeight - e.clientY + 30) + 'px';
      } else {
        pos.top = (e.clientY + 30) + 'px';
      }
      this.posit = pos;
    },

    showCourseInto() {
      this.enabledClose = false;
      this.visible = true;
    },

    closed() {
      this.visible = false;
    }
  }
};
</script>
