import './example.scss';
import ExampleMain from '@compo/exmaple-main';
import router from './router';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#main-example',
  mixins: [ExampleMain],
  router,
  data() {
    return {
      activeIndex: '1'
    };
  }
});
