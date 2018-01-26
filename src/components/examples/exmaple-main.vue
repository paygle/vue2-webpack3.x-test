<template>
  <div class="exmaple-main">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect">
      <el-menu-item index="1"><a href="/index.html">首页</a></el-menu-item>
      <el-submenu index="2">
        <template slot="title">参考样例</template>
        <el-menu-item index="2-1"><a href="example.html">图标集合</a></el-menu-item>
        <el-menu-item index="2-2"><a href="example.html#/h">Hello World Inner</a></el-menu-item>
        <el-menu-item index="2-3"><a href="example01.html">Hello World</a></el-menu-item>
        <el-menu-item index="2-4"><a href="example02.html">Hello World</a></el-menu-item>
      </el-submenu>
    </el-menu>
    <router-view></router-view>
  </div>
</template>
<<script>
export default {
  name: 'ExmapleMain',
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
