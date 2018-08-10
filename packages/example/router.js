import { setRunTimeout } from '@utils/utilstool';
import IconsBox from './src/icons-box';

Vue.use(VueRouter);

let titleHandler;
// 设置标题内容
function setTitle(to) {
  setRunTimeout(titleHandler, (r) => {
    document.title = r.meta.label || '';
  }, [to], 100);
}

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'IconsBox',
      meta: {label: '字体图标'},
      component: IconsBox,
      beforeEnter: (to, from, next) => { setTitle(to); next(); }
    }
  ]
});

export default router;
