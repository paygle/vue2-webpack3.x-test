import HelloWorld from '@/HelloWorld';
import IconsBox from './src/icons-box';

Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'IconsBox',
      component: IconsBox,
      beforeRouteEnter(to, from, next) {

        debugger;
        console.log(to, from, next);

      }
    },
    {
      path: '/h',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
});

export default router;
