<template>
  <div class="cell el-form-item" :class="[{
      'el-form-item--feedback': elForm && elForm.statusIcon,
      'is-error': validateState === 'error',
      'is-validating': validateState === 'validating',
      'is-success': validateState === 'success',
      'is-required': isRequired || required
    },
    sizeClass ? 'el-form-item--' + sizeClass : ''
  ]">
    <slot></slot>
  </div>
</template>
<script>
  import AsyncValidator from 'async-validator';
  import emitter from 'element-ui/src/mixins/emitter';
  import { createDomElement } from 'element-ui/src/utils/dom';
  import { noop, typeOf, compatDateStr } from 'element-ui/src/utils/util';

  export default {
    // name: 'ElTableItem',

    componentName: 'ElFormItem',

    mixins: [emitter],

    provide() {
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
      rules() {
        return this.ruler ? this.ruler[this.prop.column.property] : undefined; // 获取当前属性的校验规则
      },
      isRequired() {
        let rules = this.rules;
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
      }
    },
    data() {
      return {
        validateState: '',
        validateMessage: '',
        validateDisabled: false,
        validator: {},
        IS_SHOW_TIPS: false, // 默认禁用 tooltip功能
        TIP_POP_WIDTH: 0,
        tipContent: '', // tip内容
        tipTimeHander: null,
        tipsDom: null
      };
    },
    methods: {
      // 扩展-> 获取类型数值
      getTypeOfVal(value, rules) {

        let typevalue = '', type, cdate;

        if (typeOf(rules) === 'Array') {
          for (let i = 0; i < rules.length; i++) {
            type = rules[i].type ? rules[i].type : 'string';
            if (typeOf(rules[i]) === 'Object' && rules[i]['type'] === 'date' && typeOf(value) === 'String') {
              cdate = new Date(compatDateStr(value));
            }
          }
        } else if (typeOf(rules) === 'Object' && rules.type === 'date' && typeOf(value) === 'String') {
          type = rules.type ? rules.type : 'string';
          cdate = new Date(compatDateStr(value));
        }

        if (typeOf(value) === 'Date') {
          typevalue = value;
        } else if (typeOf(cdate) === 'Date' && !isNaN(cdate.getTime())) {
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

      validate(trigger, callback = noop) {

        this.validateDisabled = false;
        // const regxNumber = /^\d*\.?\d*$/g;
        const {$index, row, column, store} = this.prop;

        // 验证样式设置
        this.$nextTick(()=> {
          let rowIdx, store = this.prop.store;
          // 触发外部校验
          if (typeof store.table.validTrigger === 'function') {
            rowIdx = this.property.replace('row', '').replace(/[a-z]+[a-z0-9]*$/ig, '');
            store.table.validTrigger.call(null, store.states.data[rowIdx], this.property.replace(`row${rowIdx}`, ''));
          }
        });

        if (this.rules) { // 存在规则才进行校验
          this.validateState = 'validating';
          let descriptor = {}, model = {};
          descriptor[column.property] = this.rules;
          let validator = new AsyncValidator(descriptor);

          model[column.property] = this.getTypeOfVal(this.value, this.rules);
          validator.validate(model, { firstFields: true, row: row }, (errors, fields) => {
            this.validateState = !errors ? 'success' : 'error';
            this.validateMessage = errors ? errors[0].message : '';
            callback(errors);
          });
        }

        if (column.property) {
          if (this.validateState !== 'error') {
            store.commit('disErrCount', `row${$index + column.property}`);
          } else {
            store.commit('setErrCount', `row${$index + column.property}`);
            this.tipContent = this.validateMessage; // 设置错误信息
          }
        }
        this.dispatch('ElFormTable', 'err-change');
      },
      clearValidate() {
        this.validateState = '';
        this.validateMessage = '';
        this.validateDisabled = false;
      },
      resetField() {
        let { row, column } = this.prop;
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
      // ext-> 鼠标over时事件
      inputMouseover(e) {
        if (this.disabledTips) return; // 禁用表单溢出和验证弹窗提示
        let pos, gapw, style, color = '', that = this;
        let inputEl = this.$el.querySelector('input') || this.$el.querySelector('textarea');;
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
        if (this.disabledTips) return; // 禁用表单溢出和验证弹窗提示
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
      // 计算组件除padding的宽度
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
      // 计算文本宽度
      getTipContentWidth(el, text) {
        let elStyl, fontSize, zhword, zhWidth;
        text = text || '';
        elStyl = getComputedStyle(el);
        fontSize = parseInt(elStyl.fontSize.replace('px', ''), 10);
        zhword = String(text).replace(/[0-9A-Za-z\-\:]/ig, '');
        zhWidth = zhword.length * fontSize;
        return (String(text).length - zhword.length) * fontSize * 0.56 + zhWidth;
      },
      // 获取tip动态配置
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

      if (this.prop.column.type === 'input') {
        this.dispatch('ElFormTable', 'el.form.addField', [this]); // 扩展修改

        let initialValue = this.value;
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
    beforeDestroy() {
      this.dispatch('ElFormTable', 'el.form.removeField', [this]); // 扩展修改
    }
  };
</script>
