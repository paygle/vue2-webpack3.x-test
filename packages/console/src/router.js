import { setTitle } from '@utils/utilstool';
let titleHandler;

// 工作台 - 首页
const Home = () => import(
  /* webpackChunkName: "home-20180711" */
  './home/main.vue'
);

// 工作台 - 登录
const Login = () => import(
  /* webpackChunkName: "login-20180711" */
  './login/main.vue'
);

// 工作台 - 登录
const ClientLogin = () => import(
  /* webpackChunkName: "clientlogin-20180711" */
  './login/client-login.vue'
);

// 工作台 - 登录
const TrialLogin = () => import(
  /* webpackChunkName: "triallogin-20180711" */
  './login/trial-login.vue'
);

// 路由配置
export default {
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/lg',
      name: 'login',
      redirect: '/lg/user',
      meta: {label: '登录'},
      component: Login,
      beforeEnter: (to, from, next)=>{ setTitle(to, titleHandler); next(); },
      children: [
        {
          path: 'user',
          name: 'client',
          meta: {label: '用户登录'},
          component: ClientLogin,
          beforeEnter: (to, from, next) => { setTitle(to, titleHandler); next(); }
        },
        {
          path: 'trial',
          name: 'trial',
          meta: {label: '试用登录'},
          component: TrialLogin,
          beforeEnter: (to, from, next) => { setTitle(to, titleHandler); next(); }
        }
      ]
    },
    {
      path: '/home',
      name: 'home',
      meta: {label: '控制台'},
      component: Home,
      beforeEnter: (to, from, next) => { setTitle(to, titleHandler); next(); }
    }
  ]
};
