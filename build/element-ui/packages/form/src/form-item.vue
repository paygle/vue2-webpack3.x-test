<template>
  <div class="el-form-item" :class="[{
      'el-form-item--feedback': elForm && elForm.statusIcon,
      'is-error': validateState === 'error',
      'is-validating': validateState === 'validating',
      'is-success': validateState === 'success',
      'is-required': isRequired || required
    },
    sizeClass ? 'el-form-item--' + sizeClass : ''
  ]">
    <label :for="labelFor" class="el-form-item__label" v-bind:style="labelStyle" v-if="label || $slots.label">
      <slot name="label">{{label + form.labelSuffix}}</slot>
    </label>
    <div class="el-form-item__content" v-bind:style="contentStyle">
      <slot></slot>
      <transition name="el-zoom-in-top">
        <div
          v-if="validateState === 'error' && showMessage && form.showMessage"
          class="el-form-item__error"
          :class="{
            'el-form-item__error--inline': typeof inlineMessage === 'boolean'
              ? inlineMessage
              : (elForm && elForm.inlineMessage || false)
          }"
        >
          {{validateMessage}}
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
  import AsyncValidator from 'async-validator';
  import emitter from 'element-ui/src/mixins/emitter';
  import objectAssign from 'element-ui/src/utils/merge';
  import { noop, getPropByPath, typeOf } from 'element-ui/src/utils/util';
  import { createDomElement } from 'element-ui/src/utils/dom'; // 扩展

  // ext-> 自定义日期兼容转换
  const compatDateStr = function(date) {
    return typeof date === 'string' ? String(date).replace('-', '/') : date;
  };

  export default {
    name: 'ElFormItem',

    componentName: 'ElFormItem',

    mixins: [emitter],

    provide() {
      return {
        elFormItem: this
      };
    },

    inject: ['elForm'],

    props: {
      model: Object, // ext-> 非数据联验证-数据对象
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
        handler(value) {
          this.validateMessage = value;
          this.validateState = value ? 'error' : '';
        }
      },
      validateStatus(value) {
        this.validateState = value;
      }
    },
    computed: {
      labelFor() {
        return this.for || this.prop;
      },
      labelStyle() {
        const ret = {};
        if (this.form.labelPosition === 'top') return ret;
        const labelWidth = this.labelWidth || this.form.labelWidth;
        if (labelWidth) {
          ret.width = labelWidth;
        }
        return ret;
      },
      contentStyle() {
        const ret = {};
        const label = this.label;
        if (this.form.labelPosition === 'top' || this.form.inline) return ret;
        if (!label && !this.labelWidth && this.isNested) return ret;
        const labelWidth = this.labelWidth || this.form.labelWidth;
        if (labelWidth) {
          ret.marginLeft = labelWidth;
        }
        return ret;
      },
      form() {
        let parent = this.$parent;
        let parentName = parent.$options.componentName;
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
        get() {
          const model = this.model || this.form.model; // ext-> modify
          if (!model || !this.prop) { return; }

          let path = this.prop;
          if (path.indexOf(':') !== -1) {
            path = path.replace(/:/, '.');
          }
          if (typeof this.value !== 'undefined') {
            return this.value; // ext-> modify
          } else { // ext-> modify
            return getPropByPath(model, path, true).v;
          }
        }
      },
      isRequired() {
        let rules = this.getRules();
        let isRequired = false;

        if (rules && rules.length) {
          rules.every(rule => {
            if (rule.required) {
              isRequired = true;
              return false;
            }
            return true;
          });
        }
        return isRequired;
      },
      _formSize() {
        return this.elForm.size;
      },
      elFormItemSize() {
        return this.size || this._formSize;
      },
      sizeClass() {
        return (this.$ELEMENT || {}).size || this.elFormItemSize;
      },
      scopeNamed() { // ext-> 表单作用域
        return this.scopeName || 'ElForm';
      },
      showInlineMsg() { // ext-> 弹出提示信息
        return this.showMessage && this.form.showMessage;
      }
    },
    data() {
      return {
        validateState: '',
        validateMessage: '',
        validateDisabled: false,
        validator: {},
        isNested: false,
        IS_SHOW_TIPS: false, // ext-> 默认禁用 tooltip功能
        TIP_POP_WIDTH: 0,
        tipContent: '', // ext-> tooltip内容
        tipTimeHander: null, // ext-> 扩展
        tipsDom: null, // ext-> 扩展
        isCompare: false, // ext-> 是否为比较样式
        customStyl: '',
        errStyl: {} // ext-> 错误样式设置
      };
    },
    methods: {
      validate(trigger, callback = noop) {
        this.validateDisabled = false;
        const rules = this.getFilteredRule(trigger);
        // ext-> 验证样式设置
        this.$nextTick(()=> {
          this.setCompareStyl(this.prop, this.validateState);
          // ext-> 触发外部校验
          if (typeof this.form.validTrigger === 'function') this.form.validTrigger.call(null, this.form.model);
        });

        if ((!rules || rules.length === 0) && this.required === undefined) {
          callback();
          return true;
        }

        this.validateState = 'validating';

        const descriptor = {};
        if (rules && rules.length > 0) {
          rules.forEach(rule => {
            delete rule.trigger;
          });
        }
        descriptor[this.prop] = rules;

        const validator = new AsyncValidator(descriptor);
        const model = {};

        model[this.prop] = this.getTypeData(this.fieldValue, rules);

        validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
          this.validateState = !errors ? 'success' : 'error';
          this.validateMessage = errors ? errors[0].message : '';

          callback(this.validateMessage, invalidFields);
          if (errors) this.tipContent = this.validateMessage; // ext-> 设置错误信息
        });
      },
      clearValidate() {
        this.validateState = '';
        this.validateMessage = '';
        this.validateDisabled = false;
      },
      resetField() {
        this.validateState = '';
        this.validateMessage = '';

        let model = this.model || this.form.model; // ext-> modify
        let value = this.fieldValue;
        let path = this.prop;
        let prop; // ext-> modify

        if (path.indexOf(':') !== -1) {
          path = path.replace(/:/, '.');
        }

        if (typeOf(model) === 'Object') { // ext-> modify
          prop = getPropByPath(model, path, true);
        }

        if (Array.isArray(value)) {
          this.validateDisabled = true;
          if (typeof this.value !== 'undefined') { // ext-> modify
            this.$emit('input', [].concat(this.initialValue));
          } else if (prop) {
            prop.o[prop.k] = [].concat(this.initialValue);
          }
        } else {
          this.validateDisabled = true;
          if (typeof this.value !== 'undefined') { // ext-> modify
            this.$emit('input', this.initialValue);
          } else if (prop) {
            prop.o[prop.k] = this.initialValue;
          }
        }
        /* Select 的值被代码改变时不会触发校验，
           这里需要强行触发一次，刷新 validateDisabled 的值，
           确保 Select 下一次值改变时能正确触发校验 */
        this.broadcast('ElSelect', 'fieldReset');
        this.broadcast('ElTimeSelect', 'fieldReset', this.initialValue);
      },
      getRules() {
        let formRules = this.form.rules;
        const selfRules = this.rules;
        const requiredRule = this.required !== undefined ? { required: !!this.required } : [];

        const prop = getPropByPath(formRules, this.prop || '');
        formRules = formRules ? (prop.o[this.prop || ''] || prop.v) : [];

        return [].concat(selfRules || formRules || []).concat(requiredRule);
      },
      getFilteredRule(trigger) {
        const rules = this.getRules();

        return rules.filter(rule => {
          if (!rule.trigger || trigger === '') return true;
          if (Array.isArray(rule.trigger)) {
            return rule.trigger.indexOf(trigger) > -1;
          } else {
            return rule.trigger === trigger;
          }
        }).map(rule => objectAssign({}, rule));
      },
      onFieldBlur() {
        this.validate('blur');
      },
      onFieldChange() {
        if (this.validateDisabled) {
          this.validateDisabled = false;
          return;
        }

        this.validate('change');
      },
      // ext-> 比较样式设置
      setCompareStyl(field, status, styl) {
        // 验证样式设置
        if (typeof styl !== 'undefined') this.customStyl = styl;
        if (status === 'error') {
          this.broadcast('ElInput', 'compare-style', this.errStyl);
        } else if (status === 'compare' && this.validateState !== 'error') {
          this.broadcast('ElInput', 'compare-style', styl);
        } else if ((this.isCompare && status !== 'compare') || styl === '') {
          if (this.customStyl === '' && this.validateState !== 'error') {
            this.broadcast('ElInput', 'compare-style', {});
          }
        }
      },
      // ext-> 自定义获取日期数据类型
      getTypeData(value, rules) {
        let typevalue = '', cdate;
        if (typeOf(rules) === 'Array') {
          for (let i = 0; i < rules.length; i++) {
            if (typeOf(rules[i]) === 'Object' && rules[i]['type'] === 'date' && typeOf(value) === 'String') {
              cdate = new Date(compatDateStr(value));
            }
          }
        } else if (typeOf(rules) === 'Object' && rules.type === 'date' && typeOf(value) === 'String') {
          cdate = new Date(compatDateStr(value));
        }

        if (typeOf(value) === 'Date') {
          typevalue = value;
        } else if (typeOf(cdate) === 'Date' && !isNaN(cdate.getTime())) {
          typevalue = cdate;
        } else {
          typevalue = value;
        }
        return typevalue;
      },
      // ext-> 鼠标over时事件
      inputMouseover(e) {
        if (this.form.disabledTips) return; // 禁用表单溢出和验证弹窗提示
        if (this.showInlineMsg && this.validateState === 'error') return;

        let pos, gapw, style, color = '', that = this;
        let inputEl = this.$el.querySelector('input') || this.$el.querySelector('textarea');
        let inputWP = this.getPlaceWidth(inputEl);
        this.TIP_POP_WIDTH = this.getTipContentWidth(inputEl, this.tipContent);

        if (this.IS_SHOW_TIPS || this.validateState === 'error') {
          this.tipTimeHander = setTimeout(() => {
            pos = inputEl.getBoundingClientRect();
            gapw = that.TIP_POP_WIDTH > 0 ? (that.TIP_POP_WIDTH - inputWP.w - inputWP.pl) / 2 : 0;
            if (this.validateState === 'error') color = 'red';
            style = `color:${color}; left:${pos.left - gapw}px; top: ${pos.top - 42}px; z-index: 99; position: fixed`;

            if (/[\w\W]{3,}/ig.test(that.tipContent)) {
              that.tipsDom = createDomElement('div', {class: 'form-message-tips', style: style});
              that.tipsDom.innerHTML = that.tipContent;
              document.body.appendChild(that.tipsDom);
            }
          }, 300);
        }
      },
      // ext-> 鼠标out时事件
      inputMouseout(e) {
        if (this.form.disabledTips) return; // 禁用表单溢出和验证弹窗提示
        if (this.showInlineMsg && this.validateState === 'error') return;

        clearTimeout(this.tipTimeHander);
        let delDoms = document.querySelectorAll('.form-message-tips');
        if (delDoms.length && this.tipsDom) {
          for (let i = 0; i < delDoms.length; i++) { document.body.removeChild(delDoms[i]); }
          this.tipsDom = null;
        }
      },
      // ext-> 设置超出边界提示内容
      setTipContent(value) {
        if (this.validateState !== 'error') {
          this.tipContent = value ? String(value) : '';
          this.IS_SHOW_TIPS = this.getTipStatus(this.$el.querySelector('input'));
        }
      },
      // ext-> 计算组件除padding的宽度
      getPlaceWidth(el) {
        let elStyl, paddingLeft, paddingRight;
        if (el) {
          elStyl = getComputedStyle(el);
          paddingLeft = parseInt(elStyl.paddingLeft.replace('px', ''), 10);
          paddingRight = parseInt(elStyl.paddingRight.replace('px', ''), 10);
          return {
            w: el.getBoundingClientRect().width - paddingLeft - paddingRight,
            pl: paddingLeft
          };
        } else {
          return {w: 0, pl: 0};
        }
      },
      // ext-> 计算文本宽度
      getTipContentWidth(el, text) {
        let elStyl, fontSize, zhword, zhWidth;
        text = text || '';
        elStyl = getComputedStyle(el);
        fontSize = parseInt(elStyl.fontSize.replace('px', ''), 10);
        zhword = String(text).replace(/[0-9A-Za-z\-\:]/ig, '');
        zhWidth = zhword.length * fontSize;
        return (String(text).length - zhword.length) * fontSize * 0.56 + zhWidth;
      },
      // ext-> 获取tip动态配置
      getTipStatus(el) {
        let width, contentWidth;
        if (el) {
          width = this.getPlaceWidth(el).w;
          contentWidth = this.getTipContentWidth(el, this.tipContent);
          if (contentWidth > width) { return true; } else { return false; }
        } else {
          return false;
        }
      }
    },
    mounted() {
      if (this.prop) {
        this.dispatch(this.scopeNamed, 'el.form.addField', [this]); // ext-> modify

        let initialValue = this.fieldValue;
        if (Array.isArray(initialValue)) {
          initialValue = [].concat(initialValue);
        }
        Object.defineProperty(this, 'initialValue', {
          value: initialValue
        });

        let rules = this.getRules();

        if (rules.length || this.required !== undefined) {
          this.$on('el.form.blur', this.onFieldBlur);
          this.$on('el.form.change', this.onFieldChange);
        }
      }
      this.$on('el.form.mouseover', this.inputMouseover); // ext-> 表单组件 mouseover 事件
      this.$on('el.form.mouseout', this.inputMouseout); // ext-> 表单组件 mouseout 事件
      this.$on('el.form.messagetips', this.setTipContent); // ext-> 弹出信息内容填充
    },
    beforeDestroy() {
      this.dispatch(this.scopeNamed, 'el.form.removeField', [this]); // ext-> modify
    }
  };
</script>
