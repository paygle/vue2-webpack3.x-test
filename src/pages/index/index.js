// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './index.scss';
import MainApp from '@compo/index/main-app';
import router from './router';

// Export a function
Vue.config.productionTip = false;

console.log(Vue);

/* eslint-disable no-new */
new Vue({
  el: '#main-app',
  router,
  template: '<main-app/>',
  components: { MainApp },
  mounted() {
    console.log('jQ:', $);
    console.log('ZTree:', $.fn.zTree.init($('#tree')));
  }
});
