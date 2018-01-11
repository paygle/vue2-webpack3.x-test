import HelloWorld from '@compo/HelloWorld';
import IconsBox from './src/icons-box';

Vue.use(VueRouter);
// 导航标题定义
const docTitles = {
  '/h': 'Hello World - ex'
};
const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'IconsBox',
      component: IconsBox
    },
    {
      path: '/h',
      name: 'HelloWorld',
      component: HelloWorld,
      beforeEnter: (to, from, next)=>{
        document.title = docTitles[to.path] || '';
        next();
      }
    }
  ]
});

export default router;
