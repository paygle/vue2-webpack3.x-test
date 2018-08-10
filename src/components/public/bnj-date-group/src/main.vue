<template>
  <div id="bnj-date-group" >
    <div class="clear">
      <el-date-picker class="w-date fl" 
      v-model="date.startDate" 
      :type="datetype" 
      :disabled="disabled"
      :placeholder="date.startTitle"
      :picker-options="pickerOptions1"
      :value-format="format"></el-date-picker>

      <div class="fl pL5 pR5 lh32">~</div>

      <el-date-picker class="w-date fl" 
      v-model="date.endDate" 
      :type="datetype" 
      :disabled="disabled"
      :placeholder="date.endTitle"
      :picker-options="pickerOptions2"
      :value-format="format"></el-date-picker>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BnjDateGroup',
  componentName: 'BnjDateGroup',
  props: {
    date: Object,                                   // 时间对象
    format: { type: String, default: 'yyyy/MM/dd'}, // 时间格式
    disabled: Boolean,                              // 时间格式
    datetype: { type: String, default: 'date'}      // 时间type属性
  },
  data() {
    return {
      pickerOptions1: {
        disabledDate: (time) => {
          if (!this.date.endDate) {
            return;
          }
          return time.getTime() > new Date(this.date.endDate);
        }
      },
      pickerOptions2: {
        disabledDate: (time) => {
          if (!this.date.startDate) {
            return;
          }
          return time.getTime() < new Date(this.date.startDate);
        }
      }
    };
  },
  methods: {
    
  },
  mounted() {}
};
</script >

<style scoped lang="scss">

</style>