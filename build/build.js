'use strict'
require('./check-versions')()
process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const spinner = ora('building for production...')
const getProdConfig = require('./webpack.prod.conf')
const packageEntrys = require('../config/build-entrys').entrys
let webpackConfig
let entryslen = packageEntrys.length;

spinner.start()

// 构建工程
function buildProject(count) {

  webpackConfig = {};
  if (count >= entryslen) return;
  webpackConfig = getProdConfig(packageEntrys[count]);
  if (!webpackConfig) return;

  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build 【' + (count + 1) + '/' + entryslen + '：' + packageEntrys[count] + '】 complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
    buildProject(count + 1);
    if (count + 1 >= entryslen) console.log(chalk.green(
      '  All total ' + entryslen + ' project building complete.\n'
    ));
  })
}
// delete dist files
rm(path.join(config.build.assetsRoot, config.build.assetsPublicPath), err => {
  if (err) throw err
  buildProject(0);
})
