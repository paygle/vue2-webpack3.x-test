<template>
<div class="wrap-table">
  <span class="total-err" v-text="errTotal"></span>
  <div class="el-form-table el-table"
    :class="[{
      'el-table--fit': fit,
      'el-table--striped': stripe,
      'el-table--border': border || isGroup,
      'el-table--hidden': isHidden,
      'el-table--group': isGroup,
      'el-table--fluid-height': maxHeight,
      'el-table--scrollable-x': layout.scrollX,
      'el-table--scrollable-y': layout.scrollY,
      'el-table--enable-row-hover': !store.states.isComplex,
      'el-table--enable-row-transition': (store.states.data || []).length !== 0 && (store.states.data || []).length < 100
    }, tableSize ? `el-table--${ tableSize }` : '']"
    @mouseleave="handleMouseLeave($event)">
    <div class="hidden-columns" ref="hiddenColumns"><slot></slot></div>
    <div
      v-if="showHeader"
      v-mousewheel="handleHeaderFooterMousewheel"
      class="el-table__header-wrapper"
      ref="headerWrapper">
      <table-header
        ref="tableHeader"
        :store="store"
        :border="border"
        :default-sort="defaultSort"
        :style="{
          width: layout.bodyWidth ? layout.bodyWidth + 'px' : ''
        }">
      </table-header>
    </div>
    <div
      class="el-table__body-wrapper"
      ref="bodyWrapper"
      :class="[layout.scrollX ? `is-scrolling-${scrollPosition}` : 'is-scrolling-none']"
      :style="[bodyHeight, ieMaxHeight]">
      <table-body
        :expand-only-one="expandOnlyOne"
        :context="context"
        :store="store"
        :stripe="stripe"
        :row-class-name="rowClassName"
        :row-style="rowStyle"
        :highlight="highlightCurrentRow"
        :style="{
           width: bodyWidth
        }">
      </table-body>
      <div
        v-if="!data || data.length === 0"
        class="el-table__empty-block"
        ref="emptyBlock"
        :style="{
          width: bodyWidth
        }">
        <span class="el-table__empty-text">
          <slot name="empty">{{ emptyText || t('el.table.emptyText') }}</slot>
        </span>
      </div>
      <div
        v-if="$slots.append"
        class="el-table__append-wrapper"
        ref="appendWrapper">
        <slot name="append"></slot>
      </div>
    </div>
    <div
      v-if="showSummary"
      v-show="data && data.length > 0"
      v-mousewheel="handleHeaderFooterMousewheel"
      class="el-table__footer-wrapper"
      ref="footerWrapper">
      <table-footer
        :store="store"
        :border="border"
        :sum-text="sumText || t('el.table.sumText')"
        :summary-method="summaryMethod"
        :default-sort="defaultSort"
        :style="{
          width: layout.bodyWidth ? layout.bodyWidth + 'px' : ''
        }">
      </table-footer>
    </div>
    <div
      v-if="fixedColumns.length > 0"
      v-mousewheel="handleFixedMousewheel"
      class="el-table__fixed"
      ref="fixedWrapper"
      :style="[{
        width: layout.fixedWidth ? layout.fixedWidth + 'px' : ''
      },
      fixedHeight]">
      <div
        v-if="showHeader"
        class="el-table__fixed-header-wrapper"
        ref="fixedHeaderWrapper" >
        <table-header
          ref="fixedTableHeader"
          fixed="left"
          :border="border"
          :store="store"
          :style="{
            width: bodyWidth
          }"></table-header>
      </div>
      <div
        class="el-table__fixed-body-wrapper"
        ref="fixedBodyWrapper"
        :style="[{
          top: layout.headerHeight + 'px'
        },
        fixedBodyHeight]">
        <table-body
          :expand-only-one="expandOnlyOne"
          fixed="left"
          :store="store"
          :stripe="stripe"
          :highlight="highlightCurrentRow"
          :row-class-name="rowClassName"
          :row-style="rowStyle"
          :style="{
            width: bodyWidth
          }">
        </table-body>
        <div
          v-if="$slots.append"
          class="el-table__append-gutter"
          :style="{
            height: layout.appendHeight + 'px'
          }"></div>
      </div>
      <div
        v-if="showSummary"
        v-show="data && data.length > 0"
        class="el-table__fixed-footer-wrapper"
        ref="fixedFooterWrapper">
        <table-footer
          fixed="left"
          :border="border"
          :sum-text="sumText || t('el.table.sumText')"
          :summary-method="summaryMethod"
          :store="store"
          :style="{
            width: bodyWidth
          }"></table-footer>
      </div>
    </div>
    <div
      v-if="rightFixedColumns.length > 0"
      v-mousewheel="handleFixedMousewheel"
      class="el-table__fixed-right"
      ref="rightFixedWrapper"
      :style="[{
        width: layout.rightFixedWidth ? layout.rightFixedWidth + 'px' : '',
        right: layout.scrollY ? (border ? layout.gutterWidth : (layout.gutterWidth || 0)) + 'px' : ''
      },
      fixedHeight]">
      <div v-if="showHeader"
        class="el-table__fixed-header-wrapper"
        ref="rightFixedHeaderWrapper">
        <table-header
          ref="rightFixedTableHeader"
          fixed="right"
          :border="border"
          :store="store"
          :style="{
            width: bodyWidth
          }"></table-header>
      </div>
      <div
        class="el-table__fixed-body-wrapper"
        ref="rightFixedBodyWrapper"
        :style="[{
          top: layout.headerHeight + 'px'
        },
        fixedBodyHeight]">
        <table-body
          :expand-only-one="expandOnlyOne"
          fixed="right"
          :store="store"
          :stripe="stripe"
          :row-class-name="rowClassName"
          :row-style="rowStyle"
          :highlight="highlightCurrentRow"
          :style="{
            width: bodyWidth
          }">
        </table-body>
      </div>
      <div
        v-if="showSummary"
        v-show="data && data.length > 0"
        class="el-table__fixed-footer-wrapper"
        ref="rightFixedFooterWrapper">
        <table-footer
          fixed="right"
          :border="border"
          :sum-text="sumText || t('el.table.sumText')"
          :summary-method="summaryMethod"
          :store="store"
          :style="{
            width: bodyWidth
          }"></table-footer>
      </div>
    </div>
    <div
      v-if="rightFixedColumns.length > 0"
      class="el-table__fixed-right-patch"
      ref="rightFixedPatch"
      :style="{
        width: layout.scrollY ? layout.gutterWidth + 'px' : '0',
        height: layout.headerHeight + 'px'
      }"></div>
    <div class="el-table__column-resize-proxy" ref="resizeProxy" v-show="resizeProxyVisible"></div>
  </div>
</div>
</template>

<script type="text/babel">
  import ElCheckbox from 'element-ui/packages/checkbox';
  import debounce from 'throttle-debounce/debounce';
  import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event';
  import Mousewheel from 'element-ui/src/directives/mousewheel';
  import Locale from 'element-ui/src/mixins/locale';
  import Migrating from 'element-ui/src/mixins/migrating';
  import TableStore from './table-store';
  import TableLayout from './table-layout';
  import TableBody from './table-body';
  import TableHeader from './table-header';
  import TableFooter from './table-footer';
  import Notification from 'element-ui/packages/notification'; // ext-> add
  import { on, off } from 'element-ui/src/utils/dom'; // ext-> add

  let tableIdSeed = 1;

  export default {
    name: 'ElFormTable',

    componentName: 'ElFormTable',

    mixins: [Locale, Migrating],

    directives: {
      Mousewheel
    },

    props: {
      data: {
        type: Array,
        default: function() {
          return [];
        }
      },

      size: String,

      width: [String, Number],

      height: [String, Number],

      maxHeight: [String, Number],

      fit: {
        type: Boolean,
        default: true
      },

      stripe: { // ext-> modify
        type: Boolean,
        default: true
      },

      border: Boolean,

      rowKey: [String, Function],

      context: {},

      showHeader: {
        type: Boolean,
        default: true
      },

      showSummary: Boolean,

      sumText: String,

      summaryMethod: Function,

      rowClassName: [String, Function],

      rowStyle: [Object, Function],

      cellClassName: [String, Function],

      cellStyle: [Object, Function],

      headerRowClassName: [String, Function],

      headerRowStyle: [Object, Function],

      headerCellClassName: [String, Function],

      headerCellStyle: [Object, Function],

      highlightCurrentRow: { // ext-> modify
        type: Boolean,
        default: true
      },

      currentRowKey: [String, Number],

      emptyText: String,

      expandRowKeys: Array,

      defaultExpandAll: Boolean,

      defaultSort: Object,

      tooltipEffect: { // ext-> modify
        type: String,
        default: 'light'
      },

      spanMethod: Function,

      selectOnIndeterminate: {
        type: Boolean,
        default: true
      },

      rules: Object, // ext-> 验证规则

      validateOnRuleChange: { // ext-> 验证
        type: Boolean,
        default: true
      },
      disableField: [String, Object], // ext-> 是否使用禁用字段

      initDisfields: Object, // ext-> 禁用字段初始化映射 如：{aa:true, bb:false}

      initDisall: Boolean, // ext-> 是否全部初始化禁用

      initValidfields: Object, // ext-> 验证字段初始化映射 如：{aa:true, bb:false}

      initValidall: Boolean, // ext-> 是否全部初始化验证

      enableInputcolor: Boolean, // ext-> 是否启用输入框内颜色样式

      startTabindex: { // ext-> tabindex开始数值
        type: Number,
        default: 1
      },

      expandOnlyOne: { // ext-> 同时仅允许打开一行数据
        type: Boolean,
        default: false
      },

      beforeExpand: Function, // ext-> 修改后的样式 (row, expandrows, isExpand)

      expandIconHidden: { // ext-> 是否隐藏展开图标
        type: Boolean,
        default: false
      },

      compareStyl: Array, // ext-> 比较字段设置样式

      modifiedStyl: Function, // ext-> 修改后的样式

      validTrigger: Function // ext-> 触发外部验证函数
    },

    provide() { // ext-> 主要为高阶插件/组件库提供用例
      return {
        elForm: this
      };
    },

    components: {
      TableHeader,
      TableFooter,
      TableBody,
      ElCheckbox
    },

    methods: {
      getMigratingConfig() {
        return {
          events: {
            expand: 'expand is renamed to expand-change'
          }
        };
      },

      setCurrentRow(row) {
        this.store.commit('setCurrentRow', row);
      },

      toggleRowSelection(row, selected) {
        this.store.toggleRowSelection(row, selected);
        this.store.updateAllSelected();
      },

      toggleRowExpansion(row, expanded) {
        this.store.toggleRowExpansion(row, expanded);
      },

      clearSelection() {
        this.store.clearSelection();
      },

      clearFilter() {
        this.store.clearFilter();
      },

      clearSort() {
        this.store.clearSort();
      },

      handleMouseLeave() {
        this.store.commit('setHoverRow', null);
        if (this.hoverState) this.hoverState = null;
      },

      updateScrollY() {
        this.layout.updateScrollY();
      },

      handleFixedMousewheel(event, data) {
        const bodyWrapper = this.bodyWrapper;
        if (Math.abs(data.spinY) > 0) {
          const currentScrollTop = bodyWrapper.scrollTop;
          if (data.pixelY < 0 && currentScrollTop !== 0) {
            event.preventDefault();
          }
          if (data.pixelY > 0 && bodyWrapper.scrollHeight - bodyWrapper.clientHeight > currentScrollTop) {
            event.preventDefault();
          }
          bodyWrapper.scrollTop += Math.ceil(data.pixelY / 5);
        } else {
          bodyWrapper.scrollLeft += Math.ceil(data.pixelX / 5);
        }
      },

      handleHeaderFooterMousewheel(event, data) {
        const { pixelX, pixelY } = data;
        if (Math.abs(pixelX) >= Math.abs(pixelY)) {
          event.preventDefault();
          this.bodyWrapper.scrollLeft += data.pixelX / 5;
        }
      },

      bindEvents() {
        const { headerWrapper, footerWrapper } = this.$refs;
        const refs = this.$refs;
        let self = this;

        this.bodyWrapper.addEventListener('scroll', function() {
          if (headerWrapper) headerWrapper.scrollLeft = this.scrollLeft;
          if (footerWrapper) footerWrapper.scrollLeft = this.scrollLeft;
          if (refs.fixedBodyWrapper) refs.fixedBodyWrapper.scrollTop = this.scrollTop;
          if (refs.rightFixedBodyWrapper) refs.rightFixedBodyWrapper.scrollTop = this.scrollTop;
          const maxScrollLeftPosition = this.scrollWidth - this.offsetWidth - 1;
          const scrollLeft = this.scrollLeft;
          if (scrollLeft >= maxScrollLeftPosition) {
            self.scrollPosition = 'right';
          } else if (scrollLeft === 0) {
            self.scrollPosition = 'left';
          } else {
            self.scrollPosition = 'middle';
          }
        });

        if (this.fit) {
          addResizeListener(this.$el, this.resizeListener);
        }
      },

      resizeListener() {
        if (!this.$ready) return;
        let shouldUpdateLayout = false;
        const el = this.$el;
        const { width: oldWidth, height: oldHeight } = this.resizeState;

        const width = el.offsetWidth;
        if (oldWidth !== width) {
          shouldUpdateLayout = true;
        }

        const height = el.offsetHeight;
        if ((this.height || this.shouldUpdateHeight) && oldHeight !== height) {
          shouldUpdateLayout = true;
        }

        if (shouldUpdateLayout) {
          this.resizeState.width = width;
          this.resizeState.height = height;
          this.doLayout();
        }
      },

      doLayout() {
        this.layout.updateColumnsWidth();
        if (this.shouldUpdateHeight) {
          this.layout.updateElsHeight();
        }
      },

      // ext-> 设置行样式
      setRowStyle(rowIndexs, styl) {

        const rows = this.$el.querySelectorAll('tbody > tr.el-table__row');
        if (rows.length < 1 || typeof styl === 'undefined') return;

        function setRowIndexStyl(index, stylObj) {
          let row = rows[index];
          if (row && typeof stylObj === 'object') {
            for (let p in stylObj) {
              if (stylObj.hasOwnProperty(p)) row.style[p] = stylObj[p];
            }
          }
        }

        if (Array.isArray(rowIndexs)) { // 格式: [1,2,4,6,8]
          for (let k = 0; k < rowIndexs.length; k++) setRowIndexStyl.call(this, rowIndexs[k], styl);
        } else if (!isNaN(rowIndexs)) { // 格式: 5
          setRowIndexStyl.call(this, rowIndexs, styl);
        } else if (typeof rowIndexs === 'string') {
          if (rowIndexs === 'all') { // 格式:  all
            for (let k = 0; k < rows.length; k++) setRowIndexStyl.call(this, k, styl);
          } else if (/^\d+\-\d+$/g.test(rowIndexs)) { // 格式: 0-12
            let span = rowIndexs.split('-');
            for (let k = parseInt(span[0], 10); k <= parseInt(span[1], 10); k++) {
              setRowIndexStyl.call(this, k, styl);
            }
          }
        }
      },

      // ext-> 数据修改比较
      modifiedCompare() {
        clearTimeout(this.timeHanlder); // 一定要使用定时器，否则严重损耗性能
        this.timeHanlder = setTimeout(() => {
          this.store.states.compareMap = {};
          this.store.commit('updateCompare');
          this.store.commit('modifiedCompare');
        }, 500);
      },
      // ext-> 比较清除
      compareClear() {
        this.store.commit('compareDel');
      },

      // ext-> 锁定初始数据用于判定是否为修改
      lockData() {
        this.store.commit('lockData');
      },

      // 验证扩展重置方法
      resetFields() {
        if (!this.tableData) {
          process.env.NODE_ENV !== 'production' &&
          console.warn('[Element Warn][Form-table]data is required for resetFields to work.');
          return;
        }
        this.fields.forEach(field => {
          field.resetField();
        });
      },
      // 验证扩展清除方法
      clearValidate() {
        this.fields.forEach(field => {
          field.clearValidate();
        });
      },
      // 验证扩展验证方法
      validate(callback, show = false) {
        if (!this.tableData) {
          console && console.warn('[Element Warn][Form-table]data is required for validate to work!');
          return;
        }

        let promise;

        // if no callback, return promise
        if (typeof callback !== 'function' && window.Promise) {
          promise = new window.Promise((resolve, reject) => {
            callback = function(valid) {
              valid ? resolve(valid) : reject(valid);
            };
          });
        }

        let valid = true;
        let count = 0;
        let errorsBox = []; // ext-> add

        // 如果需要验证的fields为空，调用验证时立刻返回callback
        if (this.fields.length === 0 && callback) {
          callback(true);
        }
        this.fields.forEach((field, index) => {
          field.validate('', errors => {
            if (errors) {
              valid = false;
              let e = errors[0], f = e['field']; // ext-> add
              errorsBox.push({msg: e['message'], f: f, v: field.value}); // ext-> add
            }
            if (typeof callback === 'function' && ++count === this.fields.length) {
              // ext-> 执行完所以的fields校验后，执行回调
              let err = '', errObj;
              for (let j = 0; j < errorsBox.length; j++) {
                errObj = errorsBox[j];
                err += `<p>值为“${errObj.v}”的输入错误：${errObj.msg}；</p>`;
              }
              if (show && (err.length > 0)) {
                Notification.error({ title: '验证错误', message: err });
              }
              callback(valid, err); // ext-> modify
            }
          });
        });

        if (promise) {
          return promise;
        }
      },
      // 验证扩展重置方法
      validateField(prop, cb) {
        let field = this.fields.filter(field => field.prop === prop)[0];
        if (!field) { throw new Error('must call validateField with valid prop string!'); }

        field.validate('', cb);
      },

      // ext-> 错误统计
      errChange() {
        this.$nextTick(function() { this.errNum = this.store.getErrCount(this.store.states); });
      },
      // ext-> 组合键处理
      keyRelease(e) {
        if (e.keyCode === 17) this.ctrlKey = false;
      },
      // ext-> 跳转到输入框
      jumpToFocus(e) {
        if (e.keyCode === 17) this.ctrlKey = true;
        if (this.ctrlKey && [37, 39].indexOf(e.keyCode) > -1) { // left-right
          this.store.updateTabindex(this.startTabindex, 'h');
          this.store.states.direction = 'h';
        } else if (this.ctrlKey && [38, 40].indexOf(e.keyCode) > -1) { // up-down
          this.store.updateTabindex(this.startTabindex);
          this.store.states.direction = 'vertical';
        }
      }
    },

    created() {
      this.tableId = 'el-table_' + tableIdSeed++;
      this.debouncedUpdateLayout = debounce(50, () => this.doLayout());

      // ext-> 验证
      this.$on('el.form.addField', (field) => { if (field) { this.fields.push(field); } });
      // ext-> 验证
      this.$on('el.form.removeField', (field) => {
        if (field.prop) { this.fields.splice(this.fields.indexOf(field), 1); }
      });
    },

    computed: {
      tableSize() {
        return this.size || (this.$ELEMENT || {}).size;
      },

      bodyWrapper() {
        return this.$refs.bodyWrapper;
      },

      shouldUpdateHeight() {
        return this.height ||
          this.maxHeight ||
          this.fixedColumns.length > 0 ||
          this.rightFixedColumns.length > 0;
      },

      selection() {
        return this.store.states.selection;
      },

      columns() {
        return this.store.states.columns;
      },

      tableData() {
        return this.store.states.data;
      },

      fixedColumns() {
        return this.store.states.fixedColumns;
      },

      rightFixedColumns() {
        return this.store.states.rightFixedColumns;
      },

      bodyWidth() {
        const { bodyWidth, scrollY, gutterWidth } = this.layout;
        return bodyWidth ? bodyWidth - (scrollY ? gutterWidth : 0) + 'px' : '';
      },

      bodyHeight() {
        if (this.height) {
          return {
            height: this.layout.bodyHeight ? this.layout.bodyHeight + 'px' : ''
          };
        } else if (this.maxHeight) {
          return {
            'max-height': (this.showHeader
              ? this.maxHeight - this.layout.headerHeight - this.layout.footerHeight
              : this.maxHeight - this.layout.footerHeight) + 'px'
          };
        }
        return {};
      },

      fixedBodyHeight() {
        if (this.height) {
          return {
            height: this.layout.fixedBodyHeight ? this.layout.fixedBodyHeight + 'px' : ''
          };
        } else if (this.maxHeight) {
          let maxHeight = this.layout.scrollX ? this.maxHeight - this.layout.gutterWidth : this.maxHeight;

          if (this.showHeader) {
            maxHeight -= this.layout.headerHeight;
          }

          maxHeight -= this.layout.footerHeight;

          return {
            'max-height': maxHeight + 'px'
          };
        }

        return {};
      },

      fixedHeight() {
        if (this.maxHeight) {
          if (this.showSummary) {
            return {
              bottom: 0
            };
          }
          return {
            bottom: (this.layout.scrollX && this.data.length) ? this.layout.gutterWidth + 'px' : ''
          };
        } else {
          if (this.showSummary) {
            return {
              height: this.layout.tableHeight ? this.layout.tableHeight + 'px' : ''
            };
          }
          return {
            height: this.layout.viewportHeight ? this.layout.viewportHeight + 'px' : ''
          };
        }
      },

      ieMaxHeight() { // ext-> 修复IE9表格引起的页面抖动
        let len = Array.isArray(this.data) ? this.data.length : 0;
        if (typeof this.height === 'undefined' && len > 0 &&
          navigator.appName === 'Microsoft Internet Explorer' &&
          navigator.appVersion .split(';')[1].replace(/\s/g, '') === 'MSIE9.0') {
          return {maxHeight: (30 * len + 80) + 'px', overflow: 'hidden'};
        }
        return {};
      }
    },

    watch: {
      height: {
        immediate: true,
        handler(value) {
          this.layout.setHeight(value);
        }
      },

      maxHeight: {
        immediate: true,
        handler(value) {
          this.layout.setMaxHeight(value);
        }
      },

      currentRowKey(newVal) {
        this.store.setCurrentRowKey(newVal);
      },

      data: {
        immediate: true,
        handler(value) {
          this.store.commit('setData', value);
          if (this.$ready) {
            this.$nextTick(() => {
              this.doLayout();
            });
          }
        }
      },

      expandRowKeys: {
        immediate: true,
        handler(newVal) {
          if (newVal) {
            this.store.setExpandRowKeys(newVal);
          }
        }
      },

      rules() { // ext-> 规则监控
        if (this.validateOnRuleChange) {
          this.validate(() => {});
        }
      },

      errNum(n) { // ext-> 错误监控
        if (this.errNum > 0) {
          this.errTotal = '验证消息：以下表单中共有 ' + this.errNum + ' 处内容错误，待完善。';
        } else {
          this.errTotal = '';
        }
      },

      'store.states.data'(n) { // ext-> 删除行后的数据验证
        this.store.states.errCount = {};
        this.$nextTick(function() {
          this.validate(()=>{});
          this.$emit('err-change');
          this.store.states.delStatus = false;
        });
      }
    },

    beforeDestroy() {
      if (this.$refs.bodyWrapper) {
        off(this.$refs.bodyWrapper, 'keydown', this.keyRelease);
        off(this.$refs.bodyWrapper, 'keyup', this.jumpToFocus);
      }
    },

    destroyed() {
      if (this.resizeListener) removeResizeListener(this.$el, this.resizeListener);
    },

    mounted() {
      this.bindEvents();
      this.store.updateColumns();
      this.doLayout();

      this.resizeState = {
        width: this.$el.offsetWidth,
        height: this.$el.offsetHeight
      };

      // init filters
      this.store.states.columns.forEach(column => {
        if (column.filteredValue && column.filteredValue.length) {
          this.store.commit('filterChange', {
            column,
            values: column.filteredValue,
            silent: true
          });
        }
      });

      this.$ready = true;
      this.$on('err-change', this.errChange); // ext-> error

      // ext-> 初始化禁用字段参数
      if (typeof this.disableField === 'string') {
        this.store.states.disableField['field'] = this.disableField;

      } else if (this.disableField !== null && typeof this.disableField === 'object') {

        for (let i in this.store.states.disableField) {
          if (this.store.states.disableField.hasOwnProperty(i) && typeof this.disableField[i] !== 'undefined') {
            this.store.states.disableField[i] = this.disableField[i];
          }
        }
      }
      // ext-> 初始化比对样式
      this.$nextTick(_ => {
        this.store.commit('updateCompare');
        on(this.$refs.bodyWrapper, 'keydown', this.jumpToFocus);
        on(this.$refs.bodyWrapper, 'keyup', this.keyRelease);
      });
    },

    data() {
      const store = new TableStore(this, {
        rowKey: this.rowKey,
        defaultExpandAll: this.defaultExpandAll,
        selectOnIndeterminate: this.selectOnIndeterminate
      });
      const layout = new TableLayout({
        store,
        table: this,
        fit: this.fit,
        showHeader: this.showHeader
      });
      return {
        layout,
        store,
        isHidden: false,
        renderExpanded: null,
        resizeProxyVisible: false,
        resizeState: {
          width: null,
          height: null
        },
        // 是否拥有多级表头
        isGroup: false,
        scrollPosition: 'left',
        fields: [], // ext-> 验证字段
        errNum: 0, // ext-> 错误数
        errTotal: '', // ext-> 错误统计
        ctrlKey: false, // ext-> 组合键
        timeHanlder: null // ext-> time
      };
    }
  };
</script>
