import '@compo/scss/common.scss';
import './example.scss';
import ExampleMain from '@compo/examples/exmaple-main';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#main-example',
  mixins: [ExampleMain],
  router,
  store,
  data() {
    return {
      activeIndex: '1'
    };
  }
});
