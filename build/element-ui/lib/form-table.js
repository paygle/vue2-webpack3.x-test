module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 480);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/mixins/emitter");

/***/ }),

/***/ 10:
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/utils/clickoutside");

/***/ }),

/***/ 11:
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/checkbox");

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

module.exports = require("throttle-debounce/debounce");

/***/ }),

/***/ 14:
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/utils/popup");

/***/ }),

/***/ 141:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _checkbox = __webpack_require__(11);

var _checkbox2 = _interopRequireDefault(_checkbox);

var _debounce = __webpack_require__(12);

var _debounce2 = _interopRequireDefault(_debounce);

var _resizeEvent = __webpack_require__(16);

var _mousewheel = __webpack_require__(41);

var _mousewheel2 = _interopRequireDefault(_mousewheel);

var _locale = __webpack_require__(5);

var _locale2 = _interopRequireDefault(_locale);

var _migrating = __webpack_require__(8);

var _migrating2 = _interopRequireDefault(_migrating);

var _tableStore = __webpack_require__(483);

var _tableStore2 = _interopRequireDefault(_tableStore);

var _tableLayout = __webpack_require__(484);

var _tableLayout2 = _interopRequireDefault(_tableLayout);

var _tableBody = __webpack_require__(485);

var _tableBody2 = _interopRequireDefault(_tableBody);

var _tableHeader = __webpack_require__(488);

var _tableHeader2 = _interopRequireDefault(_tableHeader);

var _tableFooter = __webpack_require__(492);

var _tableFooter2 = _interopRequireDefault(_tableFooter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tableIdSeed = 1; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'ElFormTable',

  componentName: 'ElFormTable',

  mixins: [_locale2.default, _migrating2.default],

  directives: {
    Mousewheel: _mousewheel2.default
  },

  props: {
    data: {
      type: Array,
      default: function _default() {
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

    stripe: { // 扩展修改-> 默认条纹
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

    highlightCurrentRow: { // 扩展修改-> 设置默认点击单行时选定显示
      type: Boolean,
      default: true
    },

    currentRowKey: [String, Number],

    emptyText: String,

    expandRowKeys: Array,

    defaultExpandAll: Boolean,

    defaultSort: Object,

    tooltipEffect: { // 扩展修改-> 设置提示样式
      type: String,
      default: 'light'
    },

    spanMethod: Function,

    rules: Object, // 扩展-> 验证规则

    validateOnRuleChange: { // 扩展验证
      type: Boolean,
      default: true
    },
    disableField: [String, Object], // 扩展-> 是否使用禁用字段

    initDisfields: Object, // 扩展-> 禁用字段初始化映射 如：{aa:true, bb:false}

    initDisall: Boolean, // 扩展-> 是否全部初始化禁用

    initValidfields: Object, // 扩展-> 验证字段初始化映射 如：{aa:true, bb:false}

    initValidall: Boolean, // 扩展-> 是否全部初始化验证

    enableInputcolor: Boolean, // 扩展-> 是否启用输入框内颜色样式

    startTabindex: { // 扩展-> tabindex开始数值
      type: Number,
      default: 1
    },

    expandOnlyOne: { // 扩展-> 同时仅允许打开一行数据
      type: Boolean,
      default: false
    },

    expandIconHidden: { // 扩展-> 是否隐藏展开图标
      type: Boolean,
      default: false
    },

    compareStyl: Array, // 扩展-> 比较字段设置样式

    modifiedStyl: Function, // 扩展-> 修改后的样式

    validTrigger: Function // 扩展-> 触发外部验证函数
  },

  provide: function provide() {
    // 扩展验证 -> 主要为高阶插件/组件库提供用例
    return {
      elForm: this
    };
  },


  components: {
    TableHeader: _tableHeader2.default,
    TableFooter: _tableFooter2.default,
    TableBody: _tableBody2.default,
    ElCheckbox: _checkbox2.default
  },

  methods: {
    getMigratingConfig: function getMigratingConfig() {
      return {
        events: {
          expand: 'expand is renamed to expand-change'
        }
      };
    },
    setCurrentRow: function setCurrentRow(row) {
      this.store.commit('setCurrentRow', row);
    },
    toggleRowSelection: function toggleRowSelection(row, selected) {
      this.store.toggleRowSelection(row, selected);
      this.store.updateAllSelected();
    },
    toggleRowExpansion: function toggleRowExpansion(row, expanded) {
      this.store.toggleRowExpansion(row, expanded);
    },
    clearSelection: function clearSelection() {
      this.store.clearSelection();
    },
    clearFilter: function clearFilter() {
      this.store.clearFilter();
    },
    clearSort: function clearSort() {
      this.store.clearSort();
    },
    handleMouseLeave: function handleMouseLeave() {
      this.store.commit('setHoverRow', null);
      if (this.hoverState) this.hoverState = null;
    },
    updateScrollY: function updateScrollY() {
      this.layout.updateScrollY();
    },
    handleFixedMousewheel: function handleFixedMousewheel(event, data) {
      var bodyWrapper = this.bodyWrapper;
      if (Math.abs(data.spinY) > 0) {
        var currentScrollTop = bodyWrapper.scrollTop;
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
    handleHeaderFooterMousewheel: function handleHeaderFooterMousewheel(event, data) {
      var pixelX = data.pixelX,
          pixelY = data.pixelY;

      if (Math.abs(pixelX) >= Math.abs(pixelY)) {
        event.preventDefault();
        this.bodyWrapper.scrollLeft += data.pixelX / 5;
      }
    },
    bindEvents: function bindEvents() {
      var _$refs = this.$refs,
          headerWrapper = _$refs.headerWrapper,
          footerWrapper = _$refs.footerWrapper;

      var refs = this.$refs;
      var self = this;

      this.bodyWrapper.addEventListener('scroll', function () {
        if (headerWrapper) headerWrapper.scrollLeft = this.scrollLeft;
        if (footerWrapper) footerWrapper.scrollLeft = this.scrollLeft;
        if (refs.fixedBodyWrapper) refs.fixedBodyWrapper.scrollTop = this.scrollTop;
        if (refs.rightFixedBodyWrapper) refs.rightFixedBodyWrapper.scrollTop = this.scrollTop;
        var maxScrollLeftPosition = this.scrollWidth - this.offsetWidth - 1;
        var scrollLeft = this.scrollLeft;
        if (scrollLeft >= maxScrollLeftPosition) {
          self.scrollPosition = 'right';
        } else if (scrollLeft === 0) {
          self.scrollPosition = 'left';
        } else {
          self.scrollPosition = 'middle';
        }
      });

      if (this.fit) {
        (0, _resizeEvent.addResizeListener)(this.$el, this.resizeListener);
      }
    },
    resizeListener: function resizeListener() {
      if (!this.$ready) return;
      var shouldUpdateLayout = false;
      var el = this.$el;
      var _resizeState = this.resizeState,
          oldWidth = _resizeState.width,
          oldHeight = _resizeState.height;


      var width = el.offsetWidth;
      if (oldWidth !== width) {
        shouldUpdateLayout = true;
      }

      var height = el.offsetHeight;
      if ((this.height || this.shouldUpdateHeight) && oldHeight !== height) {
        shouldUpdateLayout = true;
      }

      if (shouldUpdateLayout) {
        this.resizeState.width = width;
        this.resizeState.height = height;
        this.doLayout();
      }
    },
    doLayout: function doLayout() {
      if (this.shouldUpdateHeight) {
        this.layout.updateElsHeight();
      }
      this.layout.updateColumnsWidth();
    },


    // 验证扩展重置方法
    resetFields: function resetFields() {
      if (!this.tableData) {
        "production" !== 'production' && console.warn('[Element Warn][Form-table]data is required for resetFields to work.');
        return;
      }
      this.fields.forEach(function (field) {
        field.resetField();
      });
    },

    // 验证扩展清除方法
    clearValidate: function clearValidate() {
      this.fields.forEach(function (field) {
        field.clearValidate();
      });
    },

    // 验证扩展验证方法
    validate: function validate(callback) {
      var _this = this;

      if (!this.tableData) {
        console && console.warn('[Element Warn][Form-table]data is required for validate to work!');
        return;
      }

      var promise = void 0;
      // if no callback, return promise
      if (typeof callback !== 'function' && window.Promise) {
        promise = new window.Promise(function (resolve, reject) {
          callback = function callback(valid) {
            valid ? resolve(valid) : reject(valid);
          };
        });
      }

      var valid = true;
      var count = 0;
      // 如果需要验证的fields为空，调用验证时立刻返回callback
      if (this.fields.length === 0 && callback) {
        callback(true);
      }
      this.fields.forEach(function (field, index) {
        field.validate('', function (errors) {
          if (errors) {
            valid = false;
          }
          if (typeof callback === 'function' && ++count === _this.fields.length) {
            callback(valid);
          }
        });
      });

      if (promise) {
        return promise;
      }
    },

    // 验证扩展重置方法
    validateField: function validateField(prop, cb) {
      var field = this.fields.filter(function (field) {
        return field.prop === prop;
      })[0];
      if (!field) {
        throw new Error('must call validateField with valid prop string!');
      }

      field.validate('', cb);
    },


    // 扩展-> 错误统计
    errChange: function errChange() {
      this.$nextTick(function () {
        this.errNum = this.store.getErrCount(this.store.states);
      });
    }
  },

  created: function created() {
    var _this2 = this;

    this.tableId = 'el-table_' + tableIdSeed++;
    this.debouncedUpdateLayout = (0, _debounce2.default)(50, function () {
      return _this2.doLayout();
    });

    // 扩展验证
    this.$on('el.form.addField', function (field) {
      if (field) {
        _this2.fields.push(field);
      }
    });
    // 扩展验证
    this.$on('el.form.removeField', function (field) {
      if (field.prop) {
        _this2.fields.splice(_this2.fields.indexOf(field), 1);
      }
    });
  },


  computed: {
    tableSize: function tableSize() {
      return this.size || (this.$ELEMENT || {}).size;
    },
    bodyWrapper: function bodyWrapper() {
      return this.$refs.bodyWrapper;
    },
    shouldUpdateHeight: function shouldUpdateHeight() {
      return this.height || this.fixedColumns.length > 0 || this.rightFixedColumns.length > 0;
    },
    selection: function selection() {
      return this.store.states.selection;
    },
    columns: function columns() {
      return this.store.states.columns;
    },
    tableData: function tableData() {
      return this.store.states.data;
    },
    fixedColumns: function fixedColumns() {
      return this.store.states.fixedColumns;
    },
    rightFixedColumns: function rightFixedColumns() {
      return this.store.states.rightFixedColumns;
    },
    bodyWidth: function bodyWidth() {
      var _layout = this.layout,
          bodyWidth = _layout.bodyWidth,
          scrollY = _layout.scrollY,
          gutterWidth = _layout.gutterWidth;

      return bodyWidth ? bodyWidth - (scrollY ? gutterWidth : 0) + 'px' : '';
    },
    bodyHeight: function bodyHeight() {
      if (this.height) {
        return {
          height: this.layout.bodyHeight ? this.layout.bodyHeight + 'px' : ''
        };
      } else if (this.maxHeight) {
        return {
          'max-height': (this.showHeader ? this.maxHeight - this.layout.headerHeight - this.layout.footerHeight : this.maxHeight - this.layout.footerHeight) + 'px'
        };
      }
      return {};
    },
    fixedBodyHeight: function fixedBodyHeight() {
      if (this.height) {
        return {
          height: this.layout.fixedBodyHeight ? this.layout.fixedBodyHeight + 'px' : ''
        };
      } else if (this.maxHeight) {
        var maxHeight = this.layout.scrollX ? this.maxHeight - this.layout.gutterWidth : this.maxHeight;

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
    fixedHeight: function fixedHeight() {
      if (this.maxHeight) {
        if (this.showSummary) {
          return {
            bottom: 0
          };
        }
        return {
          bottom: this.layout.scrollX && this.data.length ? this.layout.gutterWidth + 'px' : ''
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
    }
  },

  watch: {
    height: {
      immediate: true,
      handler: function handler(value) {
        this.layout.setHeight(value);
      }
    },

    maxHeight: {
      immediate: true,
      handler: function handler(value) {
        this.layout.setMaxHeight(value);
      }
    },

    currentRowKey: function currentRowKey(newVal) {
      this.store.setCurrentRowKey(newVal);
    },


    data: {
      immediate: true,
      handler: function handler(value) {
        var _this3 = this;

        this.store.commit('setData', value);
        if (this.$ready) {
          this.$nextTick(function () {
            _this3.doLayout();
          });
        }
      }
    },

    expandRowKeys: {
      immediate: true,
      handler: function handler(newVal) {
        if (newVal) {
          this.store.setExpandRowKeys(newVal);
        }
      }
    },

    rules: function rules() {
      // 扩展-> 规则监控
      if (this.validateOnRuleChange) {
        this.validate(function () {});
      }
    },
    errNum: function errNum(n) {
      // 扩展-> 错误监控
      if (this.errNum > 0) {
        this.errTotal = '验证消息：以下表单中共有 ' + this.errNum + ' 处内容错误，待完善。';
      } else {
        this.errTotal = '';
      }
    },
    'store.states.data': function storeStatesData(n) {
      // 扩展-> 删除行后的数据验证
      this.store.states.errCount = {};
      this.$nextTick(function () {
        this.validate(function () {});
        this.$emit('err-change');
        this.store.states.delStatus = false;
      });
    }
  },

  destroyed: function destroyed() {
    if (this.resizeListener) (0, _resizeEvent.removeResizeListener)(this.$el, this.resizeListener);
  },
  mounted: function mounted() {
    var _this4 = this;

    this.bindEvents();
    this.store.updateColumns();
    this.doLayout();

    this.resizeState = {
      width: this.$el.offsetWidth,
      height: this.$el.offsetHeight
    };

    // init filters
    this.store.states.columns.forEach(function (column) {
      if (column.filteredValue && column.filteredValue.length) {
        _this4.store.commit('filterChange', {
          column: column,
          values: column.filteredValue,
          silent: true
        });
      }
    });

    this.$ready = true;

    this.$on('err-change', this.errChange); // 扩展
  },
  data: function data() {
    var store = new _tableStore2.default(this, {
      rowKey: this.rowKey,
      defaultExpandAll: this.defaultExpandAll
    });
    var layout = new _tableLayout2.default({
      store: store,
      table: this,
      fit: this.fit,
      showHeader: this.showHeader
    });
    return {
      layout: layout,
      store: store,
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
      fields: [], // 扩展 -> 验证字段
      errNum: 0, // 扩展 -> 错误数
      errTotal: '', // 扩展 -> 错误统计
      ctrlKey: false, // 扩展
      timeHanlder: null // 扩展
    };
  }
};

/***/ }),

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getRowIdentity = exports.getColumnByCell = exports.getColumnById = exports.orderBy = exports.getCell = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _util = __webpack_require__(3);

var getCell = exports.getCell = function getCell(event) {
  var cell = event.target;

  while (cell && cell.tagName.toUpperCase() !== 'HTML') {
    if (cell.tagName.toUpperCase() === 'TD') {
      return cell;
    }
    cell = cell.parentNode;
  }

  return null;
};

var isObject = function isObject(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
};

var orderBy = exports.orderBy = function orderBy(array, sortKey, reverse, sortMethod, sortBy) {
  if (!sortKey && !sortMethod && (!sortBy || Array.isArray(sortBy) && !sortBy.length)) {
    return array;
  }
  if (typeof reverse === 'string') {
    reverse = reverse === 'descending' ? -1 : 1;
  } else {
    reverse = reverse && reverse < 0 ? -1 : 1;
  }
  var getKey = sortMethod ? null : function (value, index) {
    if (sortBy) {
      if (!Array.isArray(sortBy)) {
        sortBy = [sortBy];
      }
      return sortBy.map(function (by) {
        if (typeof by === 'string') {
          return (0, _util.getValueByPath)(value, by);
        } else {
          return by(value, index, array);
        }
      });
    }
    if (sortKey !== '$key') {
      if (isObject(value) && '$value' in value) value = value.$value;
    }
    return [isObject(value) ? (0, _util.getValueByPath)(value, sortKey) : value];
  };
  var compare = function compare(a, b) {
    if (sortMethod) {
      return sortMethod(a.value, b.value);
    }
    for (var i = 0, len = a.key.length; i < len; i++) {
      if (a.key[i] < b.key[i]) {
        return -1;
      }
      if (a.key[i] > b.key[i]) {
        return 1;
      }
    }
    return 0;
  };
  return array.map(function (value, index) {
    return {
      value: value,
      index: index,
      key: getKey ? getKey(value, index) : null
    };
  }).sort(function (a, b) {
    var order = compare(a, b);
    if (!order) {
      // make stable https://en.wikipedia.org/wiki/Sorting_algorithm#Stability
      order = a.index - b.index;
    }
    return order * reverse;
  }).map(function (item) {
    return item.value;
  });
};

var getColumnById = exports.getColumnById = function getColumnById(table, columnId) {
  var column = null;
  table.columns.forEach(function (item) {
    if (item.id === columnId) {
      column = item;
    }
  });
  return column;
};

var getColumnByCell = exports.getColumnByCell = function getColumnByCell(table, cell) {
  var matches = (cell.className || '').match(/el-table_[^\s]+/gm);
  if (matches) {
    return getColumnById(table, matches[0]);
  }
  return null;
};

var getRowIdentity = exports.getRowIdentity = function getRowIdentity(row, rowKey) {
  if (!row) throw new Error('row is required when get row identity');
  if (typeof rowKey === 'string') {
    if (rowKey.indexOf('.') < 0) {
      return row[rowKey];
    }
    var key = rowKey.split('.');
    var current = row;
    for (var i = 0; i < key.length; i++) {
      current = current[key[i]];
    }
    return current;
  } else if (typeof rowKey === 'function') {
    return rowKey.call(null, row);
  }
};

/***/ }),

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _asyncValidator = __webpack_require__(46);

var _asyncValidator2 = _interopRequireDefault(_asyncValidator);

var _emitter = __webpack_require__(1);

var _emitter2 = _interopRequireDefault(_emitter);

var _dom = __webpack_require__(2);

var _util = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  // name: 'ElTableItem',

  componentName: 'ElFormItem',

  mixins: [_emitter2.default],

  provide: function provide() {
    return {
      elFormItem: this
    };
  },


  inject: ['elForm'],

  props: {
    value: {},
    prop: Object, // 包含 { $index, row, column, store, _self }
    property: String,
    required: {
      type: Boolean,
      default: undefined
    },
    ruler: Object, // 表格表单规则集
    disabledTips: Boolean, // 禁用表单弹窗提示
    size: String
  },

  computed: {
    rules: function rules() {
      return this.ruler ? this.ruler[this.prop.column.property] : undefined; // 获取当前属性的校验规则
    },
    isRequired: function isRequired() {
      var rules = this.rules;
      var isRequired = false;

      if (rules && rules.length) {
        rules.every(function (rule) {
          if (rule.required) {
            isRequired = true;
            return false;
          }
          return true;
        });
      }
      return isRequired;
    },
    _formSize: function _formSize() {
      return this.elForm.size;
    },
    elFormItemSize: function elFormItemSize() {
      return this.size || this._formSize;
    },
    sizeClass: function sizeClass() {
      return (this.$ELEMENT || {}).size || this.elFormItemSize;
    }
  },
  data: function data() {
    return {
      validateState: '',
      validateMessage: '',
      validateDisabled: false,
      validator: {},
      IS_SHOW_TIPS: false, // 默认禁用 tooltip功能
      TIP_POP_WIDTH: 0,
      tipContent: '', // tooltip内容
      tipTimeHander: null,
      tipsDom: null
    };
  },

  methods: {
    // 扩展-> 获取类型数值
    getTypeOfVal: function getTypeOfVal(value, rules) {

      var typevalue = '',
          type = void 0,
          cdate = void 0;

      if ((0, _util.typeOf)(rules) === 'Array') {
        for (var i = 0; i < rules.length; i++) {
          type = rules[i].type ? rules[i].type : 'string';
          if ((0, _util.typeOf)(rules[i]) === 'Object' && rules[i]['type'] === 'date' && (0, _util.typeOf)(value) === 'String') {
            cdate = new Date((0, _util.compatDateStr)(value));
          }
        }
      } else if ((0, _util.typeOf)(rules) === 'Object' && rules.type === 'date' && (0, _util.typeOf)(value) === 'String') {
        type = rules.type ? rules.type : 'string';
        cdate = new Date((0, _util.compatDateStr)(value));
      }

      if ((0, _util.typeOf)(value) === 'Date') {
        typevalue = value;
      } else if ((0, _util.typeOf)(cdate) === 'Date' && !isNaN(cdate.getTime())) {
        typevalue = cdate;
      } else {
        typevalue = value;
      }

      // 类型分配
      switch (type) {

        case 'string':
        case 'email':
        case 'url':
          typevalue = String(value);
          break;

        case 'number':
        case 'integer':
          typevalue = isNaN(value) ? value : Number(value);
          break;

        case 'float':
          typevalue = isNaN(value) ? value : parseFloat(value);
          break;

        case 'boolean':
          typevalue = Boolean(value);
          break;
      }

      return typevalue;
    },
    validate: function validate(trigger) {
      var _this = this;

      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _util.noop;


      this.validateDisabled = false;
      // const regxNumber = /^\d*\.?\d*$/g;
      var _prop = this.prop,
          $index = _prop.$index,
          row = _prop.row,
          column = _prop.column,
          store = _prop.store;

      // 验证样式设置

      this.$nextTick(function () {
        var rowIdx = void 0,
            store = _this.prop.store;
        // 触发外部校验
        if (typeof store.table.validTrigger === 'function') {
          rowIdx = _this.property.replace('row', '').replace(/[a-z]+[a-z0-9]*$/ig, '');
          store.table.validTrigger.call(null, store.states.data[rowIdx], _this.property.replace('row' + rowIdx, ''));
        }
      });

      if (this.rules) {
        // 存在规则才进行校验
        this.validateState = 'validating';
        var descriptor = {},
            model = {};
        descriptor[column.property] = this.rules;
        var validator = new _asyncValidator2.default(descriptor);

        model[column.property] = this.getTypeOfVal(this.value, this.rules);
        validator.validate(model, { firstFields: true, row: row }, function (errors, fields) {
          _this.validateState = !errors ? 'success' : 'error';
          _this.validateMessage = errors ? errors[0].message : '';
          callback(errors);
        });
      }

      if (column.property) {
        if (this.validateState !== 'error') {
          store.commit('disErrCount', 'row' + ($index + column.property));
        } else {
          store.commit('setErrCount', 'row' + ($index + column.property));
          this.tipContent = this.validateMessage; // 设置错误信息
        }
      }
      this.dispatch('ElFormTable', 'err-change');
    },
    clearValidate: function clearValidate() {
      this.validateState = '';
      this.validateMessage = '';
      this.validateDisabled = false;
    },
    resetField: function resetField() {
      var _prop2 = this.prop,
          row = _prop2.row,
          column = _prop2.column;

      this.validateState = '';
      this.validateMessage = '';

      if (Array.isArray(this.value)) {
        this.validateDisabled = true;
        row[column.property] = [].concat(this.initialValue);
      } else {
        this.validateDisabled = true;
        row[column.property] = this.initialValue;
      }
    },
    onFieldBlur: function onFieldBlur() {
      this.validate('blur');
    },
    onFieldChange: function onFieldChange() {
      if (this.validateDisabled) {
        this.validateDisabled = false;
        return;
      }

      this.validate('change');
    },

    // ext-> 鼠标over时事件
    inputMouseover: function inputMouseover(e) {
      var _this2 = this;

      if (this.disabledTips) return; // 禁用表单溢出和验证弹窗提示
      var pos = void 0,
          gapw = void 0,
          style = void 0,
          color = '',
          that = this;
      var inputEl = this.$el.querySelector('input') || this.$el.querySelector('textarea');;
      var inputWP = this.getPlaceWidth(inputEl);
      this.TIP_POP_WIDTH = this.getTipContentWidth(inputEl, this.tipContent);

      if (this.IS_SHOW_TIPS || this.validateState === 'error') {
        this.tipTimeHander = setTimeout(function () {
          pos = inputEl.getBoundingClientRect();
          gapw = that.TIP_POP_WIDTH > 0 ? (that.TIP_POP_WIDTH - inputWP.w - inputWP.pl) / 2 : 0;
          if (_this2.validateState === 'error') color = 'red';
          style = 'color:' + color + '; left:' + (pos.left - gapw) + 'px; top: ' + (pos.top - 38) + 'px; z-index: 99; position: fixed';

          if (/[\w\W]{3,}/ig.test(that.tipContent)) {
            that.tipsDom = (0, _dom.createDomElement)('div', { class: 'form-message-tips', style: style });
            that.tipsDom.innerHTML = that.tipContent;
            document.body.appendChild(that.tipsDom);
          }
        }, 300);
      }
    },

    // ext-> 鼠标out时事件
    inputMouseout: function inputMouseout(e) {
      if (this.disabledTips) return; // 禁用表单溢出和验证弹窗提示
      clearTimeout(this.tipTimeHander);
      var delDoms = document.querySelectorAll('.form-message-tips');
      if (delDoms.length && this.tipsDom) {
        for (var i = 0; i < delDoms.length; i++) {
          document.body.removeChild(delDoms[i]);
        }
        this.tipsDom = null;
      }
    },

    // ext-> 设置超出边界提示内容
    setTipContent: function setTipContent(value) {
      if (this.validateState !== 'error') {
        this.tipContent = value ? String(value) : '';
        this.IS_SHOW_TIPS = this.getTipStatus(this.$el.querySelector('input'));
      }
    },

    // 计算组件除padding的宽度
    getPlaceWidth: function getPlaceWidth(el) {
      var elStyl = void 0,
          paddingLeft = void 0,
          paddingRight = void 0;
      if (el) {
        elStyl = getComputedStyle(el);
        paddingLeft = parseInt(elStyl.paddingLeft.replace('px', ''), 10);
        paddingRight = parseInt(elStyl.paddingRight.replace('px', ''), 10);
        return {
          w: el.getBoundingClientRect().width - paddingLeft - paddingRight,
          pl: paddingLeft
        };
      } else {
        return { w: 0, pl: 0 };
      }
    },

    // 计算文本宽度
    getTipContentWidth: function getTipContentWidth(el, text) {
      var elStyl = void 0,
          fontSize = void 0,
          zhword = void 0,
          zhWidth = void 0;
      text = text || '';
      elStyl = getComputedStyle(el);
      fontSize = parseInt(elStyl.fontSize.replace('px', ''), 10);
      zhword = String(text).replace(/[0-9A-Za-z\-\:]/ig, '');
      zhWidth = zhword.length * fontSize;
      return (String(text).length - zhword.length) * fontSize * 0.56 + zhWidth;
    },

    // 获取tip动态配置
    getTipStatus: function getTipStatus(el) {
      var width = void 0,
          contentWidth = void 0;
      if (el) {
        width = this.getPlaceWidth(el).w;
        contentWidth = this.getTipContentWidth(el, this.tipContent);
        if (contentWidth > width) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  },
  mounted: function mounted() {

    if (this.prop.column.type === 'input') {
      this.dispatch('ElFormTable', 'el.form.addField', [this]); // 扩展修改

      var initialValue = this.value;
      if (Array.isArray(initialValue)) {
        initialValue = [].concat(initialValue);
      }
      Object.defineProperty(this, 'initialValue', {
        value: initialValue
      });

      if (this.rules && this.rules.length || this.isRequired) {
        this.$on('el.form.blur', this.onFieldBlur);
        this.$on('el.form.change', this.onFieldChange);
      }

      this.$on('el.form.mouseover', this.inputMouseover); // 表单组件 mouseover 事件
      this.$on('el.form.mouseout', this.inputMouseout); // 表单组件 mouseout 事件
      this.$on('el.form.messagetips', this.setTipContent); // 弹出信息内容填充
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.dispatch('ElFormTable', 'el.form.removeField', [this]); // 扩展修改
  }
};

/***/ }),

/***/ 144:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _vuePopper = __webpack_require__(6);

var _vuePopper2 = _interopRequireDefault(_vuePopper);

var _popup = __webpack_require__(14);

var _locale = __webpack_require__(5);

var _locale2 = _interopRequireDefault(_locale);

var _clickoutside = __webpack_require__(10);

var _clickoutside2 = _interopRequireDefault(_clickoutside);

var _dropdown = __webpack_require__(490);

var _dropdown2 = _interopRequireDefault(_dropdown);

var _checkbox = __webpack_require__(11);

var _checkbox2 = _interopRequireDefault(_checkbox);

var _checkboxGroup = __webpack_require__(29);

var _checkboxGroup2 = _interopRequireDefault(_checkboxGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'ElTableFilterPanel',

  mixins: [_vuePopper2.default, _locale2.default],

  directives: {
    Clickoutside: _clickoutside2.default
  },

  components: {
    ElCheckbox: _checkbox2.default,
    ElCheckboxGroup: _checkboxGroup2.default
  },

  props: {
    placement: {
      type: String,
      default: 'bottom-end'
    }
  },

  customRender: function customRender(h) {
    return h(
      'div',
      { 'class': 'el-table-filter' },
      [h(
        'div',
        { 'class': 'el-table-filter__content' },
        []
      ), h(
        'div',
        { 'class': 'el-table-filter__bottom' },
        [h(
          'button',
          {
            on: {
              'click': this.handleConfirm
            }
          },
          [this.t('el.table.confirmFilter')]
        ), h(
          'button',
          {
            on: {
              'click': this.handleReset
            }
          },
          [this.t('el.table.resetFilter')]
        )]
      )]
    );
  },


  methods: {
    isActive: function isActive(filter) {
      return filter.value === this.filterValue;
    },
    handleOutsideClick: function handleOutsideClick() {
      this.showPopper = false;
    },
    handleConfirm: function handleConfirm() {
      this.confirmFilter(this.filteredValue);
      this.handleOutsideClick();
    },
    handleReset: function handleReset() {
      this.filteredValue = [];
      this.confirmFilter(this.filteredValue);
      this.handleOutsideClick();
    },
    handleSelect: function handleSelect(filterValue) {
      this.filterValue = filterValue;

      if (typeof filterValue !== 'undefined' && filterValue !== null) {
        this.confirmFilter(this.filteredValue);
      } else {
        this.confirmFilter([]);
      }

      this.handleOutsideClick();
    },
    confirmFilter: function confirmFilter(filteredValue) {
      this.table.store.commit('filterChange', {
        column: this.column,
        values: filteredValue
      });
      this.table.store.updateAllSelected();
    }
  },

  data: function data() {
    return {
      table: null,
      cell: null,
      column: null
    };
  },


  computed: {
    filters: function filters() {
      return this.column && this.column.filters;
    },


    filterValue: {
      get: function get() {
        return (this.column.filteredValue || [])[0];
      },
      set: function set(value) {
        if (this.filteredValue) {
          if (typeof value !== 'undefined' && value !== null) {
            this.filteredValue.splice(0, 1, value);
          } else {
            this.filteredValue.splice(0, 1);
          }
        }
      }
    },

    filteredValue: {
      get: function get() {
        if (this.column) {
          return this.column.filteredValue || [];
        }
        return [];
      },
      set: function set(value) {
        if (this.column) {
          this.column.filteredValue = value;
        }
      }
    },

    multiple: function multiple() {
      if (this.column) {
        return this.column.filterMultiple;
      }
      return true;
    }
  },

  mounted: function mounted() {
    var _this = this;

    this.popperElm = this.$el;
    this.referenceElm = this.cell;
    this.table.bodyWrapper.addEventListener('scroll', function () {
      _this.updatePopper();
    });

    this.$watch('showPopper', function (value) {
      if (_this.column) _this.column.filterOpened = value;
      if (value) {
        _dropdown2.default.open(_this);
      } else {
        _dropdown2.default.close(_this);
      }
    });
  },

  watch: {
    showPopper: function showPopper(val) {
      if (val === true && parseInt(this.popperJS._popper.style.zIndex, 10) < _popup.PopupManager.zIndex) {
        this.popperJS._popper.style.zIndex = _popup.PopupManager.nextZIndex();
      }
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ 16:
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/utils/resize-event");

/***/ }),

/***/ 19:
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/tag");

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/utils/dom");

/***/ }),

/***/ 22:
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/tooltip");

/***/ }),

/***/ 28:
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/utils/scrollbar-width");

/***/ }),

/***/ 29:
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/checkbox-group");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/utils/util");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _normalizeWheel = __webpack_require__(42);

var _normalizeWheel2 = _interopRequireDefault(_normalizeWheel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isFirefox = typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

var mousewheel = function mousewheel(element, callback) {
  if (element && element.addEventListener) {
    element.addEventListener(isFirefox ? 'DOMMouseScroll' : 'mousewheel', function (event) {
      var normalized = (0, _normalizeWheel2.default)(event);
      callback && callback.apply(this, [event, normalized]);
    });
  }
};

exports.default = {
  bind: function bind(el, binding) {
    mousewheel(el, binding.value);
  }
};

/***/ }),

/***/ 42:
/***/ (function(module, exports) {

module.exports = require("normalize-wheel");

/***/ }),

/***/ 46:
/***/ (function(module, exports) {

module.exports = require("async-validator");

/***/ }),

/***/ 480:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(481);


/***/ }),

/***/ 481:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _table = __webpack_require__(482);

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_table2.default.install = function (Vue) {
  Vue.component(_table2.default.name, _table2.default);
};

exports.default = _table2.default;

/***/ }),

/***/ 482:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_table_vue__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_table_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_table_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_table_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_table_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_cecb9ece_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_table_vue__ = __webpack_require__(493);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_table_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_cecb9ece_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_table_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 483:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _debounce = __webpack_require__(12);

var _debounce2 = _interopRequireDefault(_debounce);

var _merge = __webpack_require__(9);

var _merge2 = _interopRequireDefault(_merge);

var _util = __webpack_require__(142);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sortData = function sortData(data, states) {
  var sortingColumn = states.sortingColumn;
  if (!sortingColumn || typeof sortingColumn.sortable === 'string') {
    return data;
  }
  return (0, _util.orderBy)(data, states.sortProp, states.sortOrder, sortingColumn.sortMethod, sortingColumn.sortBy);
};

var getKeysMap = function getKeysMap(array, rowKey) {
  var arrayMap = {};
  (array || []).forEach(function (row, index) {
    arrayMap[(0, _util.getRowIdentity)(row, rowKey)] = { row: row, index: index };
  });
  return arrayMap;
};

var toggleRowSelection = function toggleRowSelection(states, row, selected) {
  var changed = false;
  var selection = states.selection;
  var index = selection.indexOf(row);
  if (typeof selected === 'undefined') {
    if (index === -1) {
      selection.push(row);
      changed = true;
    } else {
      selection.splice(index, 1);
      changed = true;
    }
  } else {
    if (selected && index === -1) {
      selection.push(row);
      changed = true;
    } else if (!selected && index > -1) {
      selection.splice(index, 1);
      changed = true;
    }
  }

  return changed;
};

var toggleRowExpansion = function toggleRowExpansion(states, row, expanded) {
  var changed = false;
  var expandRows = states.expandRows;
  if (typeof expanded !== 'undefined') {
    var index = expandRows.indexOf(row);
    if (expanded) {
      if (index === -1) {
        expandRows.push(row);
        changed = true;
      }
    } else {
      if (index !== -1) {
        expandRows.splice(index, 1);
        changed = true;
      }
    }
  } else {
    var _index = expandRows.indexOf(row);
    if (_index === -1) {
      expandRows.push(row);
      changed = true;
    } else {
      expandRows.splice(_index, 1);
      changed = true;
    }
  }

  return changed;
};

/* 扩展-> 比值样式计算
[
 {
   style: {                 // 自定义样式
     color: '#fff',
     background: 'green'
   },
   fields: ['name', 'desc'], // 需要比较触发计算的字段
   stylefields: ['desc'], // 需要设置样式的字段（省略时，同fields)
   compare:function(data) {
     return data.name > data.desc;    // 返回为真时设置给定样式
   }
 }
]
*/
var compareChgStyl = function compareChgStyl(table, states) {

  if (!Array.isArray(table.compareStyl) || !Array.isArray(table.data)) return;
  var data = table.data; // 表数据
  var compareMap = states.compareMap;

  function setCustomStyle(row, rowIndex, cp, styl, force) {
    var fields = cp.stylefields || cp.fields;
    fields.forEach(function (f) {
      for (var prop in row) {
        if (row.hasOwnProperty && row.hasOwnProperty(prop) && prop === f || typeof row[prop] !== 'undefined') {
          var st = compareMap['row' + rowIndex + f] || {};
          for (var p in styl) {
            if (styl.hasOwnProperty(p) && force) {
              st[p] = styl[p];
            } else if (typeof st[p] === 'undefined' || st[p] === '') {
              st[p] = styl[p];
            }
          }
          compareMap['row' + rowIndex + f] = st;
        }
      }
    });
  }
  // 扩展-> 设定表格样式
  table.compareStyl.forEach(function (cp) {
    for (var i = 0; i < data.length; i++) {
      if (cp.compare.call(null, data[i], cp.fields, i)) {
        setCustomStyle(data[i], i, cp, cp.style, true);
      } else {
        var empty = {};
        for (var p in cp.style) {
          if (cp.style.hasOwnProperty(p)) empty[p] = '';
        }
        setCustomStyle(data[i], i, cp, empty, false);
      }
    }
  });
  // 扩展-> 渲染样式
  var dom = void 0,
      input = void 0,
      compSty = void 0;
  for (var key in states.compareMap) {
    dom = table.$el.querySelector('.' + key);
    if (states.compareMap.hasOwnProperty(key) && dom) {
      compSty = states.compareMap[key];
      for (var p in compSty) {
        if (compSty.hasOwnProperty(p)) dom.parentNode.style[p] = compSty[p];
      }
      if (table.enableInputcolor) {
        input = dom.querySelector('input') || dom.querySelector('textarea');
        if (input) {
          for (var c in compSty) {
            if (compSty.hasOwnProperty(c)) input.style[c] = compSty[c];
          }
        }
      }
    }
  }
};

// 扩展-> 设置Tab index  Key/Val 值
var setTabindex = function setTabindex() {
  var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'vertical';
  var startindex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var orginData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var colIndexs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];


  if (!orginData.length) return [];

  var tabindexMap = JSON.parse(JSON.stringify(orginData));
  var colIdx = [],
      keyidx = void 0,
      len = tabindexMap.length;
  // default order map
  tabindexMap.forEach(function (item) {
    Object.keys(item).forEach(function (key) {
      item[key] = 0;
    });
  });

  if (direction === 'vertical') {

    for (var i = 1; i < colIndexs.length; i++) {
      if (colIndexs[i]) {
        colIdx.push(colIndexs[i]);
      }
    }

    var _loop = function _loop(k) {
      Object.keys(tabindexMap[k]).forEach(function (key) {
        keyidx = colIdx.indexOf(key);
        if (keyidx > -1) {
          tabindexMap[k][key] = len * keyidx + k + startindex;
        }
      });
    };

    for (var k = 0; k < len; k++) {
      _loop(k);
    }
  }
  return tabindexMap;
};

// 扩展-> 设置最后一行或全部 Boolean 值映射
var initLastRowBoolMap = function initLastRowBoolMap(states, mp, initObj, initValidall) {
  var idx = states.data.length - 1;
  if (states.delStatus) return;
  if ((typeof initObj === 'undefined' ? 'undefined' : _typeof(initObj)) === 'object' && idx > -1) {
    for (var item in initObj) {
      if (initObj.hasOwnProperty(item)) {
        if (initValidall) {
          for (var i = 0; i <= idx; i++) {
            if (/#/g.test(item)) {
              states[mp][item.replace('#', i)] = initObj[item];
            } else {
              states[mp]['row' + (i + item)] = initObj[item];
            }
          }
        } else if (/#/g.test(item)) {
          states[mp][item.replace('#', idx)] = initObj[item];
        } else {
          states[mp]['row' + (idx + item)] = initObj[item];
        }
      }
    }
  }
};

// 扩展-> 设置单行数据 Boolean 值映射
var setBoolMapData = function setBoolMapData(initmap, prop, index, value /* 或 length */) {
  if (!isNaN(index) && typeof prop === 'string') {
    if (/#/g.test(prop)) {
      initmap[prop.replace('#', index)] = value;
    } else {
      initmap['row' + (index + prop)] = value;
    }
  } else if (!isNaN(index) && prop !== null && (typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'object') {
    var len = value && !isNaN(value) ? value : 1;
    for (var i = index; i > index - len; i--) {
      for (var item in prop) {
        if (prop.hasOwnProperty(item)) {
          if (/#/g.test(item)) {
            // 禁用的key格式： disabled#editabled
            initmap[item.replace('#', i)] = prop[item];
          } else {
            // 验证的Key格式： row#property
            initmap['row ' + (i + item)] = prop[item];
          }
        }
      }
    }
  }
};

var TableStore = function TableStore(table) {
  var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!table) {
    throw new Error('Table is required.');
  }
  this.table = table;

  this.states = {
    rowKey: null,
    _columns: [],
    originColumns: [],
    columns: [],
    fixedColumns: [],
    rightFixedColumns: [],
    leafColumns: [],
    fixedLeafColumns: [],
    rightFixedLeafColumns: [],
    leafColumnsLength: 0,
    fixedLeafColumnsLength: 0,
    rightFixedLeafColumnsLength: 0,
    isComplex: false,
    filteredData: null,
    data: null,
    sortingColumn: null,
    sortProp: null,
    sortOrder: null,
    isAllSelected: false,
    selection: [],
    reserveSelection: false,
    selectable: null,
    currentRow: null,
    hoverRow: null,
    filters: {},
    expandRows: [],
    defaultExpandAll: false,
    _tabidxs: [], // 扩展  Tab index 映射
    direction: 'vertical', // 扩展
    colIndexOrder: [], // 扩展
    errCount: {}, // 扩展-> 错误总数统计 {row0col:true}
    disabledMap: {}, // 扩展-> 单元格内容禁用控制映射
    disableField: { // 扩展-> 是否使用禁用字段
      field: 'disabled', // 扩展-> 禁用字段名称
      trueVal: '1',
      falseVal: '0'
    },
    validateMap: {}, // 扩展-> 验证控制映射
    delRowCount: 0, // 扩展-> 删除行数
    _initialData: [], // 扩展-> 锁定初始化数据
    modifiedMap: {}, // 扩展-> 数据修改比对映射，数据格式：{ row: {background: 'green' },  col: {background: 'red' } }
    compareMap: {} // 扩展-> 比较值样式映射
  };

  for (var prop in initialState) {
    if (initialState.hasOwnProperty(prop) && this.states.hasOwnProperty(prop)) {
      this.states[prop] = initialState[prop];
    }
  }
};

TableStore.prototype.mutations = {
  setData: function setData(states, data) {
    var _this = this;

    var dataInstanceChanged = states._data !== data;
    states._data = data;

    Object.keys(states.filters).forEach(function (columnId) {
      var values = states.filters[columnId];
      if (!values || values.length === 0) return;
      var column = (0, _util.getColumnById)(_this.states, columnId);
      if (column && column.filterMethod) {
        data = data.filter(function (row) {
          return values.some(function (value) {
            return column.filterMethod.call(null, value, row, column);
          });
        });
      }
    });

    states.filteredData = data;
    states.data = sortData(data || [], states);

    this.updateCurrentRow();

    if (!states.reserveSelection) {
      if (dataInstanceChanged) {
        this.clearSelection();
      } else {
        this.cleanSelection();
      }
      this.updateAllSelected();
    } else {
      (function () {
        var rowKey = states.rowKey;
        if (rowKey) {
          (function () {
            var selection = states.selection;
            var selectedMap = getKeysMap(selection, rowKey);

            states.data.forEach(function (row) {
              var rowId = (0, _util.getRowIdentity)(row, rowKey);
              var rowInfo = selectedMap[rowId];
              if (rowInfo) {
                selection[rowInfo.index] = row;
              }
            });

            _this.updateAllSelected();
          })();
        } else {
          console.warn('WARN: rowKey is required when reserve-selection is enabled.');
        }
      })();
    }

    var defaultExpandAll = states.defaultExpandAll;
    if (defaultExpandAll) {
      this.states.expandRows = (states.data || []).slice(0);
    }

    _vue2.default.nextTick(function () {
      return _this.table.updateScrollY();
    });
  },
  changeSortCondition: function changeSortCondition(states, options) {
    var _this2 = this;

    states.data = sortData(states.filteredData || states._data || [], states);

    if (!options || !options.silent) {
      this.table.$emit('sort-change', {
        column: this.states.sortingColumn,
        prop: this.states.sortProp,
        order: this.states.sortOrder
      });
    }

    _vue2.default.nextTick(function () {
      return _this2.table.updateScrollY();
    });
  },
  filterChange: function filterChange(states, options) {
    var _this3 = this;

    var column = options.column,
        values = options.values,
        silent = options.silent;

    if (values && !Array.isArray(values)) {
      values = [values];
    }

    var prop = column.property;
    var filters = {};

    if (prop) {
      states.filters[column.id] = values;
      filters[column.columnKey || column.id] = values;
    }

    var data = states._data;

    Object.keys(states.filters).forEach(function (columnId) {
      var values = states.filters[columnId];
      if (!values || values.length === 0) return;
      var column = (0, _util.getColumnById)(_this3.states, columnId);
      if (column && column.filterMethod) {
        data = data.filter(function (row) {
          return values.some(function (value) {
            return column.filterMethod.call(null, value, row, column);
          });
        });
      }
    });

    states.filteredData = data;
    states.data = sortData(data, states);

    if (!silent) {
      this.table.$emit('filter-change', filters);
    }

    _vue2.default.nextTick(function () {
      return _this3.table.updateScrollY();
    });
  },
  insertColumn: function insertColumn(states, column, index, parent) {
    var array = states._columns;
    if (parent) {
      array = parent.children;
      if (!array) array = parent.children = [];
    }

    if (typeof index !== 'undefined') {
      array.splice(index, 0, column);
    } else {
      array.push(column);
    }

    if (column.type === 'selection') {
      states.selectable = column.selectable;
      states.reserveSelection = column.reserveSelection;
    }

    if (this.table.$ready) {
      this.updateColumns(); // hack for dynamics insert column
      this.scheduleLayout();
    }
  },
  removeColumn: function removeColumn(states, column, parent) {
    var array = states._columns;
    if (parent) {
      array = parent.children;
      if (!array) array = parent.children = [];
    }
    if (array) {
      array.splice(array.indexOf(column), 1);
    }

    if (this.table.$ready) {
      this.updateColumns(); // hack for dynamics remove column
      this.scheduleLayout();
    }
  },
  setHoverRow: function setHoverRow(states, row) {
    states.hoverRow = row;
  },
  setCurrentRow: function setCurrentRow(states, row) {
    var oldCurrentRow = states.currentRow;
    states.currentRow = row;

    if (oldCurrentRow !== row) {
      this.table.$emit('current-change', row, oldCurrentRow);
    }
  },
  rowSelectedChanged: function rowSelectedChanged(states, row) {
    var changed = toggleRowSelection(states, row);
    var selection = states.selection;

    if (changed) {
      var table = this.table;
      table.$emit('selection-change', selection ? selection.slice() : []);
      table.$emit('select', selection, row);
    }

    this.updateAllSelected();
  },


  toggleAllSelection: (0, _debounce2.default)(10, function (states) {
    var data = states.data || [];
    if (data.length === 0) return;
    var value = !states.isAllSelected;
    var selection = this.states.selection;
    var selectionChanged = false;

    data.forEach(function (item, index) {
      if (states.selectable) {
        if (states.selectable.call(null, item, index) && toggleRowSelection(states, item, value)) {
          selectionChanged = true;
        }
      } else {
        if (toggleRowSelection(states, item, value)) {
          selectionChanged = true;
        }
      }
    });

    var table = this.table;
    if (selectionChanged) {
      table.$emit('selection-change', selection ? selection.slice() : []);
    }
    table.$emit('select-all', selection);
    states.isAllSelected = value;
  }),

  //  扩展-> 验证添加，供外部使用
  disValidateSet: function disValidateSet(states, prop, index, value) {
    // prop 参数可以是 {aa:true, bb:false} 这样的对象 或 字段名称
    setBoolMapData(states.validateMap, prop, index, value);
  },


  //  扩展-> 禁用添加，供外部使用
  disInputSet: function disInputSet(states, prop, index, value) {
    // prop 参数可以是 {aa:true, bb:false} 这样的对象 或 字段名称
    setBoolMapData(states.disabledMap, prop, index, value);
  },


  // 扩展-> 删除row验证和禁用状态，供外部使用
  delRowStatus: function delRowStatus(states, index) {
    var propertys = states.propertys;
    var rows = Array.isArray(index) ? index : [index];
    states.delStatus = true;
    function delStatus(index) {
      propertys.forEach(function (field) {
        // 删除禁用template状态
        if (typeof states.disabledMap['disabled' + index + field] === 'boolean') {
          delete states.disabledMap['disabled' + index + field];
        }
        // 删除禁用row状态
        if (typeof states.disabledMap['row' + index + field] === 'boolean') {
          delete states.disabledMap['row' + index + field];
        }
        // 删除验证状态
        if (typeof states.validateMap['row' + index + field] === 'boolean') {
          delete states.validateMap['row' + index + field];
        }
      });
    }

    // 重置序列
    function delOrder() {
      var idxs = [],
          rp = void 0,
          disabledMap = {},
          validateMap = {};
      var re1 = /^(disabled|row)/g;
      var re2 = /[a-zA-Z]\w*/g;
      var regx = /^(disabled|row)\d+[a-zA-Z]\w*/g;

      // 添加序号
      function addIdxs(delmap) {
        for (var p in delmap) {
          regx.lastIndex = 0;
          if (delmap.hasOwnProperty(p) && regx.test(p)) {
            rp = p.replace(re1, '').replace(re2, '');
            if (idxs.indexOf(rp) < 0) idxs.push(rp);
          }
        }
      }
      addIdxs(states.disabledMap);
      addIdxs(states.validateMap);
      idxs.sort();
      // 序化重置状态

      var _loop2 = function _loop2(i) {
        propertys.forEach(function (field) {
          if (typeof states.disabledMap['disabled' + idxs[i] + field] === 'boolean') {
            disabledMap['disabled' + i + field] = states.disabledMap['disabled' + idxs[i] + field];
          }
          if (typeof states.disabledMap['row' + idxs[i] + field] === 'boolean') {
            disabledMap['row' + i + field] = states.disabledMap['row' + idxs[i] + field];
          }
          if (typeof states.validateMap['row' + idxs[i] + field] === 'boolean') {
            validateMap['row' + i + field] = states.validateMap['row' + idxs[i] + field];
          }
        });
      };

      for (var i = 0; i < idxs.length; i++) {
        _loop2(i);
      }
      states.disabledMap = disabledMap;
      states.validateMap = validateMap;
    }

    for (var i = 0; i < rows.length; i++) {
      if (rows[i] != null && !isNaN(rows[i])) {
        delStatus(rows[i]);
      }if (rows[i] && _typeof(rows[i]) === 'object') {
        delStatus(states.data.indexOf(rows[i]));
      }
    }
    delOrder();
  },


  //  扩展-> 更新比较样式
  updateCompare: function updateCompare(states) {
    if (Array.isArray(this.table.compareStyl)) {
      compareChgStyl.call(this, this.table, states);
    }
  },


  //  扩展-> 数据比较映射删除处理
  compareDel: function compareDel(states, rowIndex) {

    if (!isNaN(rowIndex)) {
      if (rowIndex < states._initialData.length) {
        var k = void 0,
            x = void 0,
            n = void 0,
            key1 = void 0,
            key2 = void 0,
            item = void 0,
            modifiedMap = {},
            compareMap = {};
        var reg = new RegExp('row' + rowIndex + '[a-z]+[a-z0-9_]*$', 'ig');
        for (k in states.modifiedMap) {
          reg.lastIndex = 0;
          if (states.modifiedMap.hasOwnProperty(k) && reg.test(k)) {
            delete states.modifiedMap[k];
          }
        }

        for (x in states.compareMap) {
          reg.lastIndex = 0;
          if (states.compareMap.hasOwnProperty(x) && reg.test(x)) {
            delete states.compareMap[x];
          }
        }

        for (n = 0; n < states._initialData.length; n++) {
          item = states._initialData[n];
          // 处理删除元素前部分
          if (n < rowIndex && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
            for (key1 in item) {
              if (item.hasOwnProperty(key1)) {
                compareMap['row' + n + key1] = states.compareMap['row' + n + key1];
                modifiedMap['row' + n + key1] = states.modifiedMap['row' + n + key1];
              }
            }
            // 处理删除元素后部分
          } else if (n > rowIndex && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {

            for (key2 in item) {
              if (item.hasOwnProperty(key2)) {
                compareMap['row' + (n - 1) + key2] = states.compareMap['row' + n + key2];
                modifiedMap['row' + (n - 1) + key2] = states.modifiedMap['row' + n + key2];
              }
            }
          }
        }
        states.compareMap = compareMap;
        states.modifiedMap = modifiedMap;
        states._initialData.splice(rowIndex, 1);
        states.delRowCount++;
      }
    }
  },


  // 扩展-> 数据修改比较
  modifiedCompare: function modifiedCompare(states) {
    var row = void 0,
        itemStyl = void 0,
        table = this.table;
    // 比较对象是否相等
    function isEqualObj(item$1, item$2) {

      function equalObj(item1, item2) {
        for (var p in item1) {
          if (item1.hasOwnProperty(p) && item1[p] !== item2[p]) {
            return false;
          }
        }
        return true;
      }

      if (Array.isArray(item$1) === Array.isArray(item$2)) {
        if (item$1.length === item$2.length) {
          for (var k = 0; k < item$1.length; k++) {
            if (item$1[k] !== item$2[k]) return false;
          }
          return true; // 相等
        }
        return false;
      } else if ((typeof item$1 === 'undefined' ? 'undefined' : _typeof(item$1)) === 'object' && (typeof item$2 === 'undefined' ? 'undefined' : _typeof(item$2)) === 'object') {
        if (equalObj(item$1, item$2) && equalObj(item$2, item$1)) {
          return true;
        }
        return false;
      }
      return false;
    }
    // 合并样式
    function mergeStyl(origin, cover) {
      if (_typeof(origin['col']) === 'object' && (typeof cover === 'undefined' ? 'undefined' : _typeof(cover)) === 'object') {
        for (var k in cover) {
          if (cover.hasOwnProperty(k)) {
            if (origin['col'].hasOwnProperty(k)) {
              if (origin['col'][k] === '') origin['col'][k] = cover[k];
            } else {
              origin['col'][k] = cover[k];
            }
          }
        }
      }
      return origin;
    }
    // 数据修改比较处理
    if (Array.isArray(states.data) && Array.isArray(states._initialData) && typeof table.modifiedStyl === 'function') {
      for (var rowindex = 0; rowindex < states._initialData.length; rowindex++) {
        row = states._initialData[rowindex];
        for (var prop in row) {
          if (row.hasOwnProperty(prop)) {
            if (_typeof(row[prop]) !== 'object') {
              itemStyl = table.modifiedStyl.call(null, row[prop] !== states.data[rowindex][prop], states.data[rowindex], prop, rowindex, states.delRowCount);
              states.modifiedMap['row' + rowindex + prop] = mergeStyl(itemStyl, states.compareMap['row' + rowindex + prop]);
            } else if (_typeof(row[prop]) === 'object' && row[prop] != null) {
              itemStyl = table.modifiedStyl.call(null, !isEqualObj(states.data[rowindex][prop], row[prop]), states.data[rowindex], prop, rowindex, states.delRowCount);
              states.modifiedMap['row' + rowindex + prop] = mergeStyl(itemStyl, states.compareMap['row' + rowindex + prop]);
            }
          }
        }
      }
      // 渲染样式
      var dom = void 0,
          rowStyl = void 0,
          colStyl = void 0,
          rowSet = {},
          rowIdx = void 0;
      for (var key in states.modifiedMap) {
        dom = table.$el.querySelector('.' + key);

        if (states.modifiedMap.hasOwnProperty(key) && dom) {

          rowStyl = states.modifiedMap[key]['row'] || {};
          colStyl = states.modifiedMap[key]['col'] || {};
          for (var p in colStyl) {
            if (colStyl.hasOwnProperty(p)) {
              dom.parentNode.style[p] = colStyl[p];
            }
          }

          rowIdx = key.replace('row', '').replace(/[a-z]+[a-z0-9_]*$/ig, '');
          if (!rowSet[rowIdx] && states.modifiedMap[key]['todo'] === 'set') {
            table.setRowStyle(rowIdx, rowStyl);
            rowSet[rowIdx] = true;
          } else if (!rowSet[rowIdx]) {
            table.setRowStyle(rowIdx, rowStyl);
            rowSet[rowIdx] = false;
          }
        }
      }
    }
  },


  // 扩展-> 锁定初始数据用于判定是否为修改
  lockData: function lockData(states) {
    states.modifiedMap = {};
    if (states.data) {
      states._initialData = JSON.parse(JSON.stringify(states.data));
    }
  },

  // 扩展
  deleteSelection: function deleteSelection(states) {
    var store = this.table.store;
    var index = void 0,
        data = states.data || [];
    (states.selection || []).forEach(function (row) {
      index = data.indexOf(row);
      if (index !== -1) {
        data.splice(index, 1);
        store.commit('delRowStatus', index);
        store.commit('compareDel', index);
      }
    });
  },

  // 扩展
  deleteRow: function deleteRow(states, row) {
    var store = this.table.store;
    var index = states.data.indexOf(row);
    if (index !== -1) {
      states.data.splice(index, 1);
      store.updateTabindex(store.table.startTabindex);
      store.commit('delRowStatus', index);
      store.commit('compareDel', index);
    }
  },

  // 扩展
  addNewRow: function addNewRow(states, row) {
    states.data.push(row);
  },

  // 扩展
  setErrCount: function setErrCount(states, field) {
    states.errCount[field] = true;
  },

  // 扩展
  disErrCount: function disErrCount(states, field) {
    states.errCount[field] = false;
  },

  // 扩展
  clearErrCount: function clearErrCount(states) {
    states.errCount = {};
  }
};

var doFlattenColumns = function doFlattenColumns(columns) {
  var result = [];
  columns.forEach(function (column) {
    if (column.children) {
      result.push.apply(result, doFlattenColumns(column.children));
    } else {
      result.push(column);
    }
  });
  return result;
};

// 扩展-> 计算错误统计
TableStore.prototype.getErrCount = function (states) {
  var c = 0;
  for (var i in states.errCount) {
    if (states.errCount[i]) c++;
  }
  return c;
};

// 扩展-> 设置列Tab index 的值
TableStore.prototype.setColIndexOrder = function (index, columnName) {
  if (index && columnName) this.states.colIndexOrder[index] = columnName;
};

// 扩展-> 更新Tab index 的值
TableStore.prototype.updateTabindex = function (startindex, direction) {
  startindex = startindex || 1;
  direction = direction || this.states.direction;
  this.states._tabidxs = setTabindex(direction, startindex, this.states.data, this.states.colIndexOrder);
};

// 扩展-> 获取验证状态
TableStore.prototype.getValidateField = function (prop) {
  if (typeof this.states.validateMap[prop] !== 'undefined') {
    return Boolean(this.states.validateMap[prop]);
  }
  return false;
};

// 扩展-> 初始化最后字段验证
TableStore.prototype.initLastValidateFields = function (initValidall) {
  initLastRowBoolMap(this.states, 'validateMap', this.table.initValidfields, initValidall);
};

// 扩展-> 初始化最后一行禁用字段
TableStore.prototype.initLastRowDisFields = function (initValidall) {
  initLastRowBoolMap(this.states, 'disabledMap', this.table.initDisfields, initValidall);
};

TableStore.prototype.updateColumns = function () {
  var states = this.states;
  var _columns = states._columns || [];
  states.fixedColumns = _columns.filter(function (column) {
    return column.fixed === true || column.fixed === 'left';
  });
  states.rightFixedColumns = _columns.filter(function (column) {
    return column.fixed === 'right';
  });

  if (states.fixedColumns.length > 0 && _columns[0] && _columns[0].type === 'selection' && !_columns[0].fixed) {
    _columns[0].fixed = true;
    states.fixedColumns.unshift(_columns[0]);
  }

  var notFixedColumns = _columns.filter(function (column) {
    return !column.fixed;
  });
  states.originColumns = [].concat(states.fixedColumns).concat(notFixedColumns).concat(states.rightFixedColumns);

  var leafColumns = doFlattenColumns(notFixedColumns);
  var fixedLeafColumns = doFlattenColumns(states.fixedColumns);
  var rightFixedLeafColumns = doFlattenColumns(states.rightFixedColumns);

  states.leafColumnsLength = leafColumns.length;
  states.fixedLeafColumnsLength = fixedLeafColumns.length;
  states.rightFixedLeafColumnsLength = rightFixedLeafColumns.length;

  states.columns = [].concat(fixedLeafColumns).concat(leafColumns).concat(rightFixedLeafColumns);
  states.isComplex = states.fixedColumns.length > 0 || states.rightFixedColumns.length > 0;
};

TableStore.prototype.isSelected = function (row) {
  return (this.states.selection || []).indexOf(row) > -1;
};

TableStore.prototype.clearSelection = function () {
  var states = this.states;
  states.isAllSelected = false;
  var oldSelection = states.selection;
  if (states.selection.length) {
    states.selection = [];
  }
  if (oldSelection.length > 0) {
    this.table.$emit('selection-change', states.selection ? states.selection.slice() : []);
  }
};

TableStore.prototype.setExpandRowKeys = function (rowKeys) {
  var expandRows = [];
  var data = this.states.data;
  var rowKey = this.states.rowKey;
  if (!rowKey) throw new Error('[Table] prop row-key should not be empty.');
  var keysMap = getKeysMap(data, rowKey);
  rowKeys.forEach(function (key) {
    var info = keysMap[key];
    if (info) {
      expandRows.push(info.row);
    }
  });

  this.states.expandRows = expandRows;
};

TableStore.prototype.toggleRowSelection = function (row, selected) {
  var changed = toggleRowSelection(this.states, row, selected);
  if (changed) {
    this.table.$emit('selection-change', this.states.selection ? this.states.selection.slice() : []);
  }
};

TableStore.prototype.toggleRowExpansion = function (row, expanded) {
  var changed = toggleRowExpansion(this.states, row, expanded);
  if (changed) {
    this.table.$emit('expand-change', row, this.states.expandRows);
    this.scheduleLayout();
  }
};

TableStore.prototype.isRowExpanded = function (row) {
  var _states = this.states,
      _states$expandRows = _states.expandRows,
      expandRows = _states$expandRows === undefined ? [] : _states$expandRows,
      rowKey = _states.rowKey;

  if (rowKey) {
    var expandMap = getKeysMap(expandRows, rowKey);
    return !!expandMap[(0, _util.getRowIdentity)(row, rowKey)];
  }
  return expandRows.indexOf(row) !== -1;
};

TableStore.prototype.cleanSelection = function () {
  var selection = this.states.selection || [];
  var data = this.states.data;
  var rowKey = this.states.rowKey;
  var deleted = void 0;
  if (rowKey) {
    deleted = [];
    var selectedMap = getKeysMap(selection, rowKey);
    var dataMap = getKeysMap(data, rowKey);
    for (var key in selectedMap) {
      if (selectedMap.hasOwnProperty(key) && !dataMap[key]) {
        deleted.push(selectedMap[key].row);
      }
    }
  } else {
    deleted = selection.filter(function (item) {
      return data.indexOf(item) === -1;
    });
  }

  deleted.forEach(function (deletedItem) {
    selection.splice(selection.indexOf(deletedItem), 1);
  });

  if (deleted.length) {
    this.table.$emit('selection-change', selection ? selection.slice() : []);
  }
};

TableStore.prototype.clearFilter = function () {
  var states = this.states;
  var _table$$refs = this.table.$refs,
      tableHeader = _table$$refs.tableHeader,
      fixedTableHeader = _table$$refs.fixedTableHeader,
      rightFixedTableHeader = _table$$refs.rightFixedTableHeader;

  var panels = {};

  if (tableHeader) panels = (0, _merge2.default)(panels, tableHeader.filterPanels);
  if (fixedTableHeader) panels = (0, _merge2.default)(panels, fixedTableHeader.filterPanels);
  if (rightFixedTableHeader) panels = (0, _merge2.default)(panels, rightFixedTableHeader.filterPanels);

  var keys = Object.keys(panels);
  if (!keys.length) return;

  keys.forEach(function (key) {
    panels[key].filteredValue = [];
  });

  states.filters = {};

  this.commit('filterChange', {
    column: {},
    values: [],
    silent: true
  });
};

TableStore.prototype.clearSort = function () {
  var states = this.states;
  if (!states.sortingColumn) return;
  states.sortingColumn.order = null;
  states.sortProp = null;
  states.sortOrder = null;

  this.commit('changeSortCondition', {
    silent: true
  });
};

TableStore.prototype.updateAllSelected = function () {
  var states = this.states;
  var selection = states.selection,
      rowKey = states.rowKey,
      selectable = states.selectable,
      data = states.data;

  if (!data || data.length === 0) {
    states.isAllSelected = false;
    return;
  }

  var selectedMap = void 0;
  if (rowKey) {
    selectedMap = getKeysMap(states.selection, rowKey);
  }

  var isSelected = function isSelected(row) {
    if (selectedMap) {
      return !!selectedMap[(0, _util.getRowIdentity)(row, rowKey)];
    } else {
      return selection.indexOf(row) !== -1;
    }
  };

  var isAllSelected = true;
  var selectedCount = 0;
  for (var i = 0, j = data.length; i < j; i++) {
    var item = data[i];
    var isRowSelectable = selectable && selectable.call(null, item, i);
    if (!isSelected(item)) {
      if (!selectable || isRowSelectable) {
        isAllSelected = false;
        break;
      }
    } else {
      selectedCount++;
    }
  }

  if (selectedCount === 0) isAllSelected = false;

  states.isAllSelected = isAllSelected;
};

TableStore.prototype.scheduleLayout = function (updateColumns) {
  if (updateColumns) {
    this.updateColumns();
  }
  this.table.debouncedUpdateLayout();
};

TableStore.prototype.setCurrentRowKey = function (key) {
  var states = this.states;
  var rowKey = states.rowKey;
  if (!rowKey) throw new Error('[Table] row-key should not be empty.');
  var data = states.data || [];
  var keysMap = getKeysMap(data, rowKey);
  var info = keysMap[key];
  if (info) {
    states.currentRow = info.row;
  }
};

TableStore.prototype.updateCurrentRow = function () {
  var states = this.states;
  var table = this.table;
  var data = states.data || [];
  var oldCurrentRow = states.currentRow;

  if (data.indexOf(oldCurrentRow) === -1) {
    states.currentRow = null;

    if (states.currentRow !== oldCurrentRow) {
      table.$emit('current-change', null, oldCurrentRow);
    }
  }
};

TableStore.prototype.commit = function (name) {
  var mutations = this.mutations;
  if (mutations[name]) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    mutations[name].apply(this, [this.states].concat(args));
  } else {
    throw new Error('Action not found: ' + name);
  }
};

exports.default = TableStore;

/***/ }),

/***/ 484:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _scrollbarWidth = __webpack_require__(28);

var _scrollbarWidth2 = _interopRequireDefault(_scrollbarWidth);

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TableLayout = function () {
  function TableLayout(options) {
    _classCallCheck(this, TableLayout);

    this.observers = [];
    this.table = null;
    this.store = null;
    this.columns = null;
    this.fit = true;
    this.showHeader = true;

    this.height = null;
    this.scrollX = false;
    this.scrollY = false;
    this.bodyWidth = null;
    this.fixedWidth = null;
    this.rightFixedWidth = null;
    this.tableHeight = null;
    this.headerHeight = 44; // Table Header Height
    this.appendHeight = 0; // Append Slot Height
    this.footerHeight = 44; // Table Footer Height
    this.viewportHeight = null; // Table Height - Scroll Bar Height
    this.bodyHeight = null; // Table Height - Table Header Height
    this.fixedBodyHeight = null; // Table Height - Table Header Height - Scroll Bar Height
    this.gutterWidth = (0, _scrollbarWidth2.default)();

    for (var name in options) {
      if (options.hasOwnProperty(name)) {
        this[name] = options[name];
      }
    }

    if (!this.table) {
      throw new Error('table is required for Table Layout');
    }
    if (!this.store) {
      throw new Error('store is required for Table Layout');
    }
  }

  TableLayout.prototype.updateScrollY = function updateScrollY() {
    var height = this.height;
    if (typeof height !== 'string' && typeof height !== 'number') return;
    var bodyWrapper = this.table.bodyWrapper;
    if (this.table.$el && bodyWrapper) {
      var body = bodyWrapper.querySelector('.el-table__body');
      this.scrollY = body.offsetHeight > this.bodyHeight;
    }
  };

  TableLayout.prototype.setHeight = function setHeight(value) {
    var _this = this;

    var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'height';

    if (_vue2.default.prototype.$isServer) return;
    var el = this.table.$el;
    if (typeof value === 'string' && /^\d+$/.test(value)) {
      value = Number(value);
    }
    this.height = value;

    if (!el && (value || value === 0)) return _vue2.default.nextTick(function () {
      return _this.setHeight(value, prop);
    });

    if (typeof value === 'number') {
      el.style[prop] = value + 'px';

      this.updateElsHeight();
    } else if (typeof value === 'string') {
      el.style[prop] = value;
      this.updateElsHeight();
    }
  };

  TableLayout.prototype.setMaxHeight = function setMaxHeight(value) {
    return this.setHeight(value, 'max-height');
  };

  TableLayout.prototype.updateElsHeight = function updateElsHeight() {
    var _this2 = this;

    if (!this.table.$ready) return _vue2.default.nextTick(function () {
      return _this2.updateElsHeight();
    });
    var _table$$refs = this.table.$refs,
        headerWrapper = _table$$refs.headerWrapper,
        appendWrapper = _table$$refs.appendWrapper,
        footerWrapper = _table$$refs.footerWrapper;

    this.appendHeight = appendWrapper ? appendWrapper.offsetHeight : 0;

    if (this.showHeader && !headerWrapper) return;
    var headerHeight = this.headerHeight = !this.showHeader ? 0 : headerWrapper.offsetHeight;
    if (this.showHeader && headerWrapper.offsetWidth > 0 && (this.table.columns || []).length > 0 && headerHeight < 2) {
      return _vue2.default.nextTick(function () {
        return _this2.updateElsHeight();
      });
    }
    var tableHeight = this.tableHeight = this.table.$el.clientHeight;
    if (this.height !== null && (!isNaN(this.height) || typeof this.height === 'string')) {
      var footerHeight = this.footerHeight = footerWrapper ? footerWrapper.offsetHeight : 0;
      this.bodyHeight = tableHeight - headerHeight - footerHeight + (footerWrapper ? 1 : 0);
    }
    this.fixedBodyHeight = this.scrollX ? this.bodyHeight - this.gutterWidth : this.bodyHeight;

    var noData = !this.table.data || this.table.data.length === 0;
    this.viewportHeight = this.scrollX ? tableHeight - (noData ? 0 : this.gutterWidth) : tableHeight;

    this.updateScrollY();
    this.notifyObservers('scrollable');
  };

  TableLayout.prototype.getFlattenColumns = function getFlattenColumns() {
    var flattenColumns = [];
    var columns = this.table.columns;
    columns.forEach(function (column) {
      if (column.isColumnGroup) {
        flattenColumns.push.apply(flattenColumns, column.columns);
      } else {
        flattenColumns.push(column);
      }
    });

    return flattenColumns;
  };

  TableLayout.prototype.updateColumnsWidth = function updateColumnsWidth() {
    var fit = this.fit;
    var bodyWidth = this.table.$el.clientWidth;
    var bodyMinWidth = 0;

    var flattenColumns = this.getFlattenColumns();
    var flexColumns = flattenColumns.filter(function (column) {
      return typeof column.width !== 'number';
    });

    flattenColumns.forEach(function (column) {
      // Clean those columns whose width changed from flex to unflex
      if (typeof column.width === 'number' && column.realWidth) column.realWidth = null;
    });

    if (flexColumns.length > 0 && fit) {
      flattenColumns.forEach(function (column) {
        bodyMinWidth += column.width || column.minWidth || 80;
      });

      var scrollYWidth = this.scrollY ? this.gutterWidth : 0;

      if (bodyMinWidth <= bodyWidth - scrollYWidth) {
        // DON'T HAVE SCROLL BAR
        this.scrollX = false;

        var totalFlexWidth = bodyWidth - scrollYWidth - bodyMinWidth;

        if (flexColumns.length === 1) {
          flexColumns[0].realWidth = (flexColumns[0].minWidth || 80) + totalFlexWidth;
        } else {
          (function () {
            var allColumnsWidth = flexColumns.reduce(function (prev, column) {
              return prev + (column.minWidth || 80);
            }, 0);
            var flexWidthPerPixel = totalFlexWidth / allColumnsWidth;
            var noneFirstWidth = 0;

            flexColumns.forEach(function (column, index) {
              if (index === 0) return;
              var flexWidth = Math.floor((column.minWidth || 80) * flexWidthPerPixel);
              noneFirstWidth += flexWidth;
              column.realWidth = (column.minWidth || 80) + flexWidth;
            });

            flexColumns[0].realWidth = (flexColumns[0].minWidth || 80) + totalFlexWidth - noneFirstWidth;
          })();
        }
      } else {
        // HAVE HORIZONTAL SCROLL BAR
        this.scrollX = true;
        flexColumns.forEach(function (column) {
          column.realWidth = column.minWidth;
        });
      }

      this.bodyWidth = Math.max(bodyMinWidth, bodyWidth);
    } else {
      flattenColumns.forEach(function (column) {
        if (!column.width && !column.minWidth) {
          column.realWidth = 80;
        } else {
          column.realWidth = column.width || column.minWidth;
        }

        bodyMinWidth += column.realWidth;
      });
      this.scrollX = bodyMinWidth > bodyWidth;

      this.bodyWidth = bodyMinWidth;
    }

    var fixedColumns = this.store.states.fixedColumns;

    if (fixedColumns.length > 0) {
      var fixedWidth = 0;
      fixedColumns.forEach(function (column) {
        fixedWidth += column.realWidth || column.width;
      });

      this.fixedWidth = fixedWidth;
    }

    var rightFixedColumns = this.store.states.rightFixedColumns;
    if (rightFixedColumns.length > 0) {
      var rightFixedWidth = 0;
      rightFixedColumns.forEach(function (column) {
        rightFixedWidth += column.realWidth || column.width;
      });

      this.rightFixedWidth = rightFixedWidth;
    }

    this.notifyObservers('columns');
  };

  TableLayout.prototype.addObserver = function addObserver(observer) {
    this.observers.push(observer);
  };

  TableLayout.prototype.removeObserver = function removeObserver(observer) {
    var index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  };

  TableLayout.prototype.notifyObservers = function notifyObservers(event) {
    var _this3 = this;

    var observers = this.observers;
    observers.forEach(function (observer) {
      switch (event) {
        case 'columns':
          observer.onColumnsChange(_this3);
          break;
        case 'scrollable':
          observer.onScrollableChange(_this3);
          break;
        default:
          throw new Error('Table Layout don\'t have event ' + event + '.');
      }
    });
  };

  return TableLayout;
}();

exports.default = TableLayout;

/***/ }),

/***/ 485:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _util = __webpack_require__(142);

var _dom = __webpack_require__(2);

var _checkbox = __webpack_require__(11);

var _checkbox2 = _interopRequireDefault(_checkbox);

var _tooltip = __webpack_require__(22);

var _tooltip2 = _interopRequireDefault(_tooltip);

var _debounce = __webpack_require__(12);

var _debounce2 = _interopRequireDefault(_debounce);

var _layoutObserver = __webpack_require__(49);

var _layoutObserver2 = _interopRequireDefault(_layoutObserver);

var _tableItem = __webpack_require__(486);

var _tableItem2 = _interopRequireDefault(_tableItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 扩展

exports.default = {
  name: 'ElTableBody',

  mixins: [_layoutObserver2.default],

  components: {
    ElCheckbox: _checkbox2.default,
    ElTooltip: _tooltip2.default,
    ElTableItem: _tableItem2.default
  },

  props: {
    store: {
      required: true
    },
    stripe: Boolean,
    context: {},
    rowClassName: [String, Function],
    rowStyle: [Object, Function],
    fixed: String,
    highlight: Boolean
  },

  render: function render(h) {
    var _this = this;

    var columnsHidden = this.columns.map(function (column, index) {
      return _this.isColumnHidden(index);
    });
    return h(
      'table',
      {
        'class': 'el-table__body',
        attrs: { cellspacing: '0',
          cellpadding: '0',
          border: '0' }
      },
      [h(
        'colgroup',
        null,
        [this._l(this.columns, function (column) {
          return h(
            'col',
            {
              attrs: { name: column.id }
            },
            []
          );
        })]
      ), h(
        'tbody',
        null,
        [this._l(this.data, function (row, $index) {
          return [h(
            'tr',
            {
              style: _this.rowStyle ? _this.getRowStyle(row, $index) : null,
              key: _this.table.rowKey ? _this.getKeyOfRow(row, $index) : $index,
              on: {
                'dblclick': function dblclick($event) {
                  return _this.handleDoubleClick($event, row);
                },
                'click': function click($event) {
                  return _this.handleClick($event, row);
                },
                'contextmenu': function contextmenu($event) {
                  return _this.handleContextMenu($event, row);
                },
                'mouseenter': function mouseenter(_) {
                  return _this.handleMouseEnter($index);
                },
                'mouseleave': function mouseleave(_) {
                  return _this.handleMouseLeave();
                }
              },

              'class': [_this.getRowClass(row, $index)] },
            [_this._l(_this.columns, function (column, cellIndex) {
              var _getSpan = _this.getSpan(row, column, $index, cellIndex),
                  rowspan = _getSpan.rowspan,
                  colspan = _getSpan.colspan;

              if (!rowspan || !colspan) {
                return '';
              } else {
                if (rowspan === 1 && colspan === 1) {
                  return h(
                    'td',
                    {
                      style: _this.getCellStyle($index, cellIndex, row, column),
                      'class': _this.getCellClass($index, cellIndex, row, column),
                      on: {
                        'mouseenter': function mouseenter($event) {
                          return _this.handleCellMouseEnter($event, row);
                        },
                        'mouseleave': _this.handleCellMouseLeave
                      }
                    },
                    [column.renderCell.call(_this._renderProxy, h, {
                      row: row,
                      column: column,
                      $index: $index,
                      store: _this.store,
                      _self: _this.context || _this.table.$vnode.context
                    }, columnsHidden[cellIndex])]
                  );
                } else {
                  return h(
                    'td',
                    {
                      style: _this.getCellStyle($index, cellIndex, row, column),
                      'class': _this.getCellClass($index, cellIndex, row, column),
                      attrs: { rowspan: rowspan,
                        colspan: colspan
                      },
                      on: {
                        'mouseenter': function mouseenter($event) {
                          return _this.handleCellMouseEnter($event, row);
                        },
                        'mouseleave': _this.handleCellMouseLeave
                      }
                    },
                    [column.renderCell.call(_this._renderProxy, h, {
                      row: row,
                      column: column,
                      $index: $index,
                      store: _this.store,
                      _self: _this.context || _this.table.$vnode.context
                    }, columnsHidden[cellIndex])]
                  );
                }
              }
            })]
          ), _this.store.isRowExpanded(row) ? h(
            'tr',
            null,
            [h(
              'td',
              {
                attrs: { colspan: _this.columns.length },
                'class': 'el-table__expanded-cell' },
              [_this.table.renderExpanded ? _this.table.renderExpanded(h, { row: row, $index: $index, store: _this.store }) : '']
            )]
          ) : ''];
        }).concat(h(
          'el-tooltip',
          {
            attrs: { effect: this.table.tooltipEffect, placement: 'top', content: this.tooltipContent },
            ref: 'tooltip' },
          []
        ))]
      )]
    );
  },


  watch: {
    'store.states.hoverRow': function storeStatesHoverRow(newVal, oldVal) {
      if (!this.store.states.isComplex) return;
      var el = this.$el;
      if (!el) return;
      var tr = el.querySelector('tbody').children;
      var rows = [].filter.call(tr, function (row) {
        return (0, _dom.hasClass)(row, 'el-table__row');
      });
      var oldRow = rows[oldVal];
      var newRow = rows[newVal];
      if (oldRow) {
        (0, _dom.removeClass)(oldRow, 'hover-row');
      }
      if (newRow) {
        (0, _dom.addClass)(newRow, 'hover-row');
      }
    },
    'store.states.currentRow': function storeStatesCurrentRow(newVal, oldVal) {
      if (!this.highlight) return;
      var el = this.$el;
      if (!el) return;
      var data = this.store.states.data;
      var tr = el.querySelector('tbody').children;
      var rows = [].filter.call(tr, function (row) {
        return (0, _dom.hasClass)(row, 'el-table__row');
      });
      var oldRow = rows[data.indexOf(oldVal)];
      var newRow = rows[data.indexOf(newVal)];
      if (oldRow) {
        (0, _dom.removeClass)(oldRow, 'current-row');
      } else {
        [].forEach.call(rows, function (row) {
          return (0, _dom.removeClass)(row, 'current-row');
        });
      }
      if (newRow) {
        (0, _dom.addClass)(newRow, 'current-row');
      }
    }
  },

  computed: {
    table: function table() {
      return this.$parent;
    },
    data: function data() {
      return this.store.states.data;
    },
    columnsCount: function columnsCount() {
      return this.store.states.columns.length;
    },
    leftFixedLeafCount: function leftFixedLeafCount() {
      return this.store.states.fixedLeafColumnsLength;
    },
    rightFixedLeafCount: function rightFixedLeafCount() {
      return this.store.states.rightFixedLeafColumnsLength;
    },
    leftFixedCount: function leftFixedCount() {
      return this.store.states.fixedColumns.length;
    },
    rightFixedCount: function rightFixedCount() {
      return this.store.states.rightFixedColumns.length;
    },
    columns: function columns() {
      return this.store.states.columns;
    }
  },

  data: function data() {
    return {
      tooltipContent: ''
    };
  },
  created: function created() {
    this.activateTooltip = (0, _debounce2.default)(50, function (tooltip) {
      return tooltip.handleShowPopper();
    });
  },


  methods: {
    getKeyOfRow: function getKeyOfRow(row, index) {
      var rowKey = this.table.rowKey;
      if (rowKey) {
        return (0, _util.getRowIdentity)(row, rowKey);
      }
      return index;
    },
    isColumnHidden: function isColumnHidden(index) {
      if (this.fixed === true || this.fixed === 'left') {
        return index >= this.leftFixedLeafCount;
      } else if (this.fixed === 'right') {
        return index < this.columnsCount - this.rightFixedLeafCount;
      } else {
        return index < this.leftFixedLeafCount || index >= this.columnsCount - this.rightFixedLeafCount;
      }
    },
    getSpan: function getSpan(row, column, rowIndex, columnIndex) {
      var rowspan = 1;
      var colspan = 1;

      var fn = this.table.spanMethod;
      if (typeof fn === 'function') {
        var result = fn({
          row: row,
          column: column,
          rowIndex: rowIndex,
          columnIndex: columnIndex
        });

        if (Array.isArray(result)) {
          rowspan = result[0];
          colspan = result[1];
        } else if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object') {
          rowspan = result.rowspan;
          colspan = result.colspan;
        }
      }

      return {
        rowspan: rowspan,
        colspan: colspan
      };
    },
    getRowStyle: function getRowStyle(row, rowIndex) {
      var rowStyle = this.table.rowStyle;
      if (typeof rowStyle === 'function') {
        return rowStyle.call(null, {
          row: row,
          rowIndex: rowIndex
        });
      }
      return rowStyle;
    },
    getRowClass: function getRowClass(row, rowIndex) {
      var classes = ['el-table__row'];

      if (this.stripe && rowIndex % 2 === 1) {
        classes.push('el-table__row--striped');
      }
      var rowClassName = this.table.rowClassName;
      if (typeof rowClassName === 'string') {
        classes.push(rowClassName);
      } else if (typeof rowClassName === 'function') {
        classes.push(rowClassName.call(null, {
          row: row,
          rowIndex: rowIndex
        }));
      }

      if (this.store.states.expandRows.indexOf(row) > -1) {
        classes.push('expanded');
      }

      return classes.join(' ');
    },
    getCellStyle: function getCellStyle(rowIndex, columnIndex, row, column) {
      var cellStyle = this.table.cellStyle;
      if (typeof cellStyle === 'function') {
        return cellStyle.call(null, {
          rowIndex: rowIndex,
          columnIndex: columnIndex,
          row: row,
          column: column
        });
      }
      return cellStyle;
    },
    getCellClass: function getCellClass(rowIndex, columnIndex, row, column) {
      var classes = [column.id, column.align, column.className];

      if (this.isColumnHidden(columnIndex)) {
        classes.push('is-hidden');
      }

      var cellClassName = this.table.cellClassName;
      if (typeof cellClassName === 'string') {
        classes.push(cellClassName);
      } else if (typeof cellClassName === 'function') {
        classes.push(cellClassName.call(null, {
          rowIndex: rowIndex,
          columnIndex: columnIndex,
          row: row,
          column: column
        }));
      }

      return classes.join(' ');
    },
    handleCellMouseEnter: function handleCellMouseEnter(event, row) {
      var table = this.table;
      var cell = (0, _util.getCell)(event);

      if (cell) {
        var column = (0, _util.getColumnByCell)(table, cell);
        var hoverState = table.hoverState = { cell: cell, column: column, row: row };
        table.$emit('cell-mouse-enter', hoverState.row, hoverState.column, hoverState.cell, event);
      }

      // 判断是否text-overflow, 如果是就显示tooltip
      var cellChild = event.target.querySelector('.cell');

      if ((0, _dom.hasClass)(cellChild, 'el-tooltip') && cellChild.scrollWidth > cellChild.offsetWidth && this.$refs.tooltip) {
        var tooltip = this.$refs.tooltip;
        // TODO 会引起整个 Table 的重新渲染，需要优化
        this.tooltipContent = cell.textContent || cell.innerText;
        tooltip.referenceElm = cell;
        tooltip.$refs.popper && (tooltip.$refs.popper.style.display = 'none');
        tooltip.doDestroy();
        tooltip.setExpectedState(true);
        this.activateTooltip(tooltip);
      }
    },
    handleCellMouseLeave: function handleCellMouseLeave(event) {
      var tooltip = this.$refs.tooltip;
      if (tooltip) {
        tooltip.setExpectedState(false);
        tooltip.handleClosePopper();
      }
      var cell = (0, _util.getCell)(event);
      if (!cell) return;

      var oldHoverState = this.table.hoverState || {};
      this.table.$emit('cell-mouse-leave', oldHoverState.row, oldHoverState.column, oldHoverState.cell, event);
    },
    handleMouseEnter: function handleMouseEnter(index) {
      this.store.commit('setHoverRow', index);
    },
    handleMouseLeave: function handleMouseLeave() {
      this.store.commit('setHoverRow', null);
    },
    handleContextMenu: function handleContextMenu(event, row) {
      this.handleEvent(event, row, 'contextmenu');
    },
    handleDoubleClick: function handleDoubleClick(event, row) {
      this.handleEvent(event, row, 'dblclick');
    },
    handleClick: function handleClick(event, row) {
      this.store.commit('setCurrentRow', row);
      this.handleEvent(event, row, 'click');
    },
    handleEvent: function handleEvent(event, row, name) {
      var table = this.table;
      var cell = (0, _util.getCell)(event);
      var column = void 0;
      if (cell) {
        column = (0, _util.getColumnByCell)(table, cell);
        if (column) {
          table.$emit('cell-' + name, row, column, cell, event);
        }
      }
      table.$emit('row-' + name, row, event, column);
    },
    handleExpandClick: function handleExpandClick(row, e) {
      e.stopPropagation();
      this.store.toggleRowExpansion(row);
    }
  }
};

/***/ }),

/***/ 486:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_table_item_vue__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_table_item_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_table_item_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_table_item_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_table_item_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_adaea722_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_table_item_vue__ = __webpack_require__(487);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_table_item_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_adaea722_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_table_item_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 487:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"cell el-form-item",class:[{
    'el-form-item--feedback': _vm.elForm && _vm.elForm.statusIcon,
    'is-error': _vm.validateState === 'error',
    'is-validating': _vm.validateState === 'validating',
    'is-success': _vm.validateState === 'success',
    'is-required': _vm.isRequired || _vm.required
  },
  _vm.sizeClass ? 'el-form-item--' + _vm.sizeClass : ''
]},[_vm._t("default")],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ 488:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _dom = __webpack_require__(2);

var _checkbox = __webpack_require__(11);

var _checkbox2 = _interopRequireDefault(_checkbox);

var _tag = __webpack_require__(19);

var _tag2 = _interopRequireDefault(_tag);

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _filterPanel = __webpack_require__(489);

var _filterPanel2 = _interopRequireDefault(_filterPanel);

var _layoutObserver = __webpack_require__(49);

var _layoutObserver2 = _interopRequireDefault(_layoutObserver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllColumns = function getAllColumns(columns) {
  var result = [];
  columns.forEach(function (column) {
    if (column.children) {
      result.push(column);
      result.push.apply(result, getAllColumns(column.children));
    } else {
      result.push(column);
    }
  });
  return result;
};

var convertToRows = function convertToRows(originColumns) {
  var maxLevel = 1;
  var traverse = function traverse(column, parent) {
    if (parent) {
      column.level = parent.level + 1;
      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    }
    if (column.children) {
      var colSpan = 0;
      column.children.forEach(function (subColumn) {
        traverse(subColumn, column);
        colSpan += subColumn.colSpan;
      });
      column.colSpan = colSpan;
    } else {
      column.colSpan = 1;
    }
  };

  originColumns.forEach(function (column) {
    column.level = 1;
    traverse(column);
  });

  var rows = [];
  for (var i = 0; i < maxLevel; i++) {
    rows.push([]);
  }

  var allColumns = getAllColumns(originColumns);

  allColumns.forEach(function (column) {
    if (!column.children) {
      column.rowSpan = maxLevel - column.level + 1;
    } else {
      column.rowSpan = 1;
    }
    rows[column.level - 1].push(column);
  });

  return rows;
};

exports.default = {
  name: 'ElTableHeader',

  mixins: [_layoutObserver2.default],

  render: function render(h) {
    var _this = this;

    var originColumns = this.store.states.originColumns;
    var columnRows = convertToRows(originColumns, this.columns);
    // 是否拥有多级表头
    var isGroup = columnRows.length > 1;
    if (isGroup) this.$parent.isGroup = true;
    return h(
      'table',
      {
        'class': 'el-table__header',
        attrs: { cellspacing: '0',
          cellpadding: '0',
          border: '0' }
      },
      [h(
        'colgroup',
        null,
        [this._l(this.columns, function (column) {
          return h(
            'col',
            {
              attrs: { name: column.id }
            },
            []
          );
        }), this.hasGutter ? h(
          'col',
          {
            attrs: { name: 'gutter' }
          },
          []
        ) : '']
      ), h(
        'thead',
        { 'class': [{ 'is-group': isGroup, 'has-gutter': this.hasGutter }] },
        [this._l(columnRows, function (columns, rowIndex) {
          return h(
            'tr',
            {
              style: _this.getHeaderRowStyle(rowIndex),
              'class': _this.getHeaderRowClass(rowIndex)
            },
            [_this._l(columns, function (column, cellIndex) {
              return h(
                'th',
                {
                  attrs: {
                    colspan: column.colSpan,
                    rowspan: column.rowSpan
                  },
                  on: {
                    'mousemove': function mousemove($event) {
                      return _this.handleMouseMove($event, column);
                    },
                    'mouseout': _this.handleMouseOut,
                    'mousedown': function mousedown($event) {
                      return _this.handleMouseDown($event, column);
                    },
                    'click': function click($event) {
                      return _this.handleHeaderClick($event, column);
                    },
                    'contextmenu': function contextmenu($event) {
                      return _this.handleHeaderContextMenu($event, column);
                    }
                  },

                  style: _this.getHeaderCellStyle(rowIndex, cellIndex, columns, column),
                  'class': _this.getHeaderCellClass(rowIndex, cellIndex, columns, column) },
                [h(
                  'div',
                  { 'class': ['cell', column.filteredValue && column.filteredValue.length > 0 ? 'highlight' : '', column.labelClassName] },
                  [column.renderHeader ? column.renderHeader.call(_this._renderProxy, h, { column: column, $index: cellIndex, store: _this.store, _self: _this.$parent.$vnode.context }) : column.label, column.sortable ? h(
                    'span',
                    { 'class': 'caret-wrapper', on: {
                        'click': function click($event) {
                          return _this.handleSortClick($event, column);
                        }
                      }
                    },
                    [h(
                      'i',
                      { 'class': 'sort-caret ascending', on: {
                          'click': function click($event) {
                            return _this.handleSortClick($event, column, 'ascending');
                          }
                        }
                      },
                      []
                    ), h(
                      'i',
                      { 'class': 'sort-caret descending', on: {
                          'click': function click($event) {
                            return _this.handleSortClick($event, column, 'descending');
                          }
                        }
                      },
                      []
                    )]
                  ) : '', column.filterable ? h(
                    'span',
                    { 'class': 'el-table__column-filter-trigger', on: {
                        'click': function click($event) {
                          return _this.handleFilterClick($event, column);
                        }
                      }
                    },
                    [h(
                      'i',
                      { 'class': ['el-icon-arrow-down', column.filterOpened ? 'el-icon-arrow-up' : ''] },
                      []
                    )]
                  ) : '']
                )]
              );
            }), _this.hasGutter ? h(
              'th',
              { 'class': 'gutter' },
              []
            ) : '']
          );
        })]
      )]
    );
  },


  props: {
    fixed: String,
    store: {
      required: true
    },
    border: Boolean,
    defaultSort: {
      type: Object,
      default: function _default() {
        return {
          prop: '',
          order: ''
        };
      }
    }
  },

  components: {
    ElCheckbox: _checkbox2.default,
    ElTag: _tag2.default
  },

  computed: {
    table: function table() {
      return this.$parent;
    },
    isAllSelected: function isAllSelected() {
      return this.store.states.isAllSelected;
    },
    columnsCount: function columnsCount() {
      return this.store.states.columns.length;
    },
    leftFixedCount: function leftFixedCount() {
      return this.store.states.fixedColumns.length;
    },
    rightFixedCount: function rightFixedCount() {
      return this.store.states.rightFixedColumns.length;
    },
    leftFixedLeafCount: function leftFixedLeafCount() {
      return this.store.states.fixedLeafColumnsLength;
    },
    rightFixedLeafCount: function rightFixedLeafCount() {
      return this.store.states.rightFixedLeafColumnsLength;
    },
    columns: function columns() {
      return this.store.states.columns;
    },
    hasGutter: function hasGutter() {
      return !this.fixed && this.tableLayout.gutterWidth;
    }
  },

  created: function created() {
    this.filterPanels = {};
  },
  mounted: function mounted() {
    var _this2 = this;

    if (this.defaultSort.prop) {
      (function () {
        var states = _this2.store.states;
        states.sortProp = _this2.defaultSort.prop;
        states.sortOrder = _this2.defaultSort.order || 'ascending';
        _this2.$nextTick(function (_) {
          for (var i = 0, length = _this2.columns.length; i < length; i++) {
            var column = _this2.columns[i];
            if (column.property === states.sortProp) {
              column.order = states.sortOrder;
              states.sortingColumn = column;
              break;
            }
          }

          if (states.sortingColumn) {
            _this2.store.commit('changeSortCondition');
          }
        });
      })();
    }
  },
  beforeDestroy: function beforeDestroy() {
    var panels = this.filterPanels;
    for (var prop in panels) {
      if (panels.hasOwnProperty(prop) && panels[prop]) {
        panels[prop].$destroy(true);
      }
    }
  },


  methods: {
    isCellHidden: function isCellHidden(index, columns) {
      var start = 0;
      for (var i = 0; i < index; i++) {
        start += columns[i].colSpan;
      }
      var after = start + columns[index].colSpan - 1;
      if (this.fixed === true || this.fixed === 'left') {
        return after >= this.leftFixedLeafCount;
      } else if (this.fixed === 'right') {
        return start < this.columnsCount - this.rightFixedLeafCount;
      } else {
        return after < this.leftFixedLeafCount || start >= this.columnsCount - this.rightFixedLeafCount;
      }
    },
    getHeaderRowStyle: function getHeaderRowStyle(rowIndex) {
      var headerRowStyle = this.table.headerRowStyle;
      if (typeof headerRowStyle === 'function') {
        return headerRowStyle.call(null, { rowIndex: rowIndex });
      }
      return headerRowStyle;
    },
    getHeaderRowClass: function getHeaderRowClass(rowIndex) {
      var classes = [];

      var headerRowClassName = this.table.headerRowClassName;
      if (typeof headerRowClassName === 'string') {
        classes.push(headerRowClassName);
      } else if (typeof headerRowClassName === 'function') {
        classes.push(headerRowClassName.call(null, { rowIndex: rowIndex }));
      }

      return classes.join(' ');
    },
    getHeaderCellStyle: function getHeaderCellStyle(rowIndex, columnIndex, row, column) {
      var headerCellStyle = this.table.headerCellStyle;
      if (typeof headerCellStyle === 'function') {
        return headerCellStyle.call(null, {
          rowIndex: rowIndex,
          columnIndex: columnIndex,
          row: row,
          column: column
        });
      }
      return headerCellStyle;
    },
    getHeaderCellClass: function getHeaderCellClass(rowIndex, columnIndex, row, column) {
      var classes = [column.id, column.order, column.headerAlign, column.className, column.labelClassName];

      if (rowIndex === 0 && this.isCellHidden(columnIndex, row)) {
        classes.push('is-hidden');
      }

      if (!column.children) {
        classes.push('is-leaf');
      }

      if (column.sortable) {
        classes.push('is-sortable');
      }

      var headerCellClassName = this.table.headerCellClassName;
      if (typeof headerCellClassName === 'string') {
        classes.push(headerCellClassName);
      } else if (typeof headerCellClassName === 'function') {
        classes.push(headerCellClassName.call(null, {
          rowIndex: rowIndex,
          columnIndex: columnIndex,
          row: row,
          column: column
        }));
      }

      return classes.join(' ');
    },
    toggleAllSelection: function toggleAllSelection() {
      this.store.commit('toggleAllSelection');
    },
    handleFilterClick: function handleFilterClick(event, column) {
      event.stopPropagation();
      var target = event.target;
      var cell = target.parentNode;
      var table = this.$parent;

      var filterPanel = this.filterPanels[column.id];

      if (filterPanel && column.filterOpened) {
        filterPanel.showPopper = false;
        return;
      }

      if (!filterPanel) {
        filterPanel = new _vue2.default(_filterPanel2.default);
        this.filterPanels[column.id] = filterPanel;
        if (column.filterPlacement) {
          filterPanel.placement = column.filterPlacement;
        }
        filterPanel.table = table;
        filterPanel.cell = cell;
        filterPanel.column = column;
        !this.$isServer && filterPanel.$mount(document.createElement('div'));
      }

      setTimeout(function () {
        filterPanel.showPopper = true;
      }, 16);
    },
    handleHeaderClick: function handleHeaderClick(event, column) {
      if (!column.filters && column.sortable) {
        this.handleSortClick(event, column);
      } else if (column.filters && !column.sortable) {
        this.handleFilterClick(event, column);
      }

      this.$parent.$emit('header-click', column, event);
    },
    handleHeaderContextMenu: function handleHeaderContextMenu(event, column) {
      this.$parent.$emit('header-contextmenu', column, event);
    },
    handleMouseDown: function handleMouseDown(event, column) {
      var _this3 = this;

      if (this.$isServer) return;
      if (column.children && column.children.length > 0) return;
      /* istanbul ignore if */
      if (this.draggingColumn && this.border) {
        (function () {
          _this3.dragging = true;

          _this3.$parent.resizeProxyVisible = true;

          var table = _this3.$parent;
          var tableEl = table.$el;
          var tableLeft = tableEl.getBoundingClientRect().left;
          var columnEl = _this3.$el.querySelector('th.' + column.id);
          var columnRect = columnEl.getBoundingClientRect();
          var minLeft = columnRect.left - tableLeft + 30;

          (0, _dom.addClass)(columnEl, 'noclick');

          _this3.dragState = {
            startMouseLeft: event.clientX,
            startLeft: columnRect.right - tableLeft,
            startColumnLeft: columnRect.left - tableLeft,
            tableLeft: tableLeft
          };

          var resizeProxy = table.$refs.resizeProxy;
          resizeProxy.style.left = _this3.dragState.startLeft + 'px';

          document.onselectstart = function () {
            return false;
          };
          document.ondragstart = function () {
            return false;
          };

          var handleMouseMove = function handleMouseMove(event) {
            var deltaLeft = event.clientX - _this3.dragState.startMouseLeft;
            var proxyLeft = _this3.dragState.startLeft + deltaLeft;

            resizeProxy.style.left = Math.max(minLeft, proxyLeft) + 'px';
          };

          var handleMouseUp = function handleMouseUp() {
            if (_this3.dragging) {
              var _dragState = _this3.dragState,
                  startColumnLeft = _dragState.startColumnLeft,
                  startLeft = _dragState.startLeft;

              var finalLeft = parseInt(resizeProxy.style.left, 10);
              var columnWidth = finalLeft - startColumnLeft;
              column.width = column.realWidth = columnWidth;
              table.$emit('header-dragend', column.width, startLeft - startColumnLeft, column, event);

              _this3.store.scheduleLayout();

              document.body.style.cursor = '';
              _this3.dragging = false;
              _this3.draggingColumn = null;
              _this3.dragState = {};

              table.resizeProxyVisible = false;
            }

            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.onselectstart = null;
            document.ondragstart = null;

            setTimeout(function () {
              (0, _dom.removeClass)(columnEl, 'noclick');
            }, 0);
          };

          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
        })();
      }
    },
    handleMouseMove: function handleMouseMove(event, column) {
      if (column.children && column.children.length > 0) return;
      var target = event.target;
      while (target && target.tagName !== 'TH') {
        target = target.parentNode;
      }

      if (!column || !column.resizable) return;

      if (!this.dragging && this.border) {
        var rect = target.getBoundingClientRect();

        var bodyStyle = document.body.style;
        if (rect.width > 12 && rect.right - event.pageX < 8) {
          bodyStyle.cursor = 'col-resize';
          if ((0, _dom.hasClass)(target, 'is-sortable')) {
            target.style.cursor = 'col-resize';
          }
          this.draggingColumn = column;
        } else if (!this.dragging) {
          bodyStyle.cursor = '';
          if ((0, _dom.hasClass)(target, 'is-sortable')) {
            target.style.cursor = 'pointer';
          }
          this.draggingColumn = null;
        }
      }
    },
    handleMouseOut: function handleMouseOut() {
      if (this.$isServer) return;
      document.body.style.cursor = '';
    },
    toggleOrder: function toggleOrder(order) {
      return !order ? 'ascending' : order === 'ascending' ? 'descending' : null;
    },
    handleSortClick: function handleSortClick(event, column, givenOrder) {
      event.stopPropagation();
      var order = givenOrder || this.toggleOrder(column.order);

      var target = event.target;
      while (target && target.tagName !== 'TH') {
        target = target.parentNode;
      }

      if (target && target.tagName === 'TH') {
        if ((0, _dom.hasClass)(target, 'noclick')) {
          (0, _dom.removeClass)(target, 'noclick');
          return;
        }
      }

      if (!column.sortable) return;

      var states = this.store.states;
      var sortProp = states.sortProp;
      var sortOrder = void 0;
      var sortingColumn = states.sortingColumn;

      if (sortingColumn !== column || sortingColumn === column && sortingColumn.order === null) {
        if (sortingColumn) {
          sortingColumn.order = null;
        }
        states.sortingColumn = column;
        sortProp = column.property;
      }

      if (!order) {
        sortOrder = column.order = null;
        states.sortingColumn = null;
        sortProp = null;
      } else {
        sortOrder = column.order = order;
      }

      states.sortProp = sortProp;
      states.sortOrder = sortOrder;

      this.store.commit('changeSortCondition');
    }
  },

  data: function data() {
    return {
      draggingColumn: null,
      dragging: false,
      dragState: {}
    };
  }
};

/***/ }),

/***/ 489:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_filter_panel_vue__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_filter_panel_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_filter_panel_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_filter_panel_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_filter_panel_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_044cf2a0_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_filter_panel_vue__ = __webpack_require__(491);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_filter_panel_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_044cf2a0_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_filter_panel_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = {
  created: function created() {
    this.tableLayout.addObserver(this);
  },
  destroyed: function destroyed() {
    this.tableLayout.removeObserver(this);
  },


  computed: {
    tableLayout: function tableLayout() {
      var layout = this.layout;
      if (!layout && this.table) {
        layout = this.table.layout;
      }
      if (!layout) {
        throw new Error('Can not find table layout.');
      }
      return layout;
    }
  },

  mounted: function mounted() {
    this.onColumnsChange(this.tableLayout);
    this.onScrollableChange(this.tableLayout);
  },
  updated: function updated() {
    if (this.__updated__) return;
    this.onColumnsChange(this.tableLayout);
    this.onScrollableChange(this.tableLayout);
    this.__updated__ = true;
  },


  methods: {
    onColumnsChange: function onColumnsChange() {
      var cols = this.$el.querySelectorAll('colgroup > col');
      if (!cols.length) return;
      var flattenColumns = this.tableLayout.getFlattenColumns();
      var columnsMap = {};
      flattenColumns.forEach(function (column) {
        columnsMap[column.id] = column;
      });
      for (var i = 0, j = cols.length; i < j; i++) {
        var col = cols[i];
        var name = col.getAttribute('name');
        var column = columnsMap[name];
        if (column) {
          col.setAttribute('width', column.realWidth || column.width);
        }
      }
    },
    onScrollableChange: function onScrollableChange(layout) {
      var cols = this.$el.querySelectorAll('colgroup > col[name=gutter]');
      for (var i = 0, j = cols.length; i < j; i++) {
        var col = cols[i];
        col.setAttribute('width', layout.scrollY ? layout.gutterWidth : '0');
      }
      var ths = this.$el.querySelectorAll('th.gutter');
      for (var _i = 0, _j = ths.length; _i < _j; _i++) {
        var th = ths[_i];
        th.style.width = layout.scrollY ? layout.gutterWidth + 'px' : '0';
        th.style.display = layout.scrollY ? '' : 'none';
      }
    }
  }
};

/***/ }),

/***/ 490:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dropdowns = [];

!_vue2.default.prototype.$isServer && document.addEventListener('click', function (event) {
  dropdowns.forEach(function (dropdown) {
    var target = event.target;
    if (!dropdown || !dropdown.$el) return;
    if (target === dropdown.$el || dropdown.$el.contains(target)) {
      return;
    }
    dropdown.handleOutsideClick && dropdown.handleOutsideClick(event);
  });
});

exports.default = {
  open: function open(instance) {
    if (instance) {
      dropdowns.push(instance);
    }
  },
  close: function close(instance) {
    var index = dropdowns.indexOf(instance);
    if (index !== -1) {
      dropdowns.splice(instance, 1);
    }
  }
};

/***/ }),

/***/ 491:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"el-zoom-in-top"}},[(_vm.multiple)?_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.showPopper),expression:"showPopper"}],staticClass:"el-table-filter"},[_c('div',{staticClass:"el-table-filter__content"},[_c('el-checkbox-group',{staticClass:"el-table-filter__checkbox-group",model:{value:(_vm.filteredValue),callback:function ($$v) {_vm.filteredValue=$$v},expression:"filteredValue"}},_vm._l((_vm.filters),function(filter){return _c('el-checkbox',{key:filter.value,attrs:{"label":filter.value}},[_vm._v(_vm._s(filter.text))])}))],1),_c('div',{staticClass:"el-table-filter__bottom"},[_c('button',{class:{ 'is-disabled': _vm.filteredValue.length === 0 },attrs:{"disabled":_vm.filteredValue.length === 0},on:{"click":_vm.handleConfirm}},[_vm._v(_vm._s(_vm.t('el.table.confirmFilter')))]),_c('button',{on:{"click":_vm.handleReset}},[_vm._v(_vm._s(_vm.t('el.table.resetFilter')))])])]):_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.showPopper),expression:"showPopper"}],staticClass:"el-table-filter"},[_c('ul',{staticClass:"el-table-filter__list"},[_c('li',{staticClass:"el-table-filter__list-item",class:{ 'is-active': _vm.filterValue === undefined || _vm.filterValue === null },on:{"click":function($event){_vm.handleSelect(null)}}},[_vm._v(_vm._s(_vm.t('el.table.clearFilter')))]),_vm._l((_vm.filters),function(filter){return _c('li',{key:filter.value,staticClass:"el-table-filter__list-item",class:{ 'is-active': _vm.isActive(filter) },attrs:{"label":filter.value},on:{"click":function($event){_vm.handleSelect(filter.value)}}},[_vm._v(_vm._s(filter.text))])})],2)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ 492:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _layoutObserver = __webpack_require__(49);

var _layoutObserver2 = _interopRequireDefault(_layoutObserver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'ElTableFooter',

  mixins: [_layoutObserver2.default],

  render: function render(h) {
    var _this = this;

    var sums = [];
    this.columns.forEach(function (column, index) {
      if (index === 0) {
        sums[index] = _this.sumText;
        return;
      }
      var values = _this.store.states.data.map(function (item) {
        return Number(item[column.property]);
      });
      var precisions = [];
      var notNumber = true;
      values.forEach(function (value) {
        if (!isNaN(value)) {
          notNumber = false;
          var decimal = ('' + value).split('.')[1];
          precisions.push(decimal ? decimal.length : 0);
        }
      });
      var precision = Math.max.apply(null, precisions);
      if (!notNumber) {
        sums[index] = values.reduce(function (prev, curr) {
          var value = Number(curr);
          if (!isNaN(value)) {
            return parseFloat((prev + curr).toFixed(Math.min(precision, 20)));
          } else {
            return prev;
          }
        }, 0);
      } else {
        sums[index] = '';
      }
    });

    return h(
      'table',
      {
        'class': 'el-table__footer',
        attrs: { cellspacing: '0',
          cellpadding: '0',
          border: '0' }
      },
      [h(
        'colgroup',
        null,
        [this._l(this.columns, function (column) {
          return h(
            'col',
            {
              attrs: { name: column.id }
            },
            []
          );
        }), this.hasGutter ? h(
          'col',
          {
            attrs: { name: 'gutter' }
          },
          []
        ) : '']
      ), h(
        'tbody',
        { 'class': [{ 'has-gutter': this.hasGutter }] },
        [h(
          'tr',
          null,
          [this._l(this.columns, function (column, cellIndex) {
            return h(
              'td',
              {
                attrs: {
                  colspan: column.colSpan,
                  rowspan: column.rowSpan
                },
                'class': [column.id, column.headerAlign, column.className || '', _this.isCellHidden(cellIndex, _this.columns) ? 'is-hidden' : '', !column.children ? 'is-leaf' : '', column.labelClassName] },
              [h(
                'div',
                { 'class': ['cell', column.labelClassName] },
                [_this.summaryMethod ? _this.summaryMethod({ columns: _this.columns, data: _this.store.states.data })[cellIndex] : sums[cellIndex]]
              )]
            );
          }), this.hasGutter ? h(
            'th',
            { 'class': 'gutter' },
            []
          ) : '']
        )]
      )]
    );
  },


  props: {
    fixed: String,
    store: {
      required: true
    },
    summaryMethod: Function,
    sumText: String,
    border: Boolean,
    defaultSort: {
      type: Object,
      default: function _default() {
        return {
          prop: '',
          order: ''
        };
      }
    }
  },

  computed: {
    table: function table() {
      return this.$parent;
    },
    isAllSelected: function isAllSelected() {
      return this.store.states.isAllSelected;
    },
    columnsCount: function columnsCount() {
      return this.store.states.columns.length;
    },
    leftFixedCount: function leftFixedCount() {
      return this.store.states.fixedColumns.length;
    },
    rightFixedCount: function rightFixedCount() {
      return this.store.states.rightFixedColumns.length;
    },
    columns: function columns() {
      return this.store.states.columns;
    },
    hasGutter: function hasGutter() {
      return !this.fixed && this.tableLayout.gutterWidth;
    }
  },

  methods: {
    isCellHidden: function isCellHidden(index, columns) {
      if (this.fixed === true || this.fixed === 'left') {
        return index >= this.leftFixedCount;
      } else if (this.fixed === 'right') {
        var before = 0;
        for (var i = 0; i < index; i++) {
          before += columns[i].colSpan;
        }
        return before < this.columnsCount - this.rightFixedCount;
      } else {
        return index < this.leftFixedCount || index >= this.columnsCount - this.rightFixedCount;
      }
    }
  }
};

/***/ }),

/***/ 493:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"wrap-table"},[_c('span',{staticClass:"total-err",domProps:{"textContent":_vm._s(_vm.errTotal)}}),_c('div',{staticClass:"el-form-table el-table",class:[{
      'el-table--fit': _vm.fit,
      'el-table--striped': _vm.stripe,
      'el-table--border': _vm.border || _vm.isGroup,
      'el-table--hidden': _vm.isHidden,
      'el-table--group': _vm.isGroup,
      'el-table--fluid-height': _vm.maxHeight,
      'el-table--scrollable-x': _vm.layout.scrollX,
      'el-table--scrollable-y': _vm.layout.scrollY,
      'el-table--enable-row-hover': !_vm.store.states.isComplex,
      'el-table--enable-row-transition': (_vm.store.states.data || []).length !== 0 && (_vm.store.states.data || []).length < 100
    }, _vm.tableSize ? ("el-table--" + _vm.tableSize) : ''],on:{"mouseleave":function($event){_vm.handleMouseLeave($event)}}},[_c('div',{ref:"hiddenColumns",staticClass:"hidden-columns"},[_vm._t("default")],2),(_vm.showHeader)?_c('div',{directives:[{name:"mousewheel",rawName:"v-mousewheel",value:(_vm.handleHeaderFooterMousewheel),expression:"handleHeaderFooterMousewheel"}],ref:"headerWrapper",staticClass:"el-table__header-wrapper"},[_c('table-header',{ref:"tableHeader",style:({
          width: _vm.layout.bodyWidth ? _vm.layout.bodyWidth + 'px' : ''
        }),attrs:{"store":_vm.store,"border":_vm.border,"default-sort":_vm.defaultSort}})],1):_vm._e(),_c('div',{ref:"bodyWrapper",staticClass:"el-table__body-wrapper",class:[_vm.layout.scrollX ? ("is-scrolling-" + _vm.scrollPosition) : 'is-scrolling-none'],style:([_vm.bodyHeight])},[_c('table-body',{style:({
           width: _vm.bodyWidth
        }),attrs:{"context":_vm.context,"store":_vm.store,"stripe":_vm.stripe,"row-class-name":_vm.rowClassName,"row-style":_vm.rowStyle,"highlight":_vm.highlightCurrentRow}}),(!_vm.data || _vm.data.length === 0)?_c('div',{ref:"emptyBlock",staticClass:"el-table__empty-block",style:({
          width: _vm.bodyWidth
        })},[_c('span',{staticClass:"el-table__empty-text"},[_vm._t("empty",[_vm._v(_vm._s(_vm.emptyText || _vm.t('el.table.emptyText')))])],2)]):_vm._e(),(_vm.$slots.append)?_c('div',{ref:"appendWrapper",staticClass:"el-table__append-wrapper"},[_vm._t("append")],2):_vm._e()],1),(_vm.showSummary)?_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.data && _vm.data.length > 0),expression:"data && data.length > 0"},{name:"mousewheel",rawName:"v-mousewheel",value:(_vm.handleHeaderFooterMousewheel),expression:"handleHeaderFooterMousewheel"}],ref:"footerWrapper",staticClass:"el-table__footer-wrapper"},[_c('table-footer',{style:({
          width: _vm.layout.bodyWidth ? _vm.layout.bodyWidth + 'px' : ''
        }),attrs:{"store":_vm.store,"border":_vm.border,"sum-text":_vm.sumText || _vm.t('el.table.sumText'),"summary-method":_vm.summaryMethod,"default-sort":_vm.defaultSort}})],1):_vm._e(),(_vm.fixedColumns.length > 0)?_c('div',{directives:[{name:"mousewheel",rawName:"v-mousewheel",value:(_vm.handleFixedMousewheel),expression:"handleFixedMousewheel"}],ref:"fixedWrapper",staticClass:"el-table__fixed",style:([{
        width: _vm.layout.fixedWidth ? _vm.layout.fixedWidth + 'px' : ''
      },
      _vm.fixedHeight])},[(_vm.showHeader)?_c('div',{ref:"fixedHeaderWrapper",staticClass:"el-table__fixed-header-wrapper"},[_c('table-header',{ref:"fixedTableHeader",style:({
            width: _vm.layout.fixedWidth ? _vm.layout.fixedWidth + 'px' : ''
          }),attrs:{"fixed":"left","border":_vm.border,"store":_vm.store}})],1):_vm._e(),_c('div',{ref:"fixedBodyWrapper",staticClass:"el-table__fixed-body-wrapper",style:([{
          top: _vm.layout.headerHeight + 'px'
        },
        _vm.fixedBodyHeight])},[_c('table-body',{style:({
            width: _vm.layout.fixedWidth ? _vm.layout.fixedWidth + 'px' : ''
          }),attrs:{"fixed":"left","store":_vm.store,"stripe":_vm.stripe,"highlight":_vm.highlightCurrentRow,"row-class-name":_vm.rowClassName,"row-style":_vm.rowStyle}}),(_vm.$slots.append)?_c('div',{staticClass:"el-table__append-gutter",style:({
            height: _vm.layout.appendHeight + 'px'
          })}):_vm._e()],1),(_vm.showSummary)?_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.data && _vm.data.length > 0),expression:"data && data.length > 0"}],ref:"fixedFooterWrapper",staticClass:"el-table__fixed-footer-wrapper"},[_c('table-footer',{style:({
            width: _vm.layout.fixedWidth ? _vm.layout.fixedWidth + 'px' : ''
          }),attrs:{"fixed":"left","border":_vm.border,"sum-text":_vm.sumText || _vm.t('el.table.sumText'),"summary-method":_vm.summaryMethod,"store":_vm.store}})],1):_vm._e()]):_vm._e(),(_vm.rightFixedColumns.length > 0)?_c('div',{directives:[{name:"mousewheel",rawName:"v-mousewheel",value:(_vm.handleFixedMousewheel),expression:"handleFixedMousewheel"}],ref:"rightFixedWrapper",staticClass:"el-table__fixed-right",style:([{
        width: _vm.layout.rightFixedWidth ? _vm.layout.rightFixedWidth + 'px' : '',
        right: _vm.layout.scrollY ? (_vm.border ? _vm.layout.gutterWidth : (_vm.layout.gutterWidth || 0)) + 'px' : ''
      },
      _vm.fixedHeight])},[(_vm.showHeader)?_c('div',{ref:"rightFixedHeaderWrapper",staticClass:"el-table__fixed-header-wrapper"},[_c('table-header',{ref:"rightFixedTableHeader",style:({
            width: _vm.layout.rightFixedWidth ? _vm.layout.rightFixedWidth + 'px' : ''
          }),attrs:{"fixed":"right","border":_vm.border,"store":_vm.store}})],1):_vm._e(),_c('div',{ref:"rightFixedBodyWrapper",staticClass:"el-table__fixed-body-wrapper",style:([{
          top: _vm.layout.headerHeight + 'px'
        },
        _vm.fixedBodyHeight])},[_c('table-body',{style:({
            width: _vm.layout.rightFixedWidth ? _vm.layout.rightFixedWidth + 'px' : ''
          }),attrs:{"fixed":"right","store":_vm.store,"stripe":_vm.stripe,"row-class-name":_vm.rowClassName,"row-style":_vm.rowStyle,"highlight":_vm.highlightCurrentRow}})],1),(_vm.showSummary)?_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.data && _vm.data.length > 0),expression:"data && data.length > 0"}],ref:"rightFixedFooterWrapper",staticClass:"el-table__fixed-footer-wrapper"},[_c('table-footer',{style:({
            width: _vm.layout.rightFixedWidth ? _vm.layout.rightFixedWidth + 'px' : ''
          }),attrs:{"fixed":"right","border":_vm.border,"sum-text":_vm.sumText || _vm.t('el.table.sumText'),"summary-method":_vm.summaryMethod,"store":_vm.store}})],1):_vm._e()]):_vm._e(),(_vm.rightFixedColumns.length > 0)?_c('div',{ref:"rightFixedPatch",staticClass:"el-table__fixed-right-patch",style:({
        width: _vm.layout.scrollY ? _vm.layout.gutterWidth + 'px' : '0',
        height: _vm.layout.headerHeight + 'px'
      })}):_vm._e(),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.resizeProxyVisible),expression:"resizeProxyVisible"}],ref:"resizeProxy",staticClass:"el-table__column-resize-proxy"})])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/mixins/locale");

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/utils/vue-popper");

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/mixins/migrating");

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/utils/merge");

/***/ })

/******/ });