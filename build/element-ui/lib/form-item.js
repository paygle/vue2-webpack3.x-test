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
/******/ 	return __webpack_require__(__webpack_require__.s = 314);
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

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/utils/dom");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/utils/util");

/***/ }),

/***/ 314:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(315);


/***/ }),

/***/ 315:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _formItem = __webpack_require__(316);

var _formItem2 = _interopRequireDefault(_formItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_formItem2.default.install = function (Vue) {
  Vue.component(_formItem2.default.name, _formItem2.default);
};

exports.default = _formItem2.default;

/***/ }),

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_form_item_vue__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_form_item_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_form_item_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_form_item_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_form_item_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_44300682_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_form_item_vue__ = __webpack_require__(317);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_form_item_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_44300682_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_form_item_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"el-form-item",class:[{
    'el-form-item--feedback': _vm.elForm && _vm.elForm.statusIcon,
    'is-error': _vm.validateState === 'error',
    'is-validating': _vm.validateState === 'validating',
    'is-success': _vm.validateState === 'success',
    'is-required': _vm.isRequired || _vm.required
  },
  _vm.sizeClass ? 'el-form-item--' + _vm.sizeClass : ''
]},[(_vm.label || _vm.$slots.label)?_c('label',{staticClass:"el-form-item__label",style:(_vm.labelStyle),attrs:{"for":_vm.labelFor}},[_vm._t("label",[_vm._v(_vm._s(_vm.label + _vm.form.labelSuffix))])],2):_vm._e(),_c('div',{staticClass:"el-form-item__content",style:(_vm.contentStyle)},[_vm._t("default"),_c('transition',{attrs:{"name":"el-zoom-in-top"}},[(_vm.validateState === 'error' && _vm.showMessage && _vm.form.showMessage)?_c('div',{staticClass:"el-form-item__error",class:{
          'el-form-item__error--inline': typeof _vm.inlineMessage === 'boolean'
            ? _vm.inlineMessage
            : (_vm.elForm && _vm.elForm.inlineMessage || false)
        }},[_vm._v("\n        "+_vm._s(_vm.validateMessage)+"\n      ")]):_vm._e()])],2)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ 46:
/***/ (function(module, exports) {

module.exports = require("async-validator");

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/utils/merge");

/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _asyncValidator = __webpack_require__(46);

var _asyncValidator2 = _interopRequireDefault(_asyncValidator);

var _emitter = __webpack_require__(1);

var _emitter2 = _interopRequireDefault(_emitter);

var _merge = __webpack_require__(9);

var _merge2 = _interopRequireDefault(_merge);

var _util = __webpack_require__(3);

var _dom = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 扩展

exports.default = {
  name: 'ElFormItem',

  componentName: 'ElFormItem',

  mixins: [_emitter2.default],

  provide: function provide() {
    return {
      elFormItem: this
    };
  },


  inject: ['elForm'],

  props: {
    model: Object, // ext->非数据联验证-数据对象
    value: null, // ext-> 非数据联验证的非Object类型的值
    scopeName: String, // ext-> 表单所属域名称与 form 的 scopeName 一致
    label: String,
    labelWidth: String,
    prop: String, // 验证规则里面对应的属性
    required: {
      type: Boolean,
      default: undefined
    },
    rules: [Object, Array],
    error: String,
    validateStatus: String,
    for: String,
    inlineMessage: {
      type: [String, Boolean],
      default: ''
    },
    showMessage: {
      type: Boolean,
      default: true
    },
    size: String
  },
  watch: {
    error: {
      immediate: true,
      handler: function handler(value) {
        this.validateMessage = value;
        this.validateState = value ? 'error' : '';
      }
    },
    validateStatus: function validateStatus(value) {
      this.validateState = value;
    }
  },
  computed: {
    scopeNamed: function scopeNamed() {
      // ext-> 表单作用域
      return this.scopeName || 'ElForm';
    },
    showInlineMsg: function showInlineMsg() {
      // ext-> 弹出提示控制
      return this.showMessage && this.form.showMessage;
    },
    labelFor: function labelFor() {
      return this.for || this.prop;
    },
    labelStyle: function labelStyle() {
      var ret = {};
      if (this.form.labelPosition === 'top') return ret;
      var labelWidth = this.labelWidth || this.form.labelWidth;
      if (labelWidth) {
        ret.width = labelWidth;
      }
      return ret;
    },
    contentStyle: function contentStyle() {
      var ret = {};
      var label = this.label;
      if (this.form.labelPosition === 'top' || this.form.inline) return ret;
      if (!label && !this.labelWidth && this.isNested) return ret;
      var labelWidth = this.labelWidth || this.form.labelWidth;
      if (labelWidth) {
        ret.marginLeft = labelWidth;
      }
      return ret;
    },
    form: function form() {
      var parent = this.$parent;
      var parentName = parent.$options.componentName;
      while (parentName !== 'ElForm') {
        if (parentName === 'ElFormItem') {
          this.isNested = true;
        }
        parent = parent.$parent;
        parentName = parent.$options.componentName;
      }
      return parent;
    },

    fieldValue: {
      cache: false,
      get: function get() {
        var model = this.model || this.form.model; // ext-> modify
        if (!model || !this.prop) {
          return;
        }

        var path = this.prop;
        if (path.indexOf(':') !== -1) {
          path = path.replace(/:/, '.');
        }
        if (typeof this.value !== 'undefined') {
          return this.value; // ext-> modify
        } else {
          // ext-> modify
          return (0, _util.getPropByPath)(model, path, true).v;
        }
      }
    },
    isRequired: function isRequired() {
      var rules = this.getRules();
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
      isNested: false,
      IS_SHOW_TIPS: false, // ext-> 默认禁用 tooltip功能
      TIP_POP_WIDTH: 0,
      tipContent: '', // ext-> tooltip内容
      tipTimeHander: null, // 扩展
      tipsDom: null // 扩展
    };
  },

  methods: {
    validate: function validate(trigger) {
      var _this = this;

      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _util.noop;

      this.validateDisabled = false;
      var rules = this.getFilteredRule(trigger);
      if ((!rules || rules.length === 0) && this.required === undefined) {
        callback();
        return true;
      }

      this.validateState = 'validating';

      var descriptor = {};
      if (rules && rules.length > 0) {
        rules.forEach(function (rule) {
          delete rule.trigger;
        });
      }
      descriptor[this.prop] = rules;

      var validator = new _asyncValidator2.default(descriptor);
      var model = {};

      model[this.prop] = this.fieldValue;

      validator.validate(model, { firstFields: true }, function (errors, fields) {
        _this.validateState = !errors ? 'success' : 'error';
        _this.validateMessage = errors ? errors[0].message : '';

        callback(_this.validateMessage);
        if (errors) _this.tipContent = _this.validateMessage; // ext-> 设置错误信息
      });
    },
    clearValidate: function clearValidate() {
      this.validateState = '';
      this.validateMessage = '';
      this.validateDisabled = false;
    },
    resetField: function resetField() {
      this.validateState = '';
      this.validateMessage = '';

      var model = this.model || this.form.model; // ext-> modify
      var value = this.fieldValue;
      var path = this.prop;
      var prop = void 0; // ext-> modify

      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.');
      }

      if ((0, _util.typeOf)(model) === 'Object') {
        // ext-> modify
        prop = (0, _util.getPropByPath)(model, path, true);
      }

      if (Array.isArray(value)) {
        this.validateDisabled = true;
        if (typeof this.value !== 'undefined') {
          // ext-> modify
          this.$emit('input', [].concat(this.initialValue));
        } else if (prop) {
          prop.o[prop.k] = [].concat(this.initialValue);
        }
      } else {
        this.validateDisabled = true;
        if (typeof this.value !== 'undefined') {
          // ext-> modify
          this.$emit('input', this.initialValue);
        } else if (prop) {
          prop.o[prop.k] = this.initialValue;
        }
      }
    },
    getRules: function getRules() {
      var formRules = this.form.rules;
      var selfRules = this.rules;
      var requiredRule = this.required !== undefined ? { required: !!this.required } : [];

      formRules = formRules ? (0, _util.getPropByPath)(formRules, this.prop || '').o[this.prop || ''] : [];

      return [].concat(selfRules || formRules || []).concat(requiredRule);
    },
    getFilteredRule: function getFilteredRule(trigger) {
      var rules = this.getRules();

      return rules.filter(function (rule) {
        return !rule.trigger || rule.trigger.indexOf(trigger) !== -1;
      }).map(function (rule) {
        return (0, _merge2.default)({}, rule);
      });
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

      if (this.form.disabledTips) return; // 禁用表单溢出和验证弹窗提示
      if (this.showInlineMsg && this.validateState === 'error') return;

      var pos = void 0,
          gapw = void 0,
          style = void 0,
          color = '',
          that = this;
      var inputEl = this.$el.querySelector('input') || this.$el.querySelector('textarea');
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
      if (this.form.disabledTips) return; // 禁用表单溢出和验证弹窗提示
      if (this.showInlineMsg && this.validateState === 'error') return;

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

    // ext-> 计算组件除padding的宽度
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

    // ext-> 计算文本宽度
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

    // ext-> 获取tip动态配置
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
    if (this.prop) {
      this.dispatch(this.scopeNamed, 'el.form.addField', [this]); // ext-> modify

      var initialValue = this.fieldValue;
      if (Array.isArray(initialValue)) {
        initialValue = [].concat(initialValue);
      }
      Object.defineProperty(this, 'initialValue', {
        value: initialValue
      });

      var rules = this.getRules();

      if (rules.length || this.required !== undefined) {
        this.$on('el.form.blur', this.onFieldBlur);
        this.$on('el.form.change', this.onFieldChange);
      }
    }
    this.$on('el.form.mouseover', this.inputMouseover); // ext-> 表单组件 mouseover 事件
    this.$on('el.form.mouseout', this.inputMouseout); // ext-> 表单组件 mouseout 事件
    this.$on('el.form.messagetips', this.setTipContent); // ext-> 弹出信息内容填充
  },
  beforeDestroy: function beforeDestroy() {
    this.dispatch(this.scopeNamed, 'el.form.removeField', [this]); // ext-> modify
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

/***/ })

/******/ });