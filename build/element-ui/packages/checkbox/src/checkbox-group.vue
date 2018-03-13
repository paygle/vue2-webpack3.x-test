<script>
  import Emitter from 'element-ui/src/mixins/emitter';

  export default {
    name: 'ElCheckboxGroup',

    componentName: 'ElCheckboxGroup',

    mixins: [Emitter],

    inject: {
      elFormItem: {
        default: ''
      }
    },

    props: {
      value: {},
      disabled: Boolean,
      min: Number,
      max: Number,
      size: String,
      fill: String,
      textColor: String
    },

    computed: {
      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },
      checkboxGroupSize() {
        return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      }
    },

    watch: {
      value(value) {
        this.dispatch('ElFormItem', 'el.form.change', [value]);
      }
    },
    methods: {
      // ext-> 鼠标over时事件
      inputMouseover(e) {
        this.dispatch('ElFormItem', 'el.form.mouseover', [e]);
      },
      // ext-> 鼠标out时事件
      inputMouseout(e) {
        this.dispatch('ElFormItem', 'el.form.mouseout', [e]);
      }
    }
  };
</script>

<template>
  <div class="el-checkbox-group" role="group" aria-label="checkbox-group"
    @mouseover="inputMouseover"
    @mouseout="inputMouseout">
    <slot></slot>
  </div>
</template>
