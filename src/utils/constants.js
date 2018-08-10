/** CONSTANT 常量定义文件 */

// 公共文件前缀url  image的
export const CDN_IMAGE = '//icdn1.bangnijiao.com';

// 公共文件前缀url  video的
export const CDN_VIDEO = '//vcdn1.bangnijiao.com';

// 公共文件前缀url  audio的
export const CDN_AUDIO = '//acdn1.bangnijiao.com';

// 公共文件前缀url  file的
export const CDN_FILE = '//fcdn1.bangnijiao.com';

// 后端代理路径，打包请放开
// export const PROXY_URL = {};

// 后端代理路径，打包请注释
export const PROXY_URLS = {
  old: '/old-api',
  academic: '/academic-api',
  service: '/service-api',
  charge: '/charge-api',
  console: '/console-api',
  enroll: '/enroll-api',
  finance: '/finance-api',
  office: '/office-api',
  setting: '/setting-api'
};

const host = location.origin;

/**
 * 请勿删除，请根据实际环境，注释对应的 URL 前代码
 * 开发时使用URL前缀，请注释其他 PREURL 代码
 */
export const PREURL = {
  console: host + '/console.html',        // 操作台项目
  academic: host + '/academic.html',      // 教务项目
  service: host + '/addedservice.html',   // 增值服务项目
  charge: host + '/charge.html',          // 收费项目
  enroll: host + '/enroll.html',          // 招生项目
  finance: host + '/finance.html',        // 财务项目
  office: host + '/office.html',          // 办公项目
  setting: host + '/setting.html',        // 设置项目

  report: host + '/report.html',          // 报表项目
  purchase: host + '/purchase.html',      // 云采购项目
  inventory: host + '/inventory.html',    // 进销存项目
  store: host + '/store.html',            // 微商城项目
  musicexam: host + '/musicexam.html'     // 考级项目
};

/**
 * 请勿删除，请根据实际环境，注释对应的 URL 前代码
 * 正式服务器部署时使用，请注释其他 PREURL 代码
 */
// export const PREURL = {
//   console: '//console.bangnijiao.com/',
//   academic: '//academic.bangnijiao.com/',
//   service: '//service.bangnijiao.com/',
//   charge: '//charge.bangnijiao.com/',
//   enroll: '//enroll.bangnijiao.com/',
//   finance: '//finance.bangnijiao.com/',
//   office: '//office.bangnijiao.com/',
//   setting: '//setting.bangnijiao.com/',
//   report: '//report.bangnijiao.com/',
//   purchase: '//purchase.bangnijiao.com/',
//   inventory: '//inventory.bangnijiao.com/',
//   store: '//store.bangnijiao.com/',
//   musicexam: '//musicexam.bangnijiao.com/'
// };

/**
 * 请勿删除，请根据实际环境，注释对应的 URL 前代码
 * 在打包到dist目录后，运行 npm run product 开发产品模式查看使用，请注释其他 PREURL 代码
 */
// export const PREURL = {
//   console: host + '/console',
//   academic: host + '/academic',
//   service: host + '/addedservice',
//   charge: host + '/charge',
//   enroll: host + '/enroll',
//   finance: host + '/finance',
//   office: host + '/office',
//   setting: host + '/setting',

//   report: host + '/report',
//   purchase: host + '/purchase',
//   inventory: host + '/inventory',
//   store: host + '/store',
//   musicexam: host + '/musicexam'
// };

// iframe 存储URL
// export const IFRAME_STORE_URL = '//console.bangnijiao.com/static/data/iframestore.html';

// 公共常用URL数据获取
export const COMMON_URL_DATA = {
  compaus: {proxy: 'old', prop: 'compaus', method: 'post', save: 0, url: ''}
};

// 主菜单数据数据定义
export const MAIN_MENUS = [
  {value: '0', label: '首页', auth: 123, icon: 'el-icon-setting', url: PREURL.console + '#/home'},
  {value: '1', label: '办公', auth: 123, icon: 'el-icon-setting', url: PREURL.office + '#/',
    children: [
      {value: '1-1', label: '消息提醒', auth: 123, url: PREURL.office + '#/o/notify'},
      {value: '1-2', label: '信息中心', auth: 123, url: PREURL.office + '#/o/center'},
      {value: '1-3', label: '事项办理', auth: 123, url: PREURL.office + '#/o/tasks'},
      {value: '1-4', label: '业务审核', auth: 123, url: PREURL.office + '#/o/requests'},
      {value: '1-5', label: '假期管理', auth: 123, url: PREURL.office + '#/o/holiday'},
      {value: '1-6', label: '人事管理', auth: 123, flag: true, url: PREURL.office + '#/o/personnel',
        children: [
          {value: '1-6-1', label: '职工管理', auth: 123,  url: PREURL.office + '#/o/personnel/sm'},
          {value: '1-6-2', label: '教师管理', auth: 123,  url: PREURL.office + '#/o/personnel/tm'},
          {value: '1-6-3', label: '角色管理', auth: 123,  url: PREURL.office + '#/o/personnel/rm'},
          {value: '1-6-4', label: '客服号管理', auth: 123, url: PREURL.office + '#/o/personnel/cs'}
        ]
      },
      {value: '1-7', label: '考勤管理', auth: 123, flag: true, url: PREURL.office + '#/o/attendance/ta',
        children: [
          {value: '1-7-1', label: '教师考勤', auth: 123,  url: PREURL.office + '#/o/attendance/ta'},
          {value: '1-7-2', label: '员工考勤', auth: 123,  url: PREURL.office + '#/o/attendance/sa'},
          {value: '1-7-3', label: '考勤设置', auth: 123,  url: PREURL.office + '#/o/attendance/as'}
        ]
      },
      {value: '1-8', label: '意见反馈', auth: 123, url: PREURL.office + '#/o/feedback'},
      {value: '1-9', label: '更新日志', auth: 123, url: PREURL.office + '#/o/updatelog'}
    ]
  },
  {value: '2', label: '招生', auth: 123, icon: 'el-icon-setting', url: PREURL.enroll + '#/',
    children: [
      {value: '2-1', label: '意向学生', auth: 123, url: PREURL.enroll + '#/e/pros'},
      {value: '2-2', label: '到访查询', auth: 123, url: PREURL.enroll + '#/e/visiting'},
      {value: '2-3', label: '试听管理', auth: 123, url: PREURL.enroll + '#/e/trial'},
      {value: '2-4', label: '招生目标', auth: 123, url: PREURL.enroll + '#/e/goal'},
      {value: '2-5', label: '提成管理', auth: 123, flag: true, url: PREURL.enroll + '#/e/commission',
        children: [
          {value: '2-5-1', label: '招生提成', auth: 123,  url: PREURL.enroll + '#/e/commission/ec'},
          {value: '2-5-2', label: '教职工推荐奖励', auth: 123,  url: PREURL.enroll + '#/e/commission/rr'}
        ]
      },
      {value: '2-6', label: '招生设置', auth: 123, url: PREURL.enroll + '#/e/setting'}
    ]
  },
  {value: '3', label: '收费', auth: 123, icon: 'el-icon-setting', url: PREURL.charge + '#/',
    children: [
      {value: '3-1', label: '收费', auth: 123, url: PREURL.charge + '#/c/charge'},
      {value: '3-2', label: '订单管理', auth: 123, flag: true, url: PREURL.charge + '#/c/order',
        children: [
          {value: '3-2-1', label: '收费订单', auth: 123, flag: true, url: PREURL.charge + '#/c/order/cor'},
          {value: '3-2-2', label: '学生APP订单', auth: 123, flag: true, url: PREURL.charge + '#/c/order/aor'}
        ]
      },
      {value: '3-3', label: '服务管理', auth: 123, url: PREURL.charge + '#/c/service'},
      {value: '3-4', label: '收费设置', auth: 123, flag: true, url: PREURL.charge + '#/c/setting',
        children: [
          {value: '3-4-1', label: '收费项设置', auth: 123, url: PREURL.charge + '#/c/setting/sf'},
          {value: '3-4-2', label: '退费扣费设置', auth: 123, url: PREURL.charge + '#/c/setting/tf'}
        ]
      }
    ]
  },
  {value: '4', label: '教务', auth: 123, icon: 'el-icon-setting', url: PREURL.academic + '#/',
    children: [
      {value: '4-1', label: '学生管理', auth: 123, flag: true, url: PREURL.academic + '#/ac/student',
        children: [
          {value: '4-1-1', label: '学生列表', auth: 123, flag: true, url: PREURL.academic + '#/ac/student/stl'},
          {value: '4-1-2', label: '学生考勤', auth: 123, flag: true, url: PREURL.academic + '#/ac/student/atd'},
          {value: '4-1-3', label: '学生请假', auth: 123, flag: true, url: PREURL.academic + '#/ac/student/lrd'}
        ]
      },
      {value: '4-2', label: '交费管理', auth: 123, flag: true, url: PREURL.academic + '#/ac/payment'},
      {value: '4-3', label: '排课管理', auth: 123, flag: true, url: PREURL.academic + '#/ac/scheduling'},
      {value: '4-4', label: '教务查询', auth: 123, flag: true, url: PREURL.academic + '#/ac/acdata'},
      {value: '4-5', label: '教务设置', auth: 123, flag: true, url: PREURL.academic + '#/ac/settings'}
    ]
  },
  {value: '5', label: '财务', auth: 123, icon: 'el-icon-setting', url: PREURL.finance + '#/',
    children: [
      {value: '5-1', label: '出纳日记账', auth: 123, url: PREURL.finance + '#/f/cashier/jn'},
      {value: '5-2', label: '教学收入', auth: 123, url: PREURL.finance + '#/f/teaching/in'},
      {value: '5-3', label: '平台资金', auth: 123, flag: true, url: PREURL.finance + '#/'},
      {value: '5-4', label: '工资管理', auth: 123, flag: true, url: PREURL.finance + '#/'},
      {value: '5-5', label: '应收款', auth: 123, url: PREURL.finance + '#/f/receive/ys'},
      {value: '5-6', label: '应付款', auth: 123, url: PREURL.finance + '#/f/payable/yf'},
      {value: '5-7', label: '固定资产', auth: 123, url: PREURL.finance + '#/'},
      {value: '5-8', label: '优惠券', auth: 123, url: PREURL.finance + '#/f/coupons/yhj'},
      {value: '5-9', label: '会员管理', auth: 123, flag: true, url: PREURL.finance + '#/f/member/sk'},
      {value: '5-10', label: '财务设置', auth: 123, flag: true, url: PREURL.finance + '#/'}
    ]
  },
  // {value: '6', label: '报表', auth: 123, icon: 'el-icon-setting', url: PREURL.report + '#/',
  //   children: [
  //     {value: '6-1', label: '教学预收款', auth: 123, url: PREURL.report + '#/'},
  //     {value: '6-2', label: '课程收费统计', auth: 123, url: PREURL.report + '#/'},
  //     {value: '6-3', label: '教学收入统计', auth: 123, url: PREURL.report + '#/'},
  //     {value: '6-4', label: '增长率统计', auth: 123, url: PREURL.report + '#/'},
  //     {value: '6-5', label: '流失率统计', auth: 123, url: PREURL.report + '#/'}
  //   ]
  // },
  // {value: '7', label: '云采购', auth: 123, icon: 'el-icon-setting', url: PREURL.purchase + '#/',
  //   children: [
  //     {value: '7-1', label: '商城', auth: 123, url: PREURL.purchase + '#/'},
  //     {value: '7-2', label: '购物车', auth: 123, url: PREURL.purchase + '#/'},
  //     {value: '7-3', label: '我的订单', auth: 123, url: PREURL.purchase + '#/'},
  //     {value: '7-4', label: '我的关注', auth: 123, url: PREURL.purchase + '#/'},
  //     {value: '7-5', label: '收货地址', auth: 123, url: PREURL.purchase + '#/'},
  //     {value: '7-6', label: '优惠券管理', auth: 123, url: PREURL.purchase + '#/'},
  //     {value: '7-7', label: '个人中心', auth: 123, url: PREURL.purchase + '#/'}
  //   ]
  // },
  // {value: '8', label: '进销存', auth: 123, icon: 'el-icon-setting', url: PREURL.inventory + '#/',
  //   children: [
  //     {value: '8-1', label: '销售管理', auth: 123, url: PREURL.inventory + '#/'},
  //     {value: '8-2', label: '采购管理', auth: 123, url: PREURL.inventory + '#/'},
  //     {value: '8-3', label: '调拨管理', auth: 123, url: PREURL.inventory + '#/'},
  //     {value: '8-4', label: '账单管理', auth: 123, url: PREURL.inventory + '#/'},
  //     {value: '8-5', label: '商品管理', auth: 123, url: PREURL.inventory + '#/'},
  //     {value: '8-6', label: '档案管理', auth: 123, url: PREURL.inventory + '#/'},
  //     {value: '8-7', label: '系统管理', auth: 123, url: PREURL.inventory + '#/'}
  //   ]
  // },
  // {value: '9', label: '微商城', auth: 123, icon: 'el-icon-setting', url: PREURL.store + '#/',
  //   children: [
  //     {value: '9-1', label: '微商城', auth: 123, url: PREURL.store + '#/'},
  //     {value: '9-2', label: '订单管理', auth: 123, url: PREURL.store + '#/'},
  //     {value: '9-3', label: '发货设置', auth: 123, url: PREURL.store + '#/'},
  //     {value: '9-4', label: '活动', auth: 123, url: PREURL.store + '#/'}
  //   ]
  // },
  // {value: '10', label: '考级', auth: 123, icon: 'el-icon-setting', url: PREURL.musicexam + '#/',
  //   children: [
  //     {value: '10-1', label: '公告信息', auth: 123, url: PREURL.musicexam + '#/'},
  //     {value: '10-2', label: '考试安排', auth: 123, url: PREURL.musicexam + '#/'},
  //     {value: '10-3', label: '考生管理', auth: 123, url: PREURL.musicexam + '#/'},
  //     {value: '10-4', label: '证书管理', auth: 123, url: PREURL.musicexam + '#/'},
  //     {value: '10-5', label: '考试交费明细', auth: 123, url: PREURL.musicexam + '#/'},
  //     {value: '10-6', label: '提成明细', auth: 123, url: PREURL.musicexam + '#/'}
  //   ]
  // },
  {value: '11', label: '增值服务', auth: 123, icon: 'el-icon-setting', url: PREURL.service + '#/',
    children: [
      {value: '11-1', label: '增值服务', auth: 123, flag: true, url: PREURL.service + '#/service'}
    ]
  },
  {value: '12', label: '设置', auth: 123, icon: 'el-icon-setting', url: PREURL.setting + '#/',
    children: [
      {value: '12-1', label: '基础设置', auth: 123, flag: true, url: PREURL.setting + '#/s/basic',
        children: [
          {value: '12-1-1', label: '机构信息', auth: 123, flag: true, url: PREURL.setting + '#/s/basic/ins'},
          {value: '12-1-2', label: '分校管理', auth: 123, flag: true, url: PREURL.setting + '#/s/basic/brh'},
          {value: '12-1-3', label: '合作机构管理', auth: 123, flag: true, url: PREURL.setting + '#/s/basic/ptn'}
        ]
      },
      {value: '12-2', label: '个人中心', auth: 123, url: PREURL.setting + '#/s/personal'},
      {value: '12-3', label: '报表设置', auth: 123, url: PREURL.setting + '#/s/reports'},
      {value: '12-4', label: '系统初始化', auth: 123, url: PREURL.setting + '#/s/system'},
      {value: '12-5', label: '操作日志', auth: 123, url: PREURL.setting + '#/s/log'},
      {value: '12-6', label: '订单管理', auth: 123, url: PREURL.setting + '#/s/order'}
    ]
  }
];

