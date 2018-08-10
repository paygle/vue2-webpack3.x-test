<template>
  <el-dialog
    class="drag-course-dialog"
    :visible.sync="visible"
    @open="dialogOpen"
    @close="dialogClose"
    width="65%">
    <table border="0" cellpadding="0" cellspacing="0">
      <tr><td class="label">课程信息：</td><td colspan="4">{{courseDesc}}</td></tr>
      <tr>
        <td class="label">原上课教师：</td><td class="w3">{{teacher}}</td>
        <td class="label">更换教师：</td>
        <td class="wr">
          <el-radio-group v-model="allowteacher">
            <el-radio v-for="item in radioData" :label="item.val" :key="item.val">{{item.label}}</el-radio>
          </el-radio-group>
        </td>
        <td>
          <el-select
            v-show="allowteacher !== radioHidden"
            v-model="chgdTeacher"
            filterable
            :size="size">
            <el-option-group
              v-for="group in teachersOptions"
              :key="group.label"
              :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>
        </td>
        <td class="p5">
          <el-select
            v-show="allowteacher !== radioHidden"
            v-model="chgdTeachernorm"
            :size="size">
            <el-option
              v-for="item in teacherNormOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td class="label">原上课教室：</td><td>{{classRoomName}}</td>
        <td class="label">更换教室：</td>
        <td class="wr">
          <el-radio-group v-model="allowClassroom">
            <el-radio v-for="item in radioData" :label="item.val" :key="item.val">{{item.label}}</el-radio>
          </el-radio-group>
        </td>
        <td colspan="2">
          <el-select
            v-show="allowClassroom !== radioHidden"
            v-model="chgdClassroom"
            :size="size">
            <el-option
              v-for="item in classroomOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td class="label">原上课日期：</td><td>{{courseDate}}</td>
        <td class="label">调整日期：</td>
        <td class="wr">
          <el-radio-group v-model="allowDate">
            <el-radio v-for="item in radioData" :label="item.val" :key="item.val">{{item.label}}</el-radio>
          </el-radio-group>
        </td>
        <td colspan="2">
          <el-date-picker
            v-show="allowDate !== radioHidden"
            v-model="chgdate"
            type="date"
            placeholder="选择日期"
            :size="size">
          </el-date-picker>
        </td>
      </tr>
      <tr>
        <td class="label">原上课时间：</td><td>{{courseTime}}</td>
        <td class="label">调整时间：</td>
        <td class="wr">
          <el-radio-group v-model="allowTime">
            <el-radio v-for="item in radioData" :label="item.val" :key="item.val">{{item.label}}</el-radio>
          </el-radio-group>
        </td>
        <td colspan="2" class="row-cell">
          <div class="col-cell-x80">
            <el-select
              placeholder="小时"
              v-show="allowTime !== radioHidden"
              v-model="chgdHour"
              filterable
              :size="size">
              <el-option
                v-for="item in hoursOption"
                :key="item"
                :label="`${item}点`"
                :value="item">
              </el-option>
            </el-select>
          </div>
          <div class="col-cell-x80">
            <el-select
              placeholder="分钟"
              v-show="allowTime !== radioHidden"
              v-model="chgdMinute"
              filterable
              :size="size">
              <el-option
                v-for="item in minuteOption"
                :key="item"
                :label="`${item}分`"
                :value="item">
              </el-option>
            </el-select>
          </div>
        </td>
      </tr>
      <tr>
        <td class="label">原上课助教：</td><td class="w3">{{teacher}}</td>
        <td class="label">更换助教：</td>
        <td class="wr">
          <el-radio-group v-model="allowAssistant">
            <el-radio v-for="item in radioData" :label="item.val" :key="item.val">{{item.label}}</el-radio>
          </el-radio-group>
        </td>
        <td colspan="2">
          <el-select
            v-show="allowAssistant !== radioHidden"
            v-model="chgdTeacher"
            filterable
            :size="size">
            <el-option-group
              v-for="group in teachersOptions"
              :key="group.label"
              :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>
        </td>
      </tr>
      <tr>
        <td class="label"><span class="red">*</span> 课程有效期：</td>
        <td colspan="5">
          <div class="row-cell">
            <div class="col-cell-auto">
              <el-radio-group v-model="periodtime">
                <el-radio :label="2">长期</el-radio>
                <el-radio :label="-1">短期</el-radio>
              </el-radio-group>
            </div>
            <div v-if="periodtime!=2" class="col-cell-auto">
              <el-input
                class="week-long"
                v-model="weeks"
                :size="size">
              </el-input>
              周
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td class="label"><span class="red">*</span> 重复　形式：</td>
        <td  class="wr" colspan="5">
           <el-radio-group v-model="weekform">
            <el-radio :label="1">每周</el-radio>
            <el-radio :label="2">隔周</el-radio>
          </el-radio-group>
        </td>
      </tr>
    </table>
    <span slot="footer">
      <el-button type="primary" @click="btnConfirm" :size="size">确定排课</el-button>
      <el-button @click="btnCancel" :size="size">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getPreZero } from '../util';
import { genHours, genMinutes} from '@utils/dynamic-data';
let tempsave = {};  // 数据暂存

/* 课程调整对话框 */
export default {
  data() {
    return {
      typeText: '',
      size: 'small',
      visible: false,
      currentDate: null,
      courseData: null,      // 包含字段 {changed, oldCourse, newCourse}
      radioHidden: 0,
      radioData: [
        {label: '不变', val: 0 },
        {label: '更换', val: 1 }
      ],

      allowteacher: 0,       // 是否允许教师变更
      allowAssistant: 0,     // 是否允许助教变更
      chgdTeacher: '',
      chgdTeachernorm: '',
      allowClassroom: 0,     // 是否允许教室变更
      chgdClassroom: '',
      allowDate: 0,          // 是否允许日期变更
      chgdate: '',
      allowTime: 0,          // 是否允许时间变更
      chgdHour: 0,           // 切换小时
      chgdMinute: 0,           // 切换分钟
      hoursOption: [],
      minuteOption: [],
      periodtime: -1,
      weeks: 0,
      weekform: 2,           // 默认连续

      teachersOptions: [{
        label: '全职',
        options: [{
          value: '2123221',
          label: '教师1'
        }, {
          value: '665443',
          label: '教师2'
        }]
      }, {
        label: '兼职',
        options: [{
          value: 'Chengdu',
          label: '教师3'
        }, {
          value: 'Shenzhen',
          label: '教师4'
        }]
      }],

      teacherNormOptions: [{
        value: 1,
        label: '按原教师标准'
      }, {
        value: 2,
        label: '按代课教师标准'
      }],

      classroomOptions: [{
        value: 1,
        label: '教室1'
      }, {
        value: 2,
        label: '教室2'
      }]
    };
  },

  watch: {
    courseData(n) {
      if (n) {
        let co = n.oldCourse;
        debugger;
        // 获取初始值
        this.periodtime = co.arrangeCourseType;
        if (tempsave.arrange) {
          let ar = tempsave.arrange;
          ar.periodtime = co.arrangeCourseType;
        } else {
          tempsave.arrange = {
            periodtime: co.arrangeCourseType,
            weeks: this.weeks,
            weekform: this.weekform
          };
        }
      }
    },

    allowteacher(n) {
      if (n === 1) {
        // 原值暂存
        let t = tempsave.teacher = {};
        t.chgdTeacher = this.chgdTeacher;
        t.chgdTeachernorm = this.chgdTeachernorm;

        let ar = tempsave.arrange;
        if (ar) { // 恢复周期
          this.periodtime = ar.periodtime;
          this.weeks = ar.weeks;
          this.weekform = ar.weekform;
        }

      } else {
        // 恢复原值
        let t = tempsave.teacher;
        if (t) {
          this.chgdTeacher = t.chgdTeacher;
          this.chgdTeachernorm = t.chgdTeachernorm;
        }
      }
    },

    allowClassroom(n) {
      if (n === 1) {
        // 原值暂存
        let c = tempsave.classroom = {};
        c.chgdClassroom = this.chgdClassroom;
      } else {
        // 恢复原值
        if (tempsave.classroom) {
          this.chgdClassroom = tempsave.classroom.chgdClassroom;
        }
      }
    }
  },

  computed: {

    courseDesc() {
      // courseTypes 个别课  (courseName) 1小时课程 （2018-06-05 10:00)
      if (this.courseData) {
        let course = this.courseData.oldCourse;
        let st = new Date(course.startTime);
        let time = `${st.getFullYear()}-${getPreZero(st.getMonth() + 1, 2)}-${getPreZero(st.getDate(), 2)} ${getPreZero(st.getHours(), 2)}:${getPreZero(st.getMinutes(), 2)}`;
        return `${this.typeText}${course.courseName} （${time}）`;
      }
      return '';
    },

    courseDate() {
      if (this.courseData) {
        let course = this.courseData.oldCourse;
        let st = new Date(course.startTime);
        let y = st.getFullYear();
        let m = st.getMonth() + 1;
        let d = st.getDate();
        return `${y}-${getPreZero(m, 2)}-${getPreZero(d, 2)}`;
      }
      return '';
    },

    courseTime() {
      if (this.courseData) {
        let course = this.courseData.oldCourse;
        let st = new Date(course.startTime);
        let hour = st.getHours();
        let min = st.getMinutes();
        return `${getPreZero(hour, 2)}:${getPreZero(min, 2)}`;
      }
      return '';
    },

    teacher() {
      if (this.courseData) {
        return this.courseData.oldCourse.teacher;
      }
      return '';
    },

    classRoomName() {
      if (this.courseData) {
        return this.courseData.oldCourse.classRoomName;
      }
      return '';
    }
  },

  methods: {

    btnConfirm() {
      debugger;
      this.visible = false;
    },

    btnCancel() {
      debugger;
      this.visible = false;
    },

    dialogOpen() {
      debugger;
    },

    dialogClose() {

    }

  },

  mounted() {
    this.hoursOption = genHours();
    this.minuteOption = genMinutes();
  }
};
</script>

