<template>
  <div class="bnj-tabs">
    <div v-if="!withoutHeader" v-show="isNoPrintShow" class="tabs-header" ref="tabhead">
      <div class="actived-bar" :style="barstyl"></div>
      <template v-for="item in tabrouters" >
        <div
          class="tab-label"
          :id="'bnj-tab'+item.val"
          :key="item.val"
          :class="{actived: item.actived}"
          @click="tabclick(item)"
          v-text="item.label">
        </div>
      </template>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { PREURL } from '@utils/constants';
let isTabClicked = false;
// {val: 1, label: '个别课排课', hide: false, url: '#/ac/student'},
const getEnabledRoutes = (r) => {
  let rx = JSON.parse(JSON.stringify(r));
  let nroutes = [];
  if (Array.isArray(rx)) {
    for (let k = 0; k < rx.length; k++) {
      if (!rx[k]['hide']) {
        if (nroutes.length === 0) {
          rx[k]['actived'] = true;
          nroutes.push(rx[k]);
        } else {
          rx[k]['actived'] = false;
          nroutes.push(rx[k]);
        }
      }
    }
  }
  return nroutes;
};

export default {
  name: 'BnjTabs',
  componentName: 'BnjTabs',
  props: {
    withoutHeader: Boolean,   // 头部显示
    routes: Array,   // 路由数据
    urlpre: String   // 路由前缀
  },
  data() {
    return {
      isNoPrintShow: true,
      tabrouters: [],      // 有效路由
      barstyl: {}
    };
  },

  watch: {
    routes: {
      immediate: true,
      handler(n) {
        if (!this.withoutHeader) this.tabrouters = getEnabledRoutes(n);
      }
    },
    tabrouters() {
      this.checkActived();
    },
    $route(n) {
      if (!isTabClicked) {
        this.checkActived();
      } else {
        isTabClicked = false;
      }
    }
  },

  methods: {
    checkActived() {
      if (!this.withoutHeader) {
        this.$nextTick(()=>{
          let curl = location.href;
          let tbroute = this.tabrouters;
          let tabhead = this.$refs.tabhead;
          if (tbroute && tabhead) {
            for (let i = 0; i < tbroute.length; i++) {
              if (new RegExp(`${tbroute[i].url}`, 'ig').test(curl)) {
                this.updateBar(tabhead.querySelector(`#bnj-tab${tbroute[i].val}`));
                break;
              } else if (tbroute[i].actived) {
                this.updateBar(tabhead.querySelector(`#bnj-tab${tbroute[i].val}`));
              }
            }
          }
        });
      }
    },
    updateBar(target) {
      let tabhead = this.$refs.tabhead;
      if (tabhead && target) {
        let thb = tabhead.getBoundingClientRect();
        let tgb = target.getBoundingClientRect();
        let left = tgb.left - thb.left;
        this.barstyl = {width: `${tgb.width}px`, transform: `translateX(${left}px)` };
      }
    },
    tabclick(item) {
      isTabClicked = true;
      let preurl = PREURL[this.urlpre] ? PREURL[this.urlpre] : '';
      let tbroute = this.tabrouters;
      for (let i = 0; i < tbroute.length; i++) {
        if (item.val === tbroute[i].val) {
          item.actived = true;
          tbroute.splice(i, 1, item);
          location.href = preurl + item.url;
        } else {
          tbroute[i].actived = false;
        }
      }
    }
  },
  mounted() {
    this.checkActived();
  }
};
</script>
