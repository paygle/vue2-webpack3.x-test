import '@packs/scss/common.scss';
import './example.scss';
import '@utils/locale';
import ExampleMain from '@compo/examples/exmaple-main';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
/* eslint-disable no-new */

new Vue({
  el: '#main-body',
  mixins: [ExampleMain],
  router,
  store,
  data() {
    return {

    };
  }
});
