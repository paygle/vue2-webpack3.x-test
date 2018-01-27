const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
let vendors = []

// 第一步（共3步）： 配置你的入口文件，可以使用通配符 *
const files = {
  'f1': 'index.html',
  'f2': 'example*.html'
}

// 第二步（共3步）： 开发环境库配置，一般配置未压缩版本库文件，在[]中加上你在第一步添加的文件Key值
const scripts_dev = {
  'static/css/element.css': ['f1', 'f2'],
  'static/css/ztree/default/zTreeStyle.css': ['f2'],
  'static/js/vue/polyfill.js': ['f1', 'f2'],
  'static/js/jq/jquery.js': ['f1', 'f2'],
  'static/js/jq/jquery.ztree.all.js': ['f2'],
  'static/js/jq/jquery.ztree.exhide.js': ['f2'],
  'static/js/vue/vue.js': ['f1', 'f2'],
  'static/js/vue/vuex.js': ['f1', 'f2'],
  'static/js/vue/vue-router.js': ['f1', 'f2'],
  'static/js/vue/element.js': ['f1', 'f2'],
  'static/js/echarts/echarts.js': ['f2'],
  'static/js/echarts/echarts-amap.min.js': ['f2'],
  'static/js/xlsx/xlsx.full.min.js': ['f2'],
  'static/js/pako/pako.js': ['f2']
}

// 第三步（共3步）：打包发布库配置，一般配置压缩后的库文件，在[]中加上你在第一步添加的文件Key值
const scripts_product = {
  'static/css/element.css': ['f1', 'f2'],
  'static/css/ztree/default/zTreeStyle.css': ['f2'],
  'static/js/vue/polyfill.min.js': ['f1', 'f2'],
  'static/js/jq/jquery.min.js': ['f1', 'f2'],
  'static/js/jq/jquery.ztree.all.min.js': ['f2'],
  'static/js/jq/jquery.ztree.exhide.min.js': ['f2'],
  'static/js/vue/vue.min.js': ['f1', 'f2'],
  'static/js/vue/vuex.min.js': ['f1', 'f2'],
  'static/js/vue/vue-router.min.js': ['f1', 'f2'],
  'static/js/vue/element.js': ['f1', 'f2'],
  'static/js/echarts/echarts.min.js': ['f2'],
  'static/js/echarts/echarts-amap.min.js': ['f2'],
  'static/js/xlsx/xlsx.full.min.js': ['f2'],
  'static/js/pako/pako.min.js': ['f2']
}

function setVendors(files, scripts) {
  for(let f in files) {
    if (files.hasOwnProperty(f)) {
      let sc = [];
      for(let s in scripts) {
        if (scripts.hasOwnProperty(s) &&
              Array.isArray(scripts[s]) &&
                  scripts[s].indexOf(f) > -1) {
          sc.push(s);
        }
      }
      vendors.push(
        new HtmlWebpackIncludeAssetsPlugin({
          files:files[f],
          assets: sc,
          append: false
        }));
    }
  }
  return vendors;
}

module.exports = process.env.NODE_ENV === 'production' ?
  setVendors(files, scripts_product) :  setVendors(files, scripts_dev) ;
