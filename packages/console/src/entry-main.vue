<template>
  <router-view></router-view>
</template>
<script>
import { setRunTimeout, createScript } from '@utils/utilstool';
import emitter from '@mixins/emitter';
let iswork = 0;
let workhandl;
const castHome = (_t) => {
  if (iswork === 0 && _t) {
    _t.broadcast('Home', 'loaded-echart');
    setRunTimeout(workhandl, (_t)=>{ castHome(_t);}, _t, 300);
  }
};

export default {
  name: 'Console',
  componentName: 'Console',
  mixins: [emitter],
  data() {
    return {

    };
  },

  methods: {
    homework(s) {
      if (s) iswork = s;
    },
    loadEchart() {
      castHome(this);
    }
  },

  mounted() {
    // 加载echarts
    this.$nextTick(()=>{
      createScript('/static/js/echarts/echarts.common.min.js', this.loadEchart, true);
    });
  },
  created() {
    this.$on('home-work', this.homework);
  }
};
</script>
