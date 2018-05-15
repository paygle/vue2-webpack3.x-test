// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@compo/scss/common.scss';
import './index.scss';
import '@mixins/locale';
import MainApp from '@compo/index/main-app';
import router from './router';
import store from './store';

// Export a function
Vue.config.productionTip = false;

console.log(Vue);

/* eslint-disable no-new */
new Vue({
  el: '#main-app',
  router,
  store,
  template: '<main-app/>',
  components: { MainApp },
  mounted() {

  }
});
