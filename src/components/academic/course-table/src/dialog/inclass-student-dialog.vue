<template>
  <el-dialog
    class="inclass-student-dialog"
    :visible.sync="visible"
    @open="dialogOpen"
    @close="dialogClose"
    width="65%">
    <table class="out-table" border="0" cellpadding="0" cellspacing="0" style="width:100%">
      <tr>
        <td class="label">班级名称：</td>
        <td class="content">{{course.className}}</td>
      </tr>
      <tr>
        <td class="label">所属课程：</td>
        <td class="content">{{course.courseName}}</td>
      </tr>
      <tr>
        <td class="label">上课教师：</td>
        <td class="content">{{course.teacher}}</td>
      </tr>
      <tr>
        <td class="label">上课时间：</td>
        <td class="content">{{startCourseTime}}</td>
      </tr>
      <tr>
        <td class="label">上课教室：</td>
        <td class="content">{{course.classRoomName}}</td>
      </tr>
      <tr>
        <td class="label">班内学生：</td>
        <td class="content">
          <template v-for="(item, idx) in courseStudents">
            <span :key="idx">
              {{item.studentname}}
              <span class="comma">，</span>
            </span>
          </template>
        </td>
      </tr>
      <tr>
        <td class="label" style="vertical-align: top;">添加学生：</td>
        <td class="content">
          <el-table
            class="inclass-students-table"
            :data="noneCourseStudents"
            style="width: 100%" stripe>
            <el-table-column width="40">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.selected"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column prop="studentname" width="180"></el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div v-show="scope.row.selected">
                  入班时间：
                  <el-date-picker
                    v-model="scope.row.starttime"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    :style="dateStyl"
                    :picker-options="pickerOptions">
                  </el-date-picker>
                </div>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div v-show="scope.row.selected">
                  出班时间：
                  <el-date-picker
                    v-model="scope.row.endtime"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    :style="dateStyl"
                    :disabled="scope.row.notout"
                    :picker-options="pickerOptions">
                  </el-date-picker>
                </div>
              </template>
            </el-table-column>
            <el-table-column width="100">
              <template slot-scope="scope">
                <div v-show="scope.row.selected">
                  <el-checkbox v-model="scope.row.notout">不出班</el-checkbox>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 100, 150]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="datatotal">
          </el-pagination>
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
import { getDateStr } from '../util';

const courseStudentList = {
  'status': 0,
  'msg': '成功!',
  'amount': 6,
  'data': null,
  'list': [
    {
      'studentid': 122245,
      'studentname': '学生201740106',
      'classtype': 0
    },
    {
      'studentid': 122257,
      'studentname': '学生201740601',
      'classtype': 0
    },
    {
      'studentid': 122900,
      'studentname': '学生Xie001',
      'classtype': 0
    },
    {
      'studentid': 122905,
      'studentname': 'Xie线索',
      'classtype': 0
    },
    {
      'studentid': 123225,
      'studentname': '嗪草',
      'classtype': 0
    },
    {
      'studentid': 123520,
      'studentname': '学生31',
      'classtype': 0
    }
  ]
};

const notCourseStudentList = {
  'status': 0,
  'msg': '成功!',
  'amount': 5,
  'data': null,
  'list': [
    {
      'studentid': 123344,
      'studentname': '测试收银台收费002',
      'section': 6,
      'starttime': '',
      'endtime': '',
      'notout': true,    // 新增
      'selected': false   // 新增
    },
    {
      'studentid': 123401,
      'studentname': '客户0001',
      'section': 0,
      'starttime': '',
      'endtime': '',
      'notout': true,
      'selected': false
    },
    {
      'studentid': 123483,
      'studentname': '钢琴学生A',
      'section': 0,
      'starttime': '',
      'endtime': '',
      'notout': true,
      'selected': false
    },
    {
      'studentid': 123522,
      'studentname': '学生33',
      'section': 0,
      'starttime': '',
      'endtime': '',
      'notout': true,
      'selected': false
    },
    {
      'studentid': 123539,
      'studentname': '学生42',
      'section': 0,
      'starttime': '',
      'endtime': '',
      'notout': true,
      'selected': false
    }
  ]
};

/* 班内学生对话框 */
export default {
  data() {
    return {
      typeText: '',
      size: 'small',
      visible: false,
      course: {},
      courseStudents: [],
      noneCourseStudents: [],
      currentPage: 1,
      datatotal: 0,
      dateStyl: {width: '150px'},
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      }
    };
  },

  computed: {
    startCourseTime() {
      return this.course ? getDateStr(this.course.startTime, true) : '';
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

    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },

  created() {
    this.courseStudents = courseStudentList.list;
    this.noneCourseStudents = notCourseStudentList.list;
  }
};
</script>

