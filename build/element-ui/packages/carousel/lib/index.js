!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("ElCarousel",[],t):"object"==typeof exports?exports.ElCarousel=t():e.ElCarousel=t()}("undefined"!=typeof self?self:this,function(){return function(e){function t(n){if(i[n])return i[n].exports;var r=i[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var i={};return t.m=e,t.c=i,t.d=function(e,i,n){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/dist/",t(t.s=3)}([function(e,t){e.exports=function(e,t,i,n,r,a){var s,o=e=e||{},l=typeof e.default;"object"!==l&&"function"!==l||(s=e,o=e.default);var c="function"==typeof o?o.options:o;t&&(c.render=t.render,c.staticRenderFns=t.staticRenderFns,c._compiled=!0),i&&(c.functional=!0),r&&(c._scopeId=r);var u;if(a?(u=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(a)},c._ssrRegister=u):n&&(u=n),u){var d=c.functional,f=d?c.render:c.beforeCreate;d?(c._injectStyles=u,c.render=function(e,t){return u.call(t),f(e,t)}):c.beforeCreate=f?[].concat(f,u):[u]}return{esModule:s,exports:o,options:c}}},function(e,t,i){"use strict";t.__esModule=!0;var n=i(6),r=function(e){return e&&e.__esModule?e:{default:e}}(n),a=i(7);t.default={name:"ElCarousel",props:{initialIndex:{type:Number,default:0},height:String,trigger:{type:String,default:"hover"},autoplay:{type:Boolean,default:!0},interval:{type:Number,default:3e3},indicatorPosition:String,indicator:{type:Boolean,default:!0},arrow:{type:String,default:"hover"},type:String},data:function(){return{items:[],activeIndex:-1,containerWidth:0,timer:null,hover:!1}},computed:{hasLabel:function(){return this.items.some(function(e){return e.label.toString().length>0})}},watch:{items:function(e){e.length>0&&this.setActiveItem(this.initialIndex)},activeIndex:function(e,t){this.resetItemPosition(t),this.$emit("change",e,t)},autoplay:function(e){e?this.startTimer():this.pauseTimer()}},methods:{handleMouseEnter:function(){this.hover=!0,this.pauseTimer()},handleMouseLeave:function(){this.hover=!1,this.startTimer()},itemInStage:function(e,t){var i=this.items.length;return t===i-1&&e.inStage&&this.items[0].active||e.inStage&&this.items[t+1]&&this.items[t+1].active?"left":!!(0===t&&e.inStage&&this.items[i-1].active||e.inStage&&this.items[t-1]&&this.items[t-1].active)&&"right"},handleButtonEnter:function(e){var t=this;this.items.forEach(function(i,n){e===t.itemInStage(i,n)&&(i.hover=!0)})},handleButtonLeave:function(){this.items.forEach(function(e){e.hover=!1})},updateItems:function(){this.items=this.$children.filter(function(e){return"ElCarouselItem"===e.$options.name})},resetItemPosition:function(e){var t=this;this.items.forEach(function(i,n){i.translateItem(n,t.activeIndex,e)})},playSlides:function(){this.activeIndex<this.items.length-1?this.activeIndex++:this.activeIndex=0},pauseTimer:function(){clearInterval(this.timer)},startTimer:function(){this.interval<=0||!this.autoplay||(this.timer=setInterval(this.playSlides,this.interval))},setActiveItem:function(e){if("string"==typeof e){var t=this.items.filter(function(t){return t.name===e});t.length>0&&(e=this.items.indexOf(t[0]))}if(e=Number(e),!isNaN(e)&&e===Math.floor(e)){var i=this.items.length,n=this.activeIndex;this.activeIndex=e<0?i-1:e>=i?0:e,n===this.activeIndex&&this.resetItemPosition(n)}},prev:function(){this.setActiveItem(this.activeIndex-1)},next:function(){this.setActiveItem(this.activeIndex+1)},handleIndicatorClick:function(e){this.activeIndex=e},handleIndicatorHover:function(e){"hover"===this.trigger&&e!==this.activeIndex&&(this.activeIndex=e)}},created:function(){var e=this;this.throttledArrowClick=(0,r.default)(300,!0,function(t){e.setActiveItem(t)}),this.throttledIndicatorHover=(0,r.default)(300,function(t){e.handleIndicatorHover(t)})},mounted:function(){var e=this;this.updateItems(),this.$nextTick(function(){(0,a.addResizeListener)(e.$el,e.resetItemPosition),e.initialIndex<e.items.length&&e.initialIndex>=0&&(e.activeIndex=e.initialIndex),e.startTimer()})},beforeDestroy:function(){this.$el&&(0,a.removeResizeListener)(this.$el,this.resetItemPosition)}}},function(e,t,i){"use strict";t.__esModule=!0;t.default={name:"ElCarouselItem",props:{name:String,label:{type:[String,Number],default:""}},data:function(){return{hover:!1,translate:0,scale:1,active:!1,ready:!1,inStage:!1,animating:!1}},methods:{processIndex:function(e,t,i){return 0===t&&e===i-1?-1:t===i-1&&0===e?i:e<t-1&&t-e>=i/2?i+1:e>t+1&&e-t>=i/2?-2:e},calculateTranslate:function(e,t,i){return this.inStage?i*(1.17*(e-t)+1)/4:e<t?-1.83*i/4:3.83*i/4},translateItem:function(e,t,i){var n=this.$parent.$el.offsetWidth,r=this.$parent.items.length;"card"!==this.$parent.type&&void 0!==i&&(this.animating=e===t||e===i),e!==t&&r>2&&(e=this.processIndex(e,t,r)),"card"===this.$parent.type?(this.inStage=Math.round(Math.abs(e-t))<=1,this.active=e===t,this.translate=this.calculateTranslate(e,t,n),this.scale=this.active?1:.83):(this.active=e===t,this.translate=n*(e-t)),this.ready=!0},handleItemClick:function(){var e=this.$parent;if(e&&"card"===e.type){var t=e.items.indexOf(this);e.setActiveItem(t)}}},created:function(){this.$parent&&this.$parent.updateItems()},destroyed:function(){this.$parent&&this.$parent.updateItems()}}},function(e,t,i){e.exports=i(4)},function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0,t.ElCarouselItem=t.ElCarousel=void 0,t.default=function(e){e.component(a.default.name,a.default),e.component(o.default.name,o.default)};var r=i(5),a=n(r),s=i(9),o=n(s);t.ElCarousel=a.default,t.ElCarouselItem=o.default},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(1),r=i.n(n);for(var a in n)"default"!==a&&function(e){i.d(t,e,function(){return n[e]})}(a);var s=i(8),o=i(0),l=o(r.a,s.a,!1,null,null,null);t.default=l.exports},function(e,t){e.exports=function(e,t,i,n){function r(){function r(){s=Number(new Date),i.apply(l,u)}function o(){a=void 0}var l=this,c=Number(new Date)-s,u=arguments;n&&!a&&r(),a&&clearTimeout(a),void 0===n&&c>e?r():!0!==t&&(a=setTimeout(n?o:r,void 0===n?e-c:e))}var a,s=0;return"boolean"!=typeof t&&(n=i,i=t,t=void 0),r}},function(e,t,i){"use strict";t.__esModule=!0;var n="undefined"==typeof window,r=function(){if(!n){var e=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||function(e){return window.setTimeout(e,20)};return function(t){return e(t)}}}(),a=function(){if(!n){var e=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.clearTimeout;return function(t){return e(t)}}}(),s=function(e){var t=e.__resizeTrigger__,i=t.firstElementChild,n=t.lastElementChild,r=i.firstElementChild;n.scrollLeft=n.scrollWidth,n.scrollTop=n.scrollHeight,r.style.width=i.offsetWidth+1+"px",r.style.height=i.offsetHeight+1+"px",i.scrollLeft=i.scrollWidth,i.scrollTop=i.scrollHeight},o=function(e){return e.offsetWidth!==e.__resizeLast__.width||e.offsetHeight!==e.__resizeLast__.height},l=function(e){var t=this;s(this),this.__resizeRAF__&&a(this.__resizeRAF__),this.__resizeRAF__=r(function(){o(t)&&(t.__resizeLast__.width=t.offsetWidth,t.__resizeLast__.height=t.offsetHeight,t.__resizeListeners__.forEach(function(i){i.call(t,e)}))})},c=n?{}:document.attachEvent,u="Webkit Moz O ms".split(" "),d="webkitAnimationStart animationstart oAnimationStart MSAnimationStart".split(" "),f=!1,h="",m="animationstart";if(!c&&!n){var v=document.createElement("fakeelement");if(void 0!==v.style.animationName&&(f=!0),!1===f)for(var _="",p=0;p<u.length;p++)if(void 0!==v.style[u[p]+"AnimationName"]){_=u[p],h="-"+_.toLowerCase()+"-",m=d[p],f=!0;break}}var g=!1,y=function(){if(!g&&!n){var e="@"+h+"keyframes resizeanim { from { opacity: 0; } to { opacity: 0; } } ",t=h+"animation: 1ms resizeanim;",i=e+"\n      .resize-triggers { "+t+' visibility: hidden; opacity: 0; }\n      .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; z-index: -1 }\n      .resize-triggers > div { background: #eee; overflow: auto; }\n      .contract-trigger:before { width: 200%; height: 200%; }',r=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css",a.styleSheet?a.styleSheet.cssText=i:a.appendChild(document.createTextNode(i)),r.appendChild(a),g=!0}};t.addResizeListener=function(e,t){if(!n)if(c)e.attachEvent("onresize",t);else{if(!e.__resizeTrigger__){"static"===getComputedStyle(e).position&&(e.style.position="relative"),y(),e.__resizeLast__={},e.__resizeListeners__=[];var i=e.__resizeTrigger__=document.createElement("div");i.className="resize-triggers",i.innerHTML='<div class="expand-trigger"><div></div></div><div class="contract-trigger"></div>',e.appendChild(i),s(e),e.addEventListener("scroll",l,!0),m&&i.addEventListener(m,function(t){"resizeanim"===t.animationName&&s(e)})}e.__resizeListeners__.push(t)}},t.removeResizeListener=function(e,t){e&&e.__resizeListeners__&&(c?e.detachEvent("onresize",t):(e.__resizeListeners__.splice(e.__resizeListeners__.indexOf(t),1),e.__resizeListeners__.length||(e.removeEventListener("scroll",l),e.__resizeTrigger__=!e.removeChild(e.__resizeTrigger__))))}},function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"el-carousel",class:{"el-carousel--card":"card"===e.type},on:{mouseenter:function(t){t.stopPropagation(),e.handleMouseEnter(t)},mouseleave:function(t){t.stopPropagation(),e.handleMouseLeave(t)}}},[i("div",{staticClass:"el-carousel__container",style:{height:e.height}},[i("transition",{attrs:{name:"carousel-arrow-left"}},["never"!==e.arrow?i("button",{directives:[{name:"show",rawName:"v-show",value:"always"===e.arrow||e.hover,expression:"arrow === 'always' || hover"}],staticClass:"el-carousel__arrow el-carousel__arrow--left",attrs:{type:"button"},on:{mouseenter:function(t){e.handleButtonEnter("left")},mouseleave:e.handleButtonLeave,click:function(t){t.stopPropagation(),e.throttledArrowClick(e.activeIndex-1)}}},[i("i",{staticClass:"el-icon-arrow-left"})]):e._e()]),e._v(" "),i("transition",{attrs:{name:"carousel-arrow-right"}},["never"!==e.arrow?i("button",{directives:[{name:"show",rawName:"v-show",value:"always"===e.arrow||e.hover,expression:"arrow === 'always' || hover"}],staticClass:"el-carousel__arrow el-carousel__arrow--right",attrs:{type:"button"},on:{mouseenter:function(t){e.handleButtonEnter("right")},mouseleave:e.handleButtonLeave,click:function(t){t.stopPropagation(),e.throttledArrowClick(e.activeIndex+1)}}},[i("i",{staticClass:"el-icon-arrow-right"})]):e._e()]),e._v(" "),e._t("default")],2),e._v(" "),"none"!==e.indicatorPosition?i("ul",{staticClass:"el-carousel__indicators",class:{"el-carousel__indicators--labels":e.hasLabel,"el-carousel__indicators--outside":"outside"===e.indicatorPosition||"card"===e.type}},e._l(e.items,function(t,n){return i("li",{staticClass:"el-carousel__indicator",class:{"is-active":n===e.activeIndex},on:{mouseenter:function(t){e.throttledIndicatorHover(n)},click:function(t){t.stopPropagation(),e.handleIndicatorClick(n)}}},[i("button",{staticClass:"el-carousel__button"},[e.hasLabel?i("span",[e._v(e._s(t.label))]):e._e()])])})):e._e()])},r=[],a={render:n,staticRenderFns:r};t.a=a},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(2),r=i.n(n);for(var a in n)"default"!==a&&function(e){i.d(t,e,function(){return n[e]})}(a);var s=i(10),o=i(0),l=o(r.a,s.a,!1,null,null,null);t.default=l.exports},function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{directives:[{name:"show",rawName:"v-show",value:e.ready,expression:"ready"}],staticClass:"el-carousel__item",class:{"is-active":e.active,"el-carousel__item--card":"card"===e.$parent.type,"is-in-stage":e.inStage,"is-hover":e.hover,"is-animating":e.animating},style:{msTransform:"translateX("+e.translate+"px) scale("+e.scale+")",webkitTransform:"translateX("+e.translate+"px) scale("+e.scale+")",transform:"translateX("+e.translate+"px) scale("+e.scale+")"},on:{click:e.handleItemClick}},["card"===e.$parent.type?i("div",{directives:[{name:"show",rawName:"v-show",value:!e.active,expression:"!active"}],staticClass:"el-carousel__mask"}):e._e(),e._v(" "),e._t("default")],2)},r=[],a={render:n,staticRenderFns:r};t.a=a}])});