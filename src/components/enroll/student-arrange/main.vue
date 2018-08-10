<template>
  <div class="student-arrange-wrapper">
    <!-- 个别课排课 -->
    <div class="arrange-box-wrapper">

      <div class="header">试听管理排课</div>

      <div class="row-cell">
        <div class="col-cell-x180 text-right">班级名称：</div>
        <div class="col-cell-x200">
          <el-input placeholder="班级名称"></el-input>
        </div>
      </div>
      <div class="row-cell">
        <div class="col-cell-x180 text-right">试听课程：</div>
        <div class="col-cell-x200">
          <el-select v-model="selectnum">
            <el-option label="试听课程" :value="1"></el-option>
          </el-select>
        </div>
      </div>
      <div class="row-cell">
        <div class="col-cell-x180 text-right">试听教师：</div>
        <div class="col-cell-x200">
          <el-select v-model="selectnum">
            <el-option label="试听教师" :value="1"></el-option>
          </el-select>
        </div>
        <div class="col-cell-auto">
          <el-button type="primary">新增教师</el-button>
        </div>
      </div>
      <div class="row-cell">
        <div class="col-cell-x180 text-right">试听时间：</div>
        <div class="col-cell-x200">
          <el-date-picker
            type="week"
            v-model="currentDate"
            format="yyyy-MM-dd"
            placeholder="日期"
            :clearable="false">
          </el-date-picker>
        </div>
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
      display-type="student"
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
  name: 'StudentArrange',
  componentName: 'StudentArrange',
  mixins: [emitter],
  components: {
    CourseTable
  },
  data() {
    return {
      lang: Vue.config.lang,
      selectnum: 1,
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
