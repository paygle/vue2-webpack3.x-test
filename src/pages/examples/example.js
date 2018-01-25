import './example.scss';
import ExampleMain from '@compo/examples/exmaple-main';
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
