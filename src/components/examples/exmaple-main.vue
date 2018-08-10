<template>
  <div id="main-body" class="exmaple-main">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect">
      <el-menu-item index="1"><a href="/index.html">首页</a></el-menu-item>
      <el-submenu index="2">
        <template slot="title">参考样例</template>
        <el-menu-item index="2-1"><a href="example.html">图标集合</a></el-menu-item>
        <el-menu-item index="2-2"><a href="example.html#/course">Course Table</a></el-menu-item>
        <el-menu-item index="2-2"><a href="example.html#/h">Hello Inner</a></el-menu-item>
        <el-menu-item index="2-3"><a href="example01.html#/form">Hello Form</a></el-menu-item>
        <el-menu-item index="2-4"><a href="example01.html#/table">Hello Table</a></el-menu-item>
        <el-menu-item index="2-4"><a href="example02.html">example02</a></el-menu-item>
        <el-menu-item index="2-5"><a href="index.html">index</a></el-menu-item>
      </el-submenu>
    </el-menu>
    {{$t('p0')}}：
    <el-select v-model="lang" @change="langChanged">
      <el-option value="cn" label="中文"></el-option>
      <el-option value="en" label="英文"></el-option>
      <el-option value="tw" label="繁体"></el-option>
    </el-select>

    <div class="main-router" v-if="langSwiched">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>

export default {
  name: 'ExmapleMain',
  data() {
    return {
      langSwiched: true,
      lang: Vue.config.lang
    };
  },
  methods: {
    // 语言切换
    langChanged(lang) {
      this.langSwiched = false;
      this.$setLocale(lang, () => { this.langSwiched = true; });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style type="scss" scoped>
/* 请注意：在组件内部写样式请在 style 标签上面加上 scoped 属性，否则影响全局样式*/

</style>
