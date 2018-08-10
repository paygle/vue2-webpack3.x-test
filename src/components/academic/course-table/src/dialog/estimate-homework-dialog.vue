<template>
  <el-dialog
    class="estimate-homework-dialog"
    :visible.sync="visible"
    @open="dialogOpen"
    @close="dialogClose"
    width="65%">
    <ul class="estimate-list">
      <li>
        <span class="label" colspan="2">课程信息：</span>
        <span class="content" colspan="3">{{course.className}}</span>
      </li>
      <li>
        <span class="label" colspan="2">班内有多名学生，请选择查看的学生：</span>
        <span class="content" colspan="3">
          <el-select
            v-model="student"
            :size="size">
            <el-option
              v-for="item in studentOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </span>
      </li>
      <li>
        <span>学生</span>
        <span>201740106</span>
        <span>评价</span>
        <span>1212：</span>
        <span class="content">{{course.teacher}}</span>
      </li>
      <li>
        <span>1212</span>
        <span>评价</span>
        <span>学生</span>
        <span>201740106:</span>
        <span class="content"></span>
      </li>
      <li>
        <span class="label" colspan="2">作业情况：</span>
        <span class="content" colspan="3">{{course.classRoomName}}未布置</span>
      </li>
    </ul>
    <span slot="footer">
      <el-button @click="btnCancel" :size="size">关 闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
// import { getPreZero } from '../util';

/* 评价与作业对话框 */
export default {
  data() {
    return {
      typeText: '',
      size: 'small',
      visible: false,
      course: {},
      student: '',
      studentOptions: []
    };
  },

  methods: {

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

