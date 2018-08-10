<template>
  <transition name="el-message-fade">
    <div
      :class="[
        'bnj-pusher el-message',
        showClose ? 'is-closable' : '',
        customClass
      ]"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="startTimer">
      <div class="content" ref="content">
        <slot>
          <div class="scroll" ref="scroll" @mouseenter="stopScroll" @mouseleave="startScroll">
            <template v-if="Array.isArray(message)">
              <a class="message"
                v-for="(m, index) in message"
                :class="`msg${index}`"
                :key="index"
                :href="typeof m === 'string'? 'javascript:(0);' : m.url"
                v-text="typeof m === 'string'? m : m.msg">
              </a>
            </template>
            <a v-else class="message msg0" v-text="message"></a>
          </div>
        </slot>
      </div>
      <i v-if="showClose" class="el-message__closeBtn el-icon-close" @click="close"></i>
    </div>
  </transition>
</template>

<script>
import {addClass, removeClass} from '@utils/dom';
import {setRunTimeout} from '@utils/utilstool';
let scrollHandler;
let scrollingHandler;
let isAllowScroll = true;

function updateScroll(doms, sdom, step) {
  setRunTimeout(scrollHandler, ()=>{
    let dompos = [];
    let swidth;
    let pos;
    let poslf;

    function scroll() {
      if (isAllowScroll) {
        for (let i = 0; i < dompos.length; i++) {
          poslf =  dompos[i].left;
          poslf -= 1;
          dompos[i].dom.style.transform = `translateX(${poslf}px)`;
          dompos[i].left = poslf;
          if (dompos[i].width + poslf < 0) {
            dompos[i].left = swidth + 20;
            dompos[i].dom.style.transform = `translateX(${poslf}px)`;
          }
        }
      }
      scrollHandler = setTimeout(()=> scroll(), step);
    }

    if (doms.length && sdom) {
      swidth = sdom.getBoundingClientRect().width;
      for (let k = 0; k < doms.length; k++) {
        pos = doms[k].getBoundingClientRect();
        doms[k].style.transform = `translateX(${pos.left}px)`;
        dompos[k] = {dom: doms[k], width: pos.width, left: pos.left};
      }
      addClass(sdom, 'begin');
      requestAnimationFrame(scroll);
    }
  }, 500);
}

export default {
  name: 'BnjPusher',
  data() {
    return {
      visible: false,
      message: '',      // 格式： {msg, url}
      duration: 0,
      moveTime: 100,    // 移动速度时间
      customClass: '',
      onClose: null,
      showClose: true,
      closed: false,
      timer: null
    };
  },

  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
        this.$el.addEventListener('transitionend', this.destroyElement);
      }
    },
    message: {
      immediate: true,
      handler(n) {
        this.$nextTick(()=>{
          if (this.$refs.content) {
            clearTimeout(scrollHandler);
            clearTimeout(scrollingHandler);
            removeClass(this.$refs.scroll, 'begin');
            updateScroll(this.$refs.content.querySelectorAll('.message'), this.$refs.scroll, this.moveTime);
          }
        });
      }
    }
  },

  methods: {
    stopScroll() {
      isAllowScroll = false;
    },

    startScroll() {
      isAllowScroll = true;
    },

    destroyElement() {
      this.$el.removeEventListener('transitionend', this.destroyElement);
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
      clearTimeout(scrollHandler);
      clearTimeout(scrollingHandler);
    },

    close() {
      this.closed = true;
      if (typeof this.onClose === 'function') {
        this.onClose(this);
      }
    },

    clearTimer() {
      clearTimeout(this.timer);
    },

    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    }
  },
  mounted() {
    this.startTimer();
  }
};
</script>
