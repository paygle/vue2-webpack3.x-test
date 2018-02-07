const path = require('path')
const utils = require('./utils')
const config = require('../config')
const webpack = require('webpack')
const WebpackMd5Hash = require('webpack-md5-hash')
const vueLoaderConfig = require('./vue-loader.conf')
const vendors = require('../config/vendors')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var baseConfig = {
  context: path.resolve(__dirname, '../'),
  entry: {},
  output: {
    path: config.build.assetsRoot,
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[chunkhash:8].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.vue', '.js', '.json', '.ts', '.tsx'],
    alias: {
      'src': resolve('src'),
      'vue$': 'vue/dist/vue.esm.js',
      '@assets': resolve('src/assets'),
      '@compo': resolve('src/components'),
      '@pages': resolve('src/pages'),
      '@transitions': resolve('src/transitions'),
      '@directives': resolve('src/directives'),
      '@mixins': resolve('src/mixins'),
      '@utils': resolve('src/utils')
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint? [{
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: !config.dev.showEslintErrorsInOverlay
        }
      }] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          resolve('test'),
          resolve('node_modules/axios'),
          resolve('node_modules/file-saver'),
          resolve('node_modules/element-ui'),
          resolve('node_modules/async-validator'),
          resolve('node_modules/throttle-debounce'),
          resolve('node_modules/webpack-dev-server/client'),
        ],
        options: {
          presets: ['env'],
          plugins: ['transform-runtime']
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [ new WebpackMd5Hash()]
};

if  (process.env.NODE_ENV !== 'testing') {
  // 外部引入文件
  baseConfig.externals = {
    'jquery': 'jQuery',
    'vue': 'Vue',
    'vuex': 'Vuex',
    'promise': 'Promise',
    'vue-router': 'VueRouter',
    'element-ui': 'ELEMENT',
    'echarts': 'echarts',
    'promise': 'Promise',
    'xlsx': 'XLSX',
    'pako': 'pako'
  };
  baseConfig.plugins.push(new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'Vue': 'vue',
    'Vuex': 'vuex',
    'Promise': 'promise',
    'VueRouter': 'vue-router',
    'ELEMENT': 'element-ui',
    'echarts': 'echarts',
    'Promise': 'promise',
    'XLSX': 'xlsx',
    'pako': 'pako'
  }));
  baseConfig.plugins = baseConfig.plugins.concat(vendors);
}

module.exports = baseConfig;
