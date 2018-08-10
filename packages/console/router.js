import { setDirectorEntrys } from '@utils/storage';
import { mergeTarget } from '@utils/merge-target';
import ConsoleRouter from './src/router'; // 设置路由

Vue.use(VueRouter);

// 合并路由
const routers = mergeTarget({
  routes: []
},
// 在此添加你的路由
[ConsoleRouter]);

const Router = new VueRouter(routers);

// 全局路由拦截注册
Router.afterEach((to, from) => {
  setDirectorEntrys(to);
});

export default Router;
