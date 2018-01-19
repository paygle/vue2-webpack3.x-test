// 单独打包动态加载组件，引入组件的方式，如下
// webpackChunkName 设置打包文件的名称，名称相同的会打包到同一个文件里面去
const HelloWorld = () => import(
  /* webpackChunkName: "example-pack-1" */
  '@compo/HelloWorld'
);
const FormExam = () => import(
  /* webpackChunkName: "example-pack-2" */
  '@pages/examples/src/example01/src/form-exam'
);
const TableExam = () => import(
  /* webpackChunkName: "example-pack-3" */
  '@pages/examples/src/example01/src/table-exam'
);

Vue.use(VueRouter);

console.log('VueRouter', VueRouter);
export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/form',
      name: 'FormExam',
      component: FormExam
    },
    {
      path: '/table',
      name: 'TableExam',
      component: TableExam
    }
  ]
});
