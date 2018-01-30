<template>
  <div class="form-exam">
    form-exam
  </div>
</template>
<script>
export default {

  name: 'formExam',

  data() {
    return {

    };
  },

  watch: {
    // 路由方式获取参数
    '$route': 'fetchData',

    // vuex 方式获取参数
    params: {
      immediate: true,
      handler(v) {
        console.log('Params2: ', v);
      }
    }
  },

  methods: {
    // 路由方式获取参数
    fetchData() {
      console.log('Query data:', this.$route.query);
    }
  },

  created() {
    // 组件创建完后获取数据，
    this.fetchData();
  }
};
</script>
