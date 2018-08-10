<template>
  <el-dialog
    class="arrange-course-dialog"
    :visible.sync="visible"
    @open="dialogOpen"
    @close="dialogClose"
    width="65%">
    <el-tabs v-model="activedTab" @tab-click="tabClicked" type="border-card">
      <el-tab-pane label="个别课排课" name="1">
        <arrange-course
          :type="showtype"
          :dataType="dataType"
          :times-data="timesData"
          :submit-data.sync="submitData">
        </arrange-course>
      </el-tab-pane>
      <el-tab-pane label="班级排课" name="2">
        <arrange-course
          :type="showtype"
          :dataType="dataType"
          :times-data="timesData"
          :submit-data.sync="submitData">
        </arrange-course>
      </el-tab-pane>
      <el-tab-pane label="练琴排课" name="3">
        <arrange-course
          :type="showtype"
          :dataType="dataType"
          :times-data="timesData"
          :submit-data.sync="submitData">
        </arrange-course>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer">
      <el-button type="primary" @click="btnConfirm" :size="size">确定</el-button>
      <el-button @click="btnCancel" :size="size">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getDateStr, getTimeHHmm } from '../util';
import ArrangeCourse from './arrange-course';

function getDayTime(d, hour) {
  let servDate = getDateStr(new Date(d)); // 课程日期
  return (new Date(`${servDate.replace(/\-/g, '/')} ${hour}`)).getTime();
}

/* 新增排课对话框 */
export default {
  components: {
    ArrangeCourse
  },
  data() {
    return {
      typeText: '',
      size: 'small',
      visible: false,
      gridData: null,
      courseDate: '',
      currentDate: '',
      span: 1,
      hour: 0,
      activedTab: '1',
      showtype: '1',
      dataType: -1,
      columnId: -1,
      submitData: {},
      timesData: []
    };
  },

  watch: {
    gridData: {
      immediate: true,
      handler(n) {
        debugger;
        if (n && this.courseDate) {
          let {dataType, columnId, hour, span} = n;
          let chtime =  getDayTime(this.courseDate, hour);
          let timesData = [];
          let tmptime = 0;
          let maxMinux = 60 * span;
          for (let i = 0; i < maxMinux; i += 5) {
            tmptime = i * 1000 * 60 + chtime;
            timesData.push({label: getTimeHHmm(tmptime), val: tmptime});
          }
          this.dataType = dataType;
          this.columnId = columnId;
          this.timesData  = timesData;
        }
      }
    }
  },

  methods: {
    // Tab 点击事件
    tabClicked() {
      debugger;
      this.showtype = this.activedTab;
    },

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

  created() {

  }
};
</script>

