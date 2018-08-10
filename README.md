# vue2demo 使用说明

安装镜像源 npm i -g mirror-config-china --registry=https://registry.npm.taobao.org

或

复制根目录下的 .npmrc 文件到你的当前用户根目录下，可以加快安装速度

## import 导入路径别名

* src 根目录src
* @assets 指向根目录 -> src/assets
* @packs 指向根目录子项目集合 -> packages
* @compo 指向根目录 -> src/components
* @transitions 指向根目录 -> src/transitions
* @directives 指向根目录 -> src/directives
* @mixins 指向根目录 -> src/mixins
* @utils 指向根目录 -> src/utils

### 注意： 只要 package.json 有更新，就需要执行 npm install 安装一下（如果安装出错请删除node_modules目录重新安装）

## 不需要引入可直接使用的（第三库）全局变量： Vue、Vuex、VueRouter

* Vue 2.x 文档参考 https://cn.vuejs.org/

* Elemnt UI 2.x 文档参考 http://element.eleme.io

* Echarts 图表文档 http://echarts.baidu.com/api.html

* superagent 数据请求API文档 http://visionmedia.github.io/superagent/

## 入口文件第三方库配置文件，配置你需要的第三库

  build/config/vendor.js

## 配置你需要编译的项目入口

  build/config/build-entrys.js

## 构建与安装

``` bash
# 安装依赖
npm install

# 运行开发环境 localhost:3824
npm run dev

# 构建时请请改 src/utils/constants.js 文件中的 preUrl 变量，否则无法运行
# 构建发布文件，警告，不要在IDE中执行构建，它会构建多个项目会把IDE卡死，请在新打开的CMD窗口中构建
npm run build

# 运行已经构建目录中打包完成将发布的文件
npm run product

# 构建发布文件及打包分析报告分析
npm run build --report

# 运行单元测试，在test/e2e/specs目录下编写测试代码
npm run unit

# 运行浏览器端到端测试，在test/unit/specs目录下编写测试代码
npm run e2e

# 运行浏览器端到端测试，生成 html 版本报告
npm run e2e:report

# 运行所有测试
npm test
```
