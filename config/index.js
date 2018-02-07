'use strict';
// Template version: 1.2.4
// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '',
    //用于跨域访问时使用代理地址
    proxyTable: {
      '/api': {
        target: 'http://192.168.20.52:8090/',//设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true ,
        pathRewrite: {
          //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替
          // 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
          '^/api': ''
        },
        onProxyReq(proxyReq, req, res) {
          //防止代理将headers字段变成小写
          proxyReq.setHeader('biz_apiId', req.headers['biz_apiid']);
          proxyReq.setHeader('biz_appKey', req.headers['biz_appkey']);
          proxyReq.setHeader('biz_appSecret', req.headers['biz_appsecret']);
          proxyReq.setHeader('rpc_group', req.headers['rpc_group']);
          proxyReq.setHeader('rpc_version', req.headers['rpc_version']);
        }
      }
    },

    // Various Dev Server settings
    host: require('../config/gethost').ip, // can be overwritten by process.env.HOST
    port: 3824, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: 'inline-source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
};
