<template>
  <div id="main-app">Package APP TEST!!!
    <img src="../../assets/logo.png">
    {{$t('p0')}}：
    <el-select v-model="lang" @change="langChanged">
      <el-option value="zhCN" label="中文"></el-option>
      <el-option value="en" label="英文"></el-option>
      <el-option value="zhTW" label="繁体"></el-option>
    </el-select>
    <div class="main -router" v-if="langSwiched">
      <router-view/>
    </div>
  </div>
</template>
<script>
import { Select, Option } from 'element-ui';

Vue.use(Select);
Vue.use(Option);

export default {
  name: 'MainApp',
  data() {
    return {
      langSwiched: true,
      nav: navigator,
      lang: 'zhCN'
    };
  },
  methods: {
    // 语言切换
    langChanged(lang) {
      this.langSwiched = false;
      this.$setLocale(lang, () => { this.langSwiched = true; });
    }
  }
};
</script>
