import '@compo/scss/common.scss';
import './example.scss';
import ExampleMain from '@compo/examples/exmaple-main';
import router from './router';
import store from './store';
import axios from 'axios';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios; // 在其他vue组件中就可以this.$axios调用使用

/* eslint-disable no-new */
new Vue({
  el: '#main-example',
  mixins: [ExampleMain],
  router,
  store,
  data() {
    return {
      activeIndex: '2-1'
    };
  }
});
