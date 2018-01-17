// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias
import './example.scss';
import Vue from 'vue';
import VueRouter from 'vue-router';
import ExampleMain from '@compo/exmaple-main';
import IconsBox from 'src/pages/examples/src/icons-box';
import { ElMenu, ElSubmenu, ElMenuItem } from 'element-ui';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(ElMenu);
Vue.use(ElSubmenu);
Vue.use(ElMenuItem);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'IconsBox',
      component: IconsBox
    }
  ]
});

/* eslint-disable no-new */
new Vue({
  el: '#test-coverage',
  mixins: [ExampleMain],
  router,
  data() {
    return {
      activeIndex: '1'
    };
  }
});
