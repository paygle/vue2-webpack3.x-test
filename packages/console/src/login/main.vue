<template>
  <div class="login-wrapper">
    <div class="login-header">
      <div class="header-wrapper">
        <span class="logo"></span>
        <span class="m-txt" v-text="headtitle"></span>
        <div class="header-right">
          <a class="go-home" href="#">返回首页</a>
          <span class="use-english">English</span>
          <span class="phone">
            <i class="el-icon-phone-outline"></i>
            4000-912-819
          </span>
        </div>
      </div>
    </div>
    <div class="login-body">
      <router-view></router-view>
    </div>
    <div class="login-footer">
      Copyright © 2015-2018 广州闻乐教育科技有限公司 All Rights Reserved 粤ICP备15060403号
    </div>
  </div>
</template>
<script>

export default {
  name: 'Login',
  componentName: 'Login',
  data() {
    return {
      headtitle: ''
    };
  },

  methods: {
    updateTitle(v) {
      this.headtitle = v;
    }
  },
  mounted() {
    this.$on('update-title', this.updateTitle);
  }
};
</script>
