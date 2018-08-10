<template>
  <div class="right-menus">
    <transition>
      <ul
        ref="menus"
        class="right-context-menus"
        v-if="show"
        :style="{left: pos.x + 'px', top: pos.y + 'px'}"
        @contextmenu.prevent>
        <li v-for="item in menus" :key="item.key">
          <span :class="{actived: item.actived}" @click="menusClick(item)" v-text="item.desc"></span>
        </li>
      </ul>
    </transition>
  </div>
</template>
<script>
import { getLayout } from './util';

export default {
  name: 'RightMenus',

  componentName: 'RightMenus',

  props: {
    menuDispose: Function,
    show: Boolean,
    menus: Array,
    posit: Object
  },

  computed: {
    pos() {
      let {x, y} = this.posit;
      if (this.$refs.menus) {
        let rt = getLayout('menus', this.$refs);
        if (innerHeight - y < rt.height) {
          y = innerHeight - rt.height - 10;
        }
      }
      return {x: x, y: y};
    }
  },

  methods: {
    // 右键菜单点击事件
    menusClick(item) {
      this.menuDispose && this.menuDispose(item);
    }
  }
};
</script>
