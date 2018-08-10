<template>
  <el-dialog
    class="paste-course-dialog"
    :visible.sync="visible"
    width="65%">
    <table class="out-table" border="0" cellpadding="0" cellspacing="0" style="width:100%">
      <tr>
        <td class="label">开始时间：</td>
        <td class="content">
          <el-radio-group v-model="startTimeval">
            <el-radio
              v-for="item in timesData"
              :label="item.label"
              :key="item.val"
              @change="timeChanged(item)">
            </el-radio>
          </el-radio-group>
        </td>
      </tr>
    </table>

    <span slot="footer">
      <el-button type="primary" @click="btnConfirm" :size="size">确定</el-button>
      <el-button @click="btnCancel" :size="size">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getDateStr, getTimeHHmm } from '../util';

function getDayTime(d, hour) {
  let servDate = getDateStr(new Date(d)); // 课程日期
  return (new Date(`${servDate.replace(/\-/g, '/')} ${hour}`)).getTime();
}

/* 新增排课对话框 */
export default {
  data() {
    return {
      size: 'small',
      visible: false,
      paste: null,
      course: null,
      dataType: -1,
      columnId: -1,
      courseDate: '',
      currentDate: '',
      startTimeval: '',
      timesData: []
    };
  },

  watch: {
    paste: {
      immediate: true,
      handler(n) {
        if (n && this.courseDate) {
          let {dataType, columnId, course, hour, span} = n;
          let chtime =  getDayTime(this.courseDate, hour);
          let timesData = [];
          let tmptime = 0;
          let maxMinux = 60 * span;
          for (let i = 0; i < maxMinux; i += 5) {
            tmptime = i * 1000 * 60 + chtime;
            timesData.push({label: getTimeHHmm(tmptime), val: tmptime});
          }
          this.course = course;
          this.dataType = dataType;
          this.columnId = columnId;
          this.timesData  = timesData;
        }
      }
    }
  },

  methods: {

    getTypeProp(t) {

      if (t === 1) { // 教室查看方式
        return 'classRoomID';
      } else if (t === 2) { // 老师查看方式
        return 'teacherID';
      }
    },

    btnConfirm() {
      debugger;
      this.visible = false;
    },

    btnCancel() {
      debugger;
      this.visible = false;
    },

    timeChanged(item) {
      debugger;
    }
  }
};
</script>

