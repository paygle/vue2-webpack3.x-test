<template>
  <div :class="[
    type === 'textarea' ? 'el-textarea' : 'el-input',
    inputSize ? 'el-input--' + inputSize : '',
    {
      'is-disputed': disputed,
      'is-disabled': inputDisabled,
      'el-input-group': $slots.prepend || $slots.append,
      'el-input-group--append': $slots.append,
      'el-input-group--prepend': $slots.prepend,
      'el-input--prefix': $slots.prefix || prefixIcon,
      'el-input--suffix': $slots.suffix || suffixIcon
    }
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div class="el-input-group__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <input
        :tabindex="tabindex"
        v-if="type !== 'textarea'"
        class="el-input__inner"
        v-bind="$props"
        :disabled="inputDisabled"
        :readonly="readonly || disputed"
        :autocomplete="autoComplete"
        :value="currentValue"
        ref="input"
        :style="[displayStyl]"
        @mouseover="inputMouseover"
        @mouseout="inputMouseout"
        @keydown="fixIeReadonly"
        @keyup.enter="keyEnter"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        :aria-label="label"
      >
      <!-- 前置内容 -->
      <span class="el-input__prefix" v-if="$slots.prefix || prefixIcon" :style="prefixOffset">
        <slot name="prefix"></slot>
        <i class="el-input__icon"
           v-if="prefixIcon"
           :class="prefixIcon">
        </i>
      </span>
      <!-- 后置内容 -->
      <span
        class="el-input__suffix"
        v-if="$slots.suffix || suffixIcon || showClear || validateState && needStatusIcon"
        :style="suffixOffset">
        <span class="el-input__suffix-inner">
          <template v-if="!showClear">
            <slot name="suffix"></slot>
            <i class="el-input__icon"
              v-if="suffixIcon"
              :class="suffixIcon">
            </i>
          </template>
          <i v-else
            class="el-input__icon el-icon-circle-close el-input__clear"
            @click="clear"
          ></i>
        </span>
        <i class="el-input__icon"
          v-if="validateState"
          :class="['el-input__validateIcon', validateIcon]">
        </i>
      </span>
      <!-- 后置元素 -->
      <div class="el-input-group__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
    <textarea
      v-else
      :tabindex="tabindex"
      class="el-textarea__inner"
      :value="currentValue"
      @input="handleInput"
      ref="textarea"
      v-bind="$props"
      :readonly="readonly || disputed"
      :disabled="inputDisabled"
      :style="[textareaStyle, displayStyl]"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      :aria-label="label"
      @mouseover="inputMouseover"
      @mouseout="inputMouseout"
    >
    </textarea>
  </div>
</template>
<script>
  import emitter from 'element-ui/src/mixins/emitter';
  import Migrating from 'element-ui/src/mixins/migrating';
  import calcTextareaHeight from './calcTextareaHeight';
  import merge from 'element-ui/src/utils/merge';
  import { getFloatNumber, isOwnEmpty } from 'element-ui/src/utils/util'; // ext-> add
  // ext-> add
  const getMaxMinVal = function(value, max, min, type) {
    if (type === 'number' && value !== '' && value !== '-') {
      if (isNaN(value)) { value = 0; }
      if (typeof max !== 'undefined' && !isNaN(max) && value > max) {
        value = max;
      }
      if (typeof min !== 'undefined' && !isNaN(min) && value < min) {
        value = min;
      }
    }
    return value;
  };

  export default {
    name: 'ElInput',

    componentName: 'ElInput',

    mixins: [emitter, Migrating],

    inject: {
      elForm: {
        default: ''
      },
      elFormItem: {
        default: ''
      }
    },

    data() {
      return {
        currentValue: this.value,
        textareaCalcStyle: {},
        prefixOffset: null,
        suffixOffset: null,
        hovering: false,
        focused: false,
        isGetFloat: true, // ext-> 是否允许获取精度数
        fillStyl: '', // ext-> 填充样式
        compareStyl: '' // ext-> 比较样式
      };
    },

    props: {
      value: [String, Number],
      placeholder: String,
      size: String,
      resize: String,
      name: String,
      form: String,
      id: String,
      maxlength: Number,
      minlength: Number,
      readonly: Boolean,
      autofocus: Boolean,
      disabled: Boolean,
      type: {
        type: String,
        default: 'text'
      },
      autosize: {
        type: [Boolean, Object],
        default: false
      },
      rows: {
        type: Number,
        default: 2
      },
      autoComplete: {
        type: String,
        default: 'off'
      },
      max: {},
      min: {},
      step: {},
      validateEvent: {
        type: Boolean,
        default: true
      },
      suffixIcon: String,
      prefixIcon: String,
      label: String,
      clearable: {
        type: Boolean,
        default: false
      },
      tabindex: String,
      kind: { // ext-> 值类型, 可以取 string 和 number 两种类型
        type: String,
        default: 'string'
      },
      precision: { // ext-> 数字自定义精度
        type: [Number, String],
        default: -1
      },
      isAround: { // ext-> 是否四啥五入
        type: Boolean,
        default: false
      },
      getFillStyl: Function, // ext-> 获取填充样式，优先级低于比较样式，返回Object样式对象
      disputed: Boolean, // ext-> 代替禁用
      disabledTips: Boolean // ext-> 禁用表单弹窗提示
    },

    computed: {
      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },
      validateState() {
        return this.elFormItem ? this.elFormItem.validateState : '';
      },
      needStatusIcon() {
        return this.elForm ? this.elForm.statusIcon : false;
      },
      validateIcon() {
        return {
          validating: 'el-icon-loading',
          success: 'el-icon-circle-check',
          error: 'el-icon-circle-close'
        }[this.validateState];
      },
      textareaStyle() {
        return merge({}, this.textareaCalcStyle, { resize: this.resize });
      },
      inputSize() {
        return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      },
      inputDisabled() {
        return this.disabled || (this.elForm || {}).disabled;
      },
      isGroup() {
        return this.$slots.prepend || this.$slots.append;
      },
      showClear() {
        return this.clearable && this.currentValue !== '' && (this.focused || this.hovering);
      },
      // ext-> 显示样式
      displayStyl() {
        if (typeof this.compareStyl === 'object' && !isOwnEmpty(this.compareStyl)) {
          return this.compareStyl;
        } else if (typeof this.fillStyl === 'object' && !isOwnEmpty(this.fillStyl)) {
          return this.fillStyl;
        }
        return {};
      }
    },

    watch: {
      'value'(val, oldValue) {
        this.setCurrentValue(val);
        this.customfillStyl(val); // ext-> fill style
      }
    },

    methods: {
      focus() {
        (this.$refs.input || this.$refs.textarea).focus();
      },
      getMigratingConfig() {
        return {
          props: {
            'icon': 'icon is removed, use suffix-icon / prefix-icon instead.',
            'on-icon-click': 'on-icon-click is removed.'
          },
          events: {
            'click': 'click is removed.'
          }
        };
      },
      handleBlur(event) {
        this.isGetFloat = true; // ext-> 扩展
        this.focused = false;
        this.$emit('blur', event);
        if (this.validateEvent) {
          this.dispatch('ElFormItem', 'el.form.blur', [this.currentValue]);
          this.dispatch('ElForm', 'compare-change', [this]); // ext-> 比较着色
        }
        this.setMessageTips(); // ext-> 信息超出边界弹出提示
      },
      select() {
        (this.$refs.input || this.$refs.textarea).select();
      },
      resizeTextarea() {
        if (this.$isServer) return;
        const { autosize, type } = this;
        if (type !== 'textarea') return;
        if (!autosize) {
          this.textareaCalcStyle = {
            minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
          };
          return;
        }
        const minRows = autosize.minRows;
        const maxRows = autosize.maxRows;

        this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
      },
      handleFocus(event) {
        this.isGetFloat = false; // ext-> 扩展
        this.focused = true;
        this.$emit('focus', event);
      },
      handleInput(event) {
        let value = event.target.value; // ext-> modify
        value = this.getTypeVal(value); // ext-> add
        value = getMaxMinVal(value, this.max, this.min, this.kind); // ext-> add
        this.$emit('input', value);
        this.setCurrentValue(value);
      },
      handleChange(event) {
        this.$emit('change', event.target.value);
      },
      setCurrentValue(value) {
        // ext-> 设置精度或字符串
        if (this.kind === 'number') {
          if (this.precision > 0 && this.isGetFloat) {
            value = getFloatNumber(this.precision, value, this.isAround);
          } else {
            value = (!isNaN(value) && value !== '') ? Number(value) : value;
          }
          value = getMaxMinVal(value, this.max, this.min, this.kind);
        } else {
          value = String(value);
        }

        if (value === this.currentValue) return;
        this.$nextTick(_ => {
          this.resizeTextarea();
        });
        this.currentValue = value;
        if (this.validateEvent) {
          this.dispatch('ElFormItem', 'el.form.change', [value]);
        }
      },
      calcIconOffset(place) {
        const pendantMap = {
          'suf': 'append',
          'pre': 'prepend'
        };

        const pendant = pendantMap[place];

        if (this.$slots[pendant]) {
          return { transform: `translateX(${place === 'suf' ? '-' : ''}${this.$el.querySelector(`.el-input-group__${pendant}`).offsetWidth}px)` };
        }
      },
      clear() {
        this.$emit('input', '');
        this.$emit('change', '');
        this.$emit('clear');
        this.setCurrentValue('');
        this.focus();
      },
      // ext-> 获取类型值
      getTypeVal(value) {
        if (this.kind === 'number' && value !== '' && value !== '-') {
          // 数值转化
          if (this.precision > -1) {
            value = isNaN(value) ? 0 : getFloatNumber(this.precision, value, this.isAround);
          }
          value = isNaN(value) ? value : Number(value);
          value = getMaxMinVal(value, this.max, this.min, this.kind);
        } else {
          value = String(value);
        }
        return value;
      },
      // ext-> 设置填充样式，优先级低于比较样式
      customfillStyl(value) {
        if (typeof this.getFillStyl === 'function') {
          this.fillStyl = this.getFillStyl.call(null, value);
        }
      },
      // ext-> 设置比较样式
      setCompareStyle(styl) { this.compareStyl = styl; },
      // ext-> KeyEnter事件
      keyEnter(e) {
        this.$emit('key-enter', e);
      },
      // ext-> 修复IE下readonly后退问题
      fixIeReadonly(e) {
        if (this.readonly && e.keyCode === 8) e.preventDefault();
      },
      // ext-> 信息超出边界弹出提示
      setMessageTips() {
        if (!this.disabledTips && this.type !== 'textarea') {
          this.$nextTick(() => {
            this.dispatch('ElFormItem', 'el.form.messagetips', [this.value]);
          });
        }
      },
      // ext-> 鼠标over时事件
      inputMouseover(e) {
        if (!this.disabledTips) {
          this.dispatch('ElFormItem', 'el.form.mouseover', [e]);
        }
      },
      // ext-> 鼠标out时事件
      inputMouseout(e) {
        if (!this.disabledTips) {
          this.dispatch('ElFormItem', 'el.form.mouseout', [e]);
        }
      }
    },

    created() {
      this.$on('inputSelect', this.select);
      this.$on('compare-style', this.setCompareStyle); // ext-> 比较样式
      this.customfillStyl(this.value); // ext-> fill style
    },

    mounted() {
      this.resizeTextarea();
      if (this.isGroup) {
        this.prefixOffset = this.calcIconOffset('pre');
        this.suffixOffset = this.calcIconOffset('suf');
      }
      this.$nextTick(() => { // ext-> 扩展
        this.dispatch('ElForm', 'compare-change', [this]);
        this.setMessageTips(); // ext-> 信息超出边界弹出提示
      });
    }
  };
</script>
