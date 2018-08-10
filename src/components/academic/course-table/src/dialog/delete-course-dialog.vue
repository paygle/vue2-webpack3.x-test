<template>
  <el-dialog
    class="delete-course-dialog"
    :visible.sync="visible"
    width="65%">
    <table class="out-table" border="0" cellpadding="0" cellspacing="0" style="width:100%">
      <tr>
        <td class="label"><span class="red">*</span>课程有效期：</td>
        <td class="radio">
          <el-radio
            label="-1"
            v-model="weekPeriod"
            @change="weeksChanged">
            长期
          </el-radio>
          <span class="info" title="长期课在课表中永久保持，除非删除或调课">?</span>
        </td>
        <td>
          <el-radio
            label="2"
            v-model="weekPeriod"
            @change="weeksChanged">
            短期
          </el-radio>
          <span class="info" title="短期课最多可排52周">?</span>
        </td>
        <td>
          <el-input v-show="weekPeriod==2" v-model="weeks"></el-input> 周
        </td>
      </tr>
      <tr>
        <td class="label"><span class="red">*</span>形式：</td>
        <td class="radio">
          <el-radio
            label="1"
            v-model="sequence"
            @change="sequenceChanged">
            连续
          </el-radio>
        </td>
        <td>
          <el-radio
            label="2"
            v-model="sequence"
            @change="sequenceChanged">
            隔周
          </el-radio>
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
import { getTimezone } from '../util';

/* 新增排课对话框 */
export default {
  data() {
    return {
      size: 'small',
      visible: false,
      course: null,
      weeks: '',
      weekPeriod: '-1',
      sequence: '1'
    };
  },

  methods: {

    btnConfirm() {
      debugger;
      this.visible = false;
      getTimezone();
    },

    btnCancel() {
      debugger;
      this.visible = false;
    },

    weeksChanged() {
      debugger;
    },

    sequenceChanged() {
      debugger;
    }
  }
};
</script>

