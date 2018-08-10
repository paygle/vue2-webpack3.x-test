<template>
  <div class="arrange-course-pane">
    <table border="0" cellpadding="0" cellspacing="0">
      <tr v-if="type==1">
        <td class="label">排课分校：</td>
        <td class="select">
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
        </td>
        <td></td>
      </tr>
      <tr v-if="type==1 || type==3">
        <td class="label">选择学生：</td>
        <td class="select">
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
        </td>
        <td>
          <el-checkbox v-model="awaitArranged">仅显示待排课</el-checkbox>
        </td>
      </tr>
      <tr v-if="type==2">
        <td class="label">选择班级：</td>
        <td class="select">
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
        </td>
        <td>
          <el-checkbox v-model="awaitArranged">仅显示待排课</el-checkbox>
        </td>
      </tr>
      <tr v-if="type==1">
        <td class="label">选择课程：</td>
        <td class="select">
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
        </td>
        <td>
          <el-select
            v-show="isShowLevel"
            placeholder="请选择学生级别"
            v-model="student"
            :size="size">
            <el-option
              v-for="item in studentOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </td>
        <td>
          <el-select
            v-show="isShowLevel"
            v-model="student"
            placeholder="请选择教师级别"
            :size="size">
            <el-option
              v-for="item in studentOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </td>
      </tr>
      <tr v-if="type==3">
        <td class="label">选择教师：</td>
        <td colspan="3">练琴课无需老师</td>
      </tr>
      <tr v-if="type!=3">
        <td class="label">选择教师：</td>
        <td class="select">
          <el-select
            v-model="teacher"
            :size="size">
            <el-option
              v-for="item in teacherOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </td>
        <td>
          <el-button
            v-if="type==2"
            type="primary"
            @click="addTeacher"
            :size="size">
            新增教师
          </el-button>
        </td>
        <td></td>
      </tr>
      <tr v-if="type==2">
        <td class="label">选择助教：</td>
        <td class="select">
          <el-select
            v-model="teacher"
            :size="size">
            <el-option
              v-for="item in teacherOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td class="label">有效　期：</td>
        <td class="radio" colspan="3">
          <el-radio
            label="-1"
            v-model="weekPeriod"
            @change="weeksChanged">
            长期
          </el-radio>
          <el-radio
            label="2"
            v-model="weekPeriod"
            @change="weeksChanged">
            短期
          </el-radio>
          <span class="week-input" v-show="weekPeriod==2" >
            <el-input v-model="weeks"></el-input> 周
          </span>
          <span class="info" title="长期课会在课表中永久存在，除非删课或调课；短期课则最多可排52周">?</span>
        </td>
      </tr>
      <tr>
        <td class="label">重复形式：</td>
        <td class="radio" colspan="3">
          <el-radio
            label="1"
            v-model="sequence"
            @change="sequenceChanged">
            每周
          </el-radio>
          <el-radio
            label="2"
            v-model="sequence"
            @change="sequenceChanged">
            隔周
          </el-radio>
        </td>
      </tr>
      <tr>
        <td class="label">开始时间：</td>
        <td class="times-radio" colspan="3">
          <el-radio-group v-model="timeStart">
            <el-radio v-for="item in timesData" :label="item.label" :key="item.val"></el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td class="label">课程时长：</td>
        <td colspan="3">45分钟</td>
      </tr>
      <tr>
        <td class="label">上课教室：</td>
        <td>
          <el-select
            v-model="room"
            :size="size">
            <el-option
              v-for="item in roomOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </td>
        <td></td>
        <td></td>
      </tr>
    </table>
  </div>
</template>
<script>
// import { getPreZero } from '../util';

/* 新增排课对话框 */
export default {
  name: 'ArrangeCourse',
  props: {
    dataType: [Number, String],
    type: [Number, String],
    timesData: Array,
    submitData: Object
  },
  data() {
    return {
      size: 'small',
      visible: false,
      awaitArranged: false,
      isShowLevel: false,   // 是否显示学生/教师级别选择
      student: '',
      studentOptions: [],
      teacher: '',
      teacherOptions: [],
      room: '',
      roomOptions: [],
      timeStart: '',
      weeks: '',
      weekPeriod: '-1',
      sequence: '1'
    };
  },

  methods: {
    addTeacher() {

    },

    weeksChanged() {
      debugger;
    },

    sequenceChanged() {
      debugger;
    }
  },

  created() {

  }
};
</script>

