<template>
  <form class="el-form" :class="[
    labelPosition ? 'el-form--label-' + labelPosition : '',
    { 'el-form--inline': inline }
  ]">
    <slot></slot>
  </form>
</template>
<script>
  import objectAssign from 'element-ui/src/utils/merge';

  export default {
    name: 'ElForm',

    componentName: 'ElForm',

    provide() {
      return {
        elForm: this
      };
    },

    props: {
      model: Object,
      rules: Object,
      labelPosition: String,
      labelWidth: String,
      labelSuffix: {
        type: String,
        default: ''
      },
      inline: Boolean,
      inlineMessage: Boolean,
      statusIcon: Boolean,
      showMessage: {
        type: Boolean,
        default: true
      },
      size: String,
      disabled: Boolean,
      validateOnRuleChange: {
        type: Boolean,
        default: true
      },
      scopeName: String, // ext-> 数据无关联验证-域名称
      disabledTips: Boolean, // ext-> 禁用表单溢出和验证弹窗提示
      compareStyl: Array, // ext-> 比较字段设置样式
      validTrigger: Function, // ext-> 触发外部验证函数
      errStyl: Object // ext-> 错误样式设置
    },
    watch: {
      rules() {
        if (this.validateOnRuleChange) {
          this.fields.forEach(field => { field.clearValidate(); }); // ext-> 状态清除
          this.$nextTick(() => this.validate(() => {}));
        }
      }
    },
    data() {
      return {
        fields: []
      };
    },
    created() {
      if (this.scopeName) this.$options.componentName = this.scopeName; // ext-> 自定义 componentName
      this.$on('compare-change', this.compareChgStyl); // ext-> 比较样式
      this.$on('el.form.addField', (field) => {
        if (field) {
          // 设置初始值
          field.errStyl = this.errStyl;
          if (this.compareStyl) field.isCompare = true;
          this.fields.push(field);
        }
      });
      /* istanbul ignore next */
      this.$on('el.form.removeField', (field) => {
        if (field.prop) {
          this.fields.splice(this.fields.indexOf(field), 1);
        }
      });
    },
    methods: {
      resetFields() {
        if (!this.model) {
          process.env.NODE_ENV !== 'production' &&
          console.warn('[Element Warn][Form]model is required for resetFields to work.');
          return;
        }
        this.fields.forEach(field => {
          field.resetField();
        });
      },
      clearValidate() {
        this.fields.forEach(field => {
          field.clearValidate();
        });
      },
      validate(callback) {
        if (!this.model) {
          console.warn('[Element Warn][Form]model is required for validate to work!');
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
        // 如果需要验证的fields为空，调用验证时立刻返回callback
        if (this.fields.length === 0 && callback) {
          callback(true);
        }
        let invalidFields = {};
        this.fields.forEach(field => {
          field.validate('', (message, field) => {
            if (message) {
              valid = false;
              invalidFields = objectAssign({}, invalidFields, field);
            }
            if (typeof callback === 'function' && ++count === this.fields.length) {
              callback(valid, invalidFields);
            }
          });
        });

        if (promise) {
          return promise;
        }
      },
      validateField(prop, cb) {
        let field = this.fields.filter(field => field.prop === prop)[0];
        if (!field) { throw new Error('must call validateField with valid prop string!'); }

        field.validate('', cb);
      },
      /* ext-> 比值样式计算
       [
        {
          style: { // 自定义样式
            color: '#fff',
            background: 'green'
          },
          fields: ['name', 'desc'], // 需要比较触发计算的字段
          stylefields: ['desc'], // 需要设置样式的字段（省略时，同fields)
          compare:function(data) {
            return data.name > data.desc; // 返回为真时设置给定样式
          }
        }
       ]
      */
      compareChgStyl(el) {
        if (!Array.isArray(this.compareStyl)) return;
        let that = this;
        let fieldname = el.$parent.prop; // 获取字段名称

        function setCustomStyle(cp, styl) {
          let fields = cp.stylefields || cp.fields;
          fields.forEach((f) => {
            that.fields.forEach((field) => {
              if (f === field.prop) field.setCompareStyl(field.prop, 'compare', styl);
            });
          });
        }

        this.compareStyl.forEach((cp) => {
          let hasf = cp.fields.filter(n => n === fieldname);
          if (hasf.length > 0) {
            if (cp.compare.call(null, that.model)) {
              setCustomStyle(cp, cp.style);
            } else {
              setCustomStyle(cp, {});
            }
          }
        });
      }
    }
  };
</script>
