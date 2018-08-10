<template>
  <el-dialog
    class="attendance-course-dialog"
    :visible.sync="visible"
    @open="dialogOpen"
    @close="dialogClose"
    width="65%">

     <ul class="course-info">
        <li class="info">课程信息：{{courseDesc}}</li>
        <li class="info">上课时间：{{courseDate}}</li>
        <li class="info">上课教师：{{teacher}}</li>
        <li class="info">上课教室：{{classRoomName}}</li>
     </ul>

     <el-table
       class="students-attendance"
      :data="attendanceList"
      style="width: 100%" stripe>
      <el-table-column prop="name" width="220">
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-radio-group v-model="scope.row.attence">
            <el-radio
              v-for="item in batOptions"
              :key="item.key"
              :label="item.key">
              {{item.text}}
            </el-radio>
          </el-radio-group>
          <span class="mL10">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
    </el-table>

    <div v-if="courseType==2" class="mT10">
      <div class="row-cell">批量考勤：
        <el-select v-model="batsetValue" placeholder="请选择">
          <el-option
            v-for="item in batOptions"
            :key="item.key"
            :label="item.text"
            :value="item.key">
          </el-option>
        </el-select>
      </div>
      <bnj-pagination :option="pagingOption" @change="handleCurrentChange"></bnj-pagination>
      <div class="notice mT10">
        准时、迟到、旷课将会扣除学生课时，请假、停课不扣<br/>集体课考勤为请假后，要在 集体课补课 处为学生补课
      </div>
    </div>

    <div v-else class="notice mT10">
      准时、迟到、旷课、请假扣课时需要扣除学生课时；停课，请假不会扣除学生课时
    </div>

    <span slot="footer">
      <el-button type="primary" @click="btnConfirm" :size="size">确定</el-button>
      <el-button @click="btnCancel" :size="size">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getPreZero } from '../util';
import BnjPagination from '@compo/public/bnj-pagination';

// 考勤数据格式
let attendanceData = {
  'status': 0,
  'msg': '成功!',
  'amount': 5,
  'data': null,
  'list': [
    {
      'studentid': 123539,
      'name': '学生42',
      'attence': 0,
      'cancleReason': ''
    },
    {
      'studentid': 122905,
      'name': 'Xie线索',
      'attence': 0,
      'cancleReason': ''
    },
    {
      'studentid': 122245,
      'name': '学生201740106',
      'attence': 0,
      'cancleReason': ''
    },
    {
      'studentid': 122900,
      'name': '学生Xie001',
      'attence': 0,
      'cancleReason': ''
    },
    {
      'studentid': 122257,
      'name': '学生201740601',
      'attence': 0,
      'cancleReason': ''
    }
  ]
};

/* 考勤对话框 */
export default {
  components: {
    BnjPagination
  },
  data() {
    return {
      courseType: 1, // 1 个体， 2 集体， 3 练琴
      typeText: '',
      courseDesc: '',
      courseDate: '',
      teacher: '',
      classRoomName: '',
      size: 'small',
      visible: false,
      course: null,
      pagingOption: {currentPage: 1, pageSize: 10, total: 100},
      attendanceList: [],
      batsetValue: '',     // 批量设值
      batOptions: [
        {key: 1, text: '准时'},
        {key: 2, text: '迟到'},
        {key: 3, text: '请假'},
        {key: 4, text: '旷课'},
        {key: 5, text: '停课'}
      ],
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
    // 批量设置
    batsetValue(n, o) {

      if (n && this.attendanceList.length) {
        let _this = this;
        let hasDifferent = false;
        let list = this.attendanceList;
        for (let i = 0; i < list.length; i++) {
          if (list[i]['attence'] !== list[list.length - 1]['attence']) {
            hasDifferent = true;
            break;
          }
        }
        // 各学生考勤有不同时提示是否继续
        if (hasDifferent) {
          this.$confirm('此操作将统一修改学生考勤, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _this.attendanceList.forEach((item)=>{ item.attence = n; });
          }).catch(() => {
            this.batsetValue = '';
          });

        } else {
          this.attendanceList.forEach((item)=>{ item.attence = n; });
        }
      }
    },

    course(nc) {
      if (nc) {
        this.courseType = nc.courseType;
        this.courseDesc = `【${this.typeText}】${nc.courseName}`; // courseType 个别课  (courseName)
        this.courseDate = this.getCourseDate(nc);
        this.teacher = nc.teacher;
        this.classRoomName = nc.classRoomName;
      }
    }
  },

  methods: {

    getCourseDate(dt) {
      let st = new Date(dt.startTime);
      let y = st.getFullYear();
      let m = st.getMonth() + 1;
      let d = st.getDate();
      let hh = st.getHours();
      let mm = st.getMinutes();
      return `${y}-${getPreZero(m, 2)}-${getPreZero(d, 2)} ${getPreZero(hh, 2)}:${getPreZero(mm, 2)}:00`;
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

    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }

  },

  created() {
    this.attendanceList = attendanceData.list;
    this.datatotal = attendanceData.amount;
  }
};
</script>

