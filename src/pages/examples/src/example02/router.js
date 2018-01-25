import HelloWorld from '@compo/examples/HelloWorld';

Vue.use(VueRouter);

console.log('VueRouter', VueRouter);
export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
});
