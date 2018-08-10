<template>
<section class="body" :style="bodyStyl" ref="sectbody">
  <header v-show="!maxsized" class="main-header">
    <a class="soft-version" href="#">
      <span class="logo-icon">
        <img class="ver-logo" :src="verlogo" alt="帮你教">
      </span>
      <span class="soft-ver-name">天马星空学校</span>
    </a>
    <ul class="main-menus" ref="menuslist">
      <li v-for="menu in menusData"
        :class="{actived: menu.actived}"
        :value="menu.value"
        @click="menuclick(menu)"
        :key="menu.value">
        <i :class="menu.icon"></i>
        <span class="primary-label" v-text="menu.label"></span>
      </li>
    </ul>
    <div class="common-use">
      <div class="services">
        <label v-show="quickEntrys.length">常用服务:</label>
        <template v-for="(item, index) in quickEntrys">
          <a :key="index" :href="item.url" v-text="item.label"></a>
        </template>
      </div>
      <span @click="addMoreSixServrs" class="more-servs el-icon-plus"></span>
      <div class="functional" ref="functional">
        <span @mouseover="topfunsMouseover('msg')" :class="{notice: msgnotice}" class="msg el-icon-bell"></span>
        <span @click="topfunsMouseover('help')" class="help el-icon-question"></span>
        <span @mouseover="topfunsMouseover('qq')" class="qq el-icon-service"></span>
        <span @mouseover="topfunsMouseover('user')" class="user el-icon-setting"></span>
      </div>
    </div>
    <div class="popover" ref="funcpopover">
      <div class="msg-bell" :class="{actived: topfuns.msg}">
        <a class="msg-item" href="#">
          <label>【业务审核】</label>
          <span class="msg">
            工资
          </span>
          <span class="time">2018-6-21 10:58</span>
        </a>
        <a class="msg-item" href="#">
          <label>【业务审核】</label>
          <span class="msg">
            工资
          </span>
          <span class="time">2018-6-21 10:58</span>
        </a>
        <span class="more">
          <a href="#">查看更多 > <i v-if="msgnotice" class="notice"></i></a>
        </span>
      </div>
      <div class="qq-serv" :class="{actived: topfuns.qq}">
        <label>QQ客服</label>
        <a href="#" class="service">
          <i class="el-icon-service"></i>QQ在线咨询
        </a>
        <p class="info">
          <span>周一至周五</span>
          <span>8:30 - 12:00</span>
          <span>14:00 - 18:30</span>
          <span>节假日周末休息</span>
        </p>
      </div>
      <div class="user-center" :class="{actived: topfuns.user}">
          <span class="uname">张三</span>
          <a class="center" href="#">个人中心</a>
          <span class="out">退出</span>
      </div>
    </div>
  </header>
  <aside v-show="!maxsized && !noLmenu" class="second-menus">
    <!-- 二级子菜单 -->
    <div class="menus-cover">
      <template v-for="menu in menusData">
        <el-menu
          v-show="menu.actived"
          :key="menu.value"
          :value="menu.value"
          :default-active="defaultActive"
          unique-opened>
          <template  v-for="item in menu.children">
            <el-menu-item
              v-if="!item.children || item.children.length < 1" :key="item.value" :index="item.value"
              @click="changeMainMenus(item)">
              <span v-text="item.label"></span>
            </el-menu-item>
            <el-submenu v-else :key="item.value" :index="item.value">
              <template slot="title"><span v-text="item.label"></span></template>
              <template v-for="cell in item.children">
                <el-menu-item
                  v-if="item.children" :key="cell.value"  :index="cell.value"
                  @click="changeMainMenus(cell)">
                  <span v-text="cell.label"></span>
                </el-menu-item>
              </template>
            </el-submenu>
          </template>
        </el-menu>
      </template>
    </div>
    <!-- 关于 -->
    <div class="menu-footer">
      <span class="rcode-img" :class="{'rcode-actived': rcodeActived}">
        <img :src="rcodeurl">
        <span class="txt">下载机构版APP</span>
      </span>
      <div ref="rcode" class="foot-wrapper">
        <a class="about" href="#">关于帮你教</a>
        <span class="rcode" @mouseenter="rcodeMouseover">
          <i class="el-icon-menu"></i>
          <span class="rcode-touch"></span>
        </span>
      </div>
    </div>
  </aside>
  <article class="main-body" :class="{maxsized: maxsized, 'no-lmenu': noLmenu }" ref="mainbody">
    <div v-if="isReload" class="main-wrapper">
      <div v-show="!maxsized" class="director">
        <template v-for="(item, index) in directorData">
          <a :class="{'el-icon-arrow-right': index !== 0}" :key="index" :href="item.url" v-text="item.label"></a>
        </template>
        <span v-show="directorData.length" class="go-back el-icon-arrow-left" @click="directGoback">返回</span>
      </div>
      <span
        class="resize-btn el-icon-zoom-in"
        :class="{btnfixed:btnfixed}"
        v-show="!noResize && showfixedbtn"
        @click="mainbodyResize"></span>
      <div v-if="!useSlot" class="main-view" ref="mainview">
        <router-view></router-view>
      </div>
      <div v-if="useSlot" class="main-view" :class="{'home-view': noLmenu}" ref="mainview"><slot></slot></div>
    </div>
    <div v-show="!maxsized" class="support-center">
      <h3 class="help-title">
        帮助中心
        <a class="help" href="#">进入></a>
      </h3>
      <div class="help-content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.
        </p>
      </div>
    </div>
  </article>
</section>
</template>
<script>
import { MAIN_MENUS, PREURL } from '@utils/constants';
import { on, off } from '@utils/dom';
import { getLocalStore, setLocalStore } from '@utils/storage';
import { setRunTimeout, insertPropsTo } from '@utils/utilstool';
import sixdialog from './sixin-dialog';
import createDialog from '@utils/create-dialog';
import { addMenusCheckProps } from './util';
import {vmConfiger} from '@utils/dynamic-data';

const sixinDialog = createDialog(sixdialog);
let checkMenusdata = addMenusCheckProps(MAIN_MENUS);
// let vheightHandler;
let resizeTimehandler;
let setTopTimehandler;
let maxsizewidth = 1400; // 宽屏与窄屏界线
let prehomeurl = PREURL && PREURL.console ? PREURL.console : '';

// 课程表编辑组件
export default {
  name: 'MainBody',
  componentName: 'MainBody',
  props: {
    useSlot: Boolean,   // 是否使用slot
    noResize: Boolean,  // 没有放大按钮
    noLmenu: Boolean    // 没有左菜单
  },
  data() {
    return {
      isReload: true,
      homeurl: prehomeurl + '#/home',    // 工作台主页面
      verlogo: '/static/img/bnj-logo.jpg',
      vermark: '/static/img/version_zy_cn.png',
      rcodeurl: '/static/img/rqcabout.png',
      defaultActive: '',
      msgnotice: true,
      topfuns: {   // 顶部功能菜单弹窗
        msg: false,
        qq: false,
        user: false
      },
      rcodeActived: false, // 菜单二维码激活
      btnfixed: false,
      showfixedbtn: true,
      maxsized: false,     // 最大化状态
      bodyStyl: {},        // body样式
      secondMenustyl: {},  // 二级菜单样式
      isShowleft: true,
      leftMenusStyl: {},
      mainContentStyl: {},
      menusData: [],
      quickEntrys: [],   // 快捷入口
      directorData: []   // 指示器数据 {label, url}
    };
  },

  watch: {
    '$route'(n) {
      this.showfixedbtn = true;
      this.btnfixed = false;
      vmConfiger('contentWidth', 0, true); // 清除值
    }
  },

  methods: {
    // 添加最多六个快捷入口
    addMoreSixServrs() {
      sixinDialog('open', {menusData: checkMenusdata, selectedMenus: this.quickEntrys});
    },
    // 顶部右侧功能菜单
    topfunsMouseover(flag) {

      setRunTimeout(setTopTimehandler, (_this, menu) => {
        // 设置top值
        let popovers = this.$refs.funcpopover.querySelectorAll('div');
        if (popovers) {
          for (let k = 0; k < popovers.length; k++) {
            if (popovers[k] && popovers[k].getBoundingClientRect) {
              popovers[k].style.top = `-${popovers[k].getBoundingClientRect().height}px`;
            }
          }
        }
      }, [this], 500);

      // help 菜单跳转
      if (flag === 'help') {

      } else { // 设置激活选项卡
        let tf = this.topfuns;
        for (let p in tf) {
          if (tf.hasOwnProperty(p)) {
            if (p === flag) {
              tf[p] = true;
            } else {
              tf[p] = false;
            }
          }
        }
      }
    },
    // 左侧菜单隐藏
    docMouseover($e) {
      if (this.$refs) {
        let nodes = ['HTML', 'BODY'];
        let rcode = this.$refs.rcode;
        let functional = this.$refs.functional;
        let funcpopover = this.$refs.funcpopover;
        // 顶部右侧弹出
        let hasfnl = functional ? functional.contains($e.target) : undefined;
        let haspop = funcpopover ? funcpopover.contains($e.target) : undefined;

        // 二维码
        let rcodeHasin = rcode ? rcode.contains($e.target) : undefined;
        let isNoNodes = nodes.indexOf($e.target.tagName) > -1;

        // 顶部右侧功能区关闭
        if (!(hasfnl || haspop) && !isNoNodes) {
          this.topfunsMouseover();
        }

        // 二维码
        if (!rcodeHasin && !isNoNodes) {
          this.rcodeActived = false;
        }
      }
    },
    // 二维码
    rcodeMouseover($e) {
      this.rcodeActived = true;
    },

    // 主菜单进入鼠标事件
    menuclick(menu) {
      if (this.noLmenu || menu.value === '0') {
        location.href = menu.url;
      } else {
        let me =  menu ? JSON.parse(JSON.stringify(menu)) : undefined;
        let index = this.menusData.indexOf(menu);
        for (let k = 0; k < this.menusData.length; k++) {
          this.menusData[k].actived = false;
        }
        if (index > -1) {
          me.actived = true;
          this.menusData.splice(index, 1, me);
        }
      }
    },

    // 缩放内容页面
    mainbodyResize() {
      let mbsw = this.$refs.mainview ? this.$refs.mainview.scrollWidth : 0;
      let mw = this.bodyStyl.width || this.$refs.sectbody.getBoundingClientRect().width;
      let mwnum = /\d+px/g.test(mw) ? String(mw).replace(/px/g, '') * 1 : mw;
      let mbsnum = 350;
      let cxtWidth = vmConfiger('contentWidth', 0) + 50;
      let inWidth = innerWidth - 20;
      this.maxsized = !this.maxsized;

      // if (this.noLmenu) mbsnum = 220;

      if (innerWidth > maxsizewidth) {
        if (this.maxsized) {
          if (mbsw + 20 >= inWidth) {
            this.bodyStyl.width = `${mwnum - mbsnum}px`;
          } else {
            this.bodyStyl.width = `${inWidth}px`;
          }
        } else {

          if (mbsw >= inWidth && cxtWidth > 100) {

            if (cxtWidth < innerWidth - mbsnum) {
              this.bodyStyl.width = 'auto';
            } else {
              this.bodyStyl.width = `${cxtWidth + 10 + mbsnum}px`;
            }

          } else if (mbsw > innerWidth) {
            this.bodyStyl.width = `${mwnum + mbsnum}px`;
          } else {
            this.bodyStyl = {};
          }
        }
      } else {
        if (mwnum < inWidth - 180) mwnum = inWidth - 180;

        if (cxtWidth < 100) mbsw = mbsw - 20;

        if (this.maxsized) {
          if (mbsw > inWidth) {
            this.bodyStyl.width = `${mwnum - 170}px`;
          } else {
            this.bodyStyl = {};
          }
        } else {

          if (mbsw >= inWidth && cxtWidth > 100) {

            if (cxtWidth >= inWidth) {
              this.bodyStyl.width = `${mwnum + 170}px`;
            } else {
              this.bodyStyl = {};
            }

          } else if (mbsw > inWidth) {
            this.bodyStyl.width = `${mwnum + 170}px`;
          } else {
            this.bodyStyl = {};
          }
        }
      }
    },
    // 主菜单点击切换事件
    changeMainMenus(item) {
      if (item) {
        this.defaultActive = item.value;
        setLocalStore('CurrentMenuValue', item.value);
        location.href = item.url;
      }
    },
    // 返回
    directGoback() {
      this.$router.go(-1);
    },

    /**
     * 自动更新 section.body 宽度
     * @param {boolean} state 是否设定样式
     */
    updateBodyStyl(state) {
      this.bodyStyl = {};
      let mbsw = this.$refs.mainview ? this.$refs.mainview.scrollWidth : 0;
      let inWidth = innerWidth;

      this.$nextTick(()=> {
        setRunTimeout(resizeTimehandler, (_this) => {
          if (state) {
            // 宽屏
            if ((!_this.maxsized && mbsw > inWidth - 350) || (_this.maxsized && mbsw > inWidth)) {

              if (!_this.maxsized && inWidth > maxsizewidth) {
                _this.bodyStyl = {width: `${mbsw + 390}px`};
              } else if (_this.maxsized && inWidth < maxsizewidth) {
                _this.bodyStyl = {width: `${mbsw}px`};
              } else if (inWidth < maxsizewidth) {
                _this.bodyStyl = {width: `${mbsw + 170}px`};
              }
            }
            // 放大操作按钮
            if (!_this.maxsized && mbsw > inWidth - 170) {
              _this.btnfixed = true;
            } else {
              _this.btnfixed = false;
            }
          } else {
            _this.bodyStyl = {};
          }
        }, [this], 300);
      });
    },
    // updateViewHeight() {
    //   const mainview = this.$refs.mainview;
    //   const mainbody = this.$refs.mainbody;

    //   if (mainview) {
    //     mainview.style.height = 'auto';
    //     addClass(mainbody, 'h-view');
    //   }

    //   setRunTimeout(vheightHandler, (_this, menu) => {
    //     if (mainview) {
    //       let viewH = mainview.getBoundingClientRect().height;
    //       let height = mainview.scrollHeight > viewH ? mainview.scrollHeight : viewH;
    //       if (height < innerHeight - 90) {
    //         mainview.style.height = `${innerHeight - 120}px`;
    //       } else {
    //         mainview.style.height = 'auto';
    //       }
    //       removeClass(mainbody, 'h-view');
    //     }
    //   }, [this], 100);
    // },
    // 缩放
    resizeHandler() {
      if (!this.noLmenu) {
        this.maxsized = false;
        this.isReload = false;
        setRunTimeout(resizeTimehandler, (_this) => {
          _this.isReload = true;
          _this.updateBodyStyl(true);
        }, [this], 300);
      }
    },
    // 滚动
    scrollHandler() {
      let resizebtn = document.body.querySelector('.main-wrapper>.resize-btn');
      if (resizebtn && pageYOffset > 100) {
        this.showfixedbtn = false;
      } else {
        this.showfixedbtn = true;
      }
    },
    keyF9maxsize($e) {
      if ($e.keyCode === 120) this.mainbodyResize();
    }
  },
  // 清理
  beforeDestroy() {
    off(window, 'resize', this.resizeHandler);
    off(document, 'mouseover', this.docMouseover);
  },

  mounted() {
    this.menusData = insertPropsTo(MAIN_MENUS, {actived: false}, this.activedMenu);
    on(document, 'mouseover', this.docMouseover);
    on(document, 'keyup', this.keyF9maxsize);
    // this.$nextTick(() => this.updateViewHeight());
  },

  created() {
    this.defaultActive = getLocalStore('CurrentMenuValue');
    on(window, 'resize', this.resizeHandler);
    on(window, 'scroll', this.scrollHandler);
    this.$on('update-bodystyle', this.updateBodyStyl);
  }
};
</script>
