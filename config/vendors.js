const webpack = require('webpack')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')
let vendors = [ new WebpackMd5Hash() ]  // 使用Hash插件

if  (process.env.NODE_ENV !== 'testing') {
  // 由外部引入文件
  vendors = vendors.concat([new webpack.ProvidePlugin({
    'Vue': 'vue',
    'Vuex': 'vuex',
    'VueRouter': 'vue-router',
    'axios': 'axios',
    'Promise': 'promise',
    'ELEMENT': 'element-ui',
    'algoliasearch': 'algoliasearch'
    // 'echarts': 'echarts',
    // 'XLSX': 'xlsx'
  })]);
}

// 第一步（共3步）： 配置你的入口文件，可以使用通配符 *
const files = {
  'p1': 'console.html',      // 操作台项目
  'p2': 'academic.html',      // 教务项目
  'p3': 'addedservice.html',  // 增值服务项目
  'p4': 'charge.html',        // 收费项目
  'p5': 'enroll.html',        // 招生项目
  'p6': 'finance.html',       // 财务项目
  'p7': 'office.html',        // 办公项目
  'p8': 'setting.html',       // 设置项目
  'p9': 'example.html'       // 样例项目
}

// 第二步（共3步）： 开发环境库配置，一般配置未压缩版本库文件，在[]中加上你在第一步添加的文件Key值
const scripts_dev = [
  {'static/css/element.css': ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9']}, // Element-UI 样式
  {'static/css/combase.css': ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9']}, // 公共样式
  {'static/js/vue/polyfill.js': ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9']}, // 兼容处理
  {'static/js/vue/axios.js': ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9']}, // ajax请求处理
  {'static/js/vue/vue.js': ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9']},
  {'static/js/lang/zh-CN.js': ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9']}, // 默认界面语言
  {'static/js/vue/vuex.js': ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9']}, // vue 存储
  {'static/js/vue/vue-router.js': ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9']}, // vue 路由
  {'static/js/vue/element.js': ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9']}, // Element-UI库
  // {'static/js/vue/algoliasearch.js': ['p1']}, // 全文搜索
  // {'static/js/echarts/echarts.js': ['p2']}, // 图表库
  // {'static/js/echarts/echarts-amap.min.js': ['p2']},  // 图表辅助
  // {'static/js/xlsx/xlsx.full.min.js': ['p2']} // xlsx 文件处理
]

// 第三步（共3步）：打包发布库配置，一般配置压缩后的库文件，在[]中加上你在第一步添加的文件Key值
const scripts_product = [
  {'static/css/element.css': ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9']},
  {'static/css/combase.css': ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9']},
  {'static/js/vue/polyfill.min.js': ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9']},
  {'static/js/vue/axios.js': ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9']},
  {'static/js/vue/vue.min.js': ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9']},
  {'static/js/lang/zh-CN.js': ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9']},
  {'static/js/vue/vuex.min.js': ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9']},
  {'static/js/vue/vue-router.min.js': ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9']},
  {'static/js/vue/element.js': ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9']},
  // {'static/js/vue/algoliasearch.min.js': ['p1']},
  // {'static/js/echarts/echarts.min.js': ['p2']},
  // {'static/js/echarts/echarts-amap.min.js': ['p2']},
  // {'static/js/xlsx/xlsx.full.min.js': ['p2']}
]

function setVendors(files, scripts) {
  let f, sc, s, item, fl;
  for(f in files) {
    if (files.hasOwnProperty(f)) {
      sc = [];
      for(s = 0; s < scripts.length; s++) {
        item = scripts[s];
        for(fl in item) {
          if (item.hasOwnProperty(fl) &&
                Array.isArray(item[fl]) &&
                  item[fl].indexOf(f) > -1) {
            sc.push(fl);
          }
        }
      }
      vendors.push(
        new HtmlWebpackIncludeAssetsPlugin({
          files: files[f],
          assets: sc,
          append: false
        }));
    }
  }

  return vendors;
}

module.exports = process.env.NODE_ENV === 'production' ?
  setVendors(files, scripts_product) :  setVendors(files, scripts_dev) ;
