import HelloWorld from '@/HelloWorld';
import IconsBox from './src/icons-box';

Vue.use(VueRouter);
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
      beforeRouteEnter(to, from, next) {

        console.log('example router:', to, from, next);
      }
    }
  ]
});

export default router;
