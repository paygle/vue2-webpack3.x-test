<template>
  <div class="teacher-arrange-wrapper">
    <!-- 教师排课信息 -->
    <div class="arrange-box-wrapper">

      <div class="header">教师排课信息</div>
      <table>
        <colgroup>
          <col width="180"><col>
          <col width="180"><col>
        </colgroup>
        <tbody>
          <tr>
            <td>教师姓名：</td><td>俞苗杰</td>
            <td>分校：</td><td>天河校区</td>
            <td>手机号：</td><td>13456196165</td>
          </tr>
        </tbody>
      </table>

      <div class="row-cell">
        <div class="col-cell-x180 text-right">上课时间：</div>
        <div class="col-cell-x200">
          <el-date-picker
            type="week"
            v-model="currentDate"
            format="yyyy-MM-dd"
            placeholder="日期"
            :clearable="false">
          </el-date-picker>
        </div>
      </div>
      <div class="row-cell">
        <div class="col-cell-x180 text-right">最近周：</div>
        <div class="col-cell-auto">
          <el-button type="text" @click="goweeks('pre')">上一周</el-button>
          <el-button type="text" @click="goweeks('now')">本周</el-button>
          <el-button type="text" @click="goweeks('next')">下一周</el-button>
        </div>
      </div>

    </div>
    <course-table
      ref="coursetable"
      :type-data="typeData"
      display-type="teacher"
      @current-date="updateCurrentDate">
    </course-table>
  </div>
</template>
<script>
import CourseTable from '@compo/academic/course-table';
import emitter from '@mixins/emitter';

/**
  练琴课表请求参数 /arrangeCourse/refreshArrangeCourse4NewPracticePage.do

  studentPracticeID: 805
  dateTime: 1533657600000
  timezone: 8

 */

export default {
  name: 'TeacherArrange',
  componentName: 'TeacherArrange',
  mixins: [emitter],
  components: {
    CourseTable
  },
  data() {
    return {
      lang: Vue.config.lang,
      currentDate: '',
      typeData: {
        teacher: '',
        week: '',
        weekdate: ''
      }
    };
  },

  watch: {
    currentDate(n, o) {
      if (n !== o) {
        this.$table.goweeks('now', n);
      }
    }
  },

  computed: {
    $table() {
      return this.$refs.coursetable;
    }
  },

  methods: {
    // 跳转周
    goweeks(n) {
      this.$table.goweeks(n);
    },

    updateCurrentDate(d) {
      this.currentDate = d;
    }
  },
  mounted() {
    this.dispatch('BnjScheduling', 'update-tabheader', true);
  },

  beforeDestroy() {
    this.dispatch('BnjScheduling', 'update-tabheader', false);
  }
};
</script>
