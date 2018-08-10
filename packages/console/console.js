import '@packs/scss/common.scss'; // 引入样式
import './console.scss';
import Console from './src/entry-main';
import router from './router';
import store from './store';
import '@utils/locale';
import '@utils/axios';
import '@utils/message-box';
// Export a function
Vue.config.productionTip = false;
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
/* eslint-disable no-new */

new Vue({
  el: '#body',
  mixins: [Console],
  router,
  store,
  data: {
    lang: Vue.config.lang
  },
  mounted() {
    this.$pusher({message: ['这是一个消息这是一个消息这是一个消息', '这是第二个消息这是第二个消息这是第二个消息这是第二个消息']});
  },
  created() {
    window.rootvuevm = this;
    ELEMENT.locale(Vue.langs.cn);
  }
});

