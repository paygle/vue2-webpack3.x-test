import ElCheckbox from 'element-ui/packages/checkbox';
import ElTag from 'element-ui/packages/tag';
import objectAssign from 'element-ui/src/utils/merge';
import { getPropByPath } from 'element-ui/src/utils/util';

let columnIdSeed = 1;

// 获取禁用值
const getDisabledVal = function(row, column, store, $index, type) {
  let disableField = store.states.disableField;

  function getCallOp() {
    return column.selectable ? !column.selectable.call(null, row, $index) : false;
  }
  function getCallEdit() {
    return column.editable ? !column.editable.call(null, row, $index) : false;
  }
  // 禁用MAP值
  if (store.states.disabledMap[`row${$index}${column.property}`]) return true;

  if (store.table.disableField && store.table.disableField) {
    if (row[disableField.field] === disableField.trueVal) return true;
    return type === 'op' ? getCallOp() : getCallEdit();
  }
  return type === 'op' ? getCallOp() : getCallEdit();
};

const defaults = {
  default: {
    order: ''
  },
  selection: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: '',
    className: 'el-table-column--selection'
  },
  expand: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ''
  },
  index: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ''
  }
};

const forced = {
  selection: {
    renderHeader: function(h, { store }) {
      return <el-checkbox
        disabled={ store.states.data && store.states.data.length === 0 }
        indeterminate={ store.states.selection.length > 0 && !this.isAllSelected }
        nativeOn-click={ this.toggleAllSelection }
        value={ this.isAllSelected } />;
    },
    renderCell: function(h, { row, column, store, $index }) {
      return <el-checkbox
        nativeOn-click={ (event) => event.stopPropagation() }
        value={ store.isSelected(row) }
        disabled={ column.selectable ? !column.selectable.call(null, row, $index) : false }
        on-input={ () => { store.commit('rowSelectedChanged', row); } } />;
    },
    sortable: false,
    resizable: false
  },
  index: {
    renderHeader: function(h, { column }) {
      return column.label || '#';
    },
    renderCell: function(h, { $index, column }) {
      let i = $index + 1;
      const index = column.index;

      if (typeof index === 'number') {
        i = $index + index;
      } else if (typeof index === 'function') {
        i = index($index);
      }

      return <div>{ i }</div>;
    },
    sortable: false
  },
  expand: {
    renderHeader: function(h, { column }) {
      return column.label || '';
    },
    renderCell: function(h, { row, store }, proxy) {
      const expanded = store.states.expandRows.indexOf(row) > -1;
      return <div class={ 'el-table__expand-icon ' + (expanded ? 'el-table__expand-icon--expanded' : '') }
        on-click={ e => proxy.handleExpandClick(row, e) }>
        <i class='el-icon el-icon-arrow-right'></i>
      </div>;
    },
    sortable: false,
    resizable: false,
    className: 'el-table__expand-column'
  }
};

const getDefaultColumn = function(type, options) {
  const column = {};

  objectAssign(column, defaults[type || 'default']);

  for (let name in options) {
    if (options.hasOwnProperty(name)) {
      const value = options[name];
      if (typeof value !== 'undefined') {
        column[name] = value;
      }
    }
  }

  if (!column.minWidth) {
    column.minWidth = 80;
  }

  column.realWidth = column.width === undefined ? column.minWidth : column.width;

  return column;
};

const DEFAULT_RENDER_CELL = function(h, { row, column }) {
  const property = column.property;
  const value = property && getPropByPath(row, property).v;
  if (column && column.formatter) {
    return column.formatter(row, column, value);
  }
  return value;
};

const parseWidth = (width) => {
  if (width !== undefined) {
    width = parseInt(width, 10);
    if (isNaN(width)) {
      width = null;
    }
  }
  return width;
};

const parseMinWidth = (minWidth) => {
  if (minWidth !== undefined) {
    minWidth = parseInt(minWidth, 10);
    if (isNaN(minWidth)) {
      minWidth = 80;
    }
  }
  return minWidth;
};

export default {
  name: 'ElFormTableColumn',

  props: {
    type: {
      type: String,
      default: 'default'
    },
    label: String,
    className: String,
    labelClassName: String,
    property: String,
    prop: String,
    width: {},
    minWidth: {},
    renderHeader: Function,
    sortable: {
      type: [String, Boolean],
      default: false
    },
    sortMethod: Function,
    sortBy: [String, Function, Array],
    resizable: {
      type: Boolean,
      default: true
    },
    context: {},
    columnKey: String,
    align: String,
    headerAlign: String,
    showTooltipWhenOverflow: Boolean,
    showOverflowTooltip: { // ext-> modify
      type: Boolean,
      default: true
    },
    fixed: [Boolean, String],
    formatter: Function,
    selectable: Function,
    reserveSelection: Boolean,
    filterMethod: Function,
    filteredValue: Array,
    filters: Array,
    filterPlacement: String,
    filterMultiple: {
      type: Boolean,
      default: true
    },
    index: [Number, Function],
    colIndex: [Number, String], // ext-> 列序号，辅助 tabindex时使用
    disabledTips: Boolean // ext-> 禁用表单溢出和验证弹窗提示
  },

  data() {
    return {
      isSubColumn: false,
      columns: []
    };
  },

  beforeCreate() {
    this.row = {};
    this.column = {};
    this.$index = 0;
  },

  components: {
    ElCheckbox,
    ElTag
  },

  computed: {
    owner() {
      let parent = this.$parent;
      while (parent && !parent.tableId) {
        parent = parent.$parent;
      }
      return parent;
    },
    columnOrTableParent() {
      let parent = this.$parent;
      while (parent && !parent.tableId && !parent.columnId) {
        parent = parent.$parent;
      }
      return parent;
    }
  },

  created() {
    this.customRender = this.$options.render;
    this.$options.render = h => h('div', this.$slots.default);

    let parent = this.columnOrTableParent;
    let owner = this.owner;
    this.isSubColumn = owner !== parent;
    this.columnId = (parent.tableId || parent.columnId) + '_column_' + columnIdSeed++;

    let type = this.type;

    const width = parseWidth(this.width);
    const minWidth = parseMinWidth(this.minWidth);

    let isColumnGroup = false;

    let column = getDefaultColumn(type, {
      id: this.columnId,
      columnKey: this.columnKey,
      label: this.label,
      className: this.className,
      labelClassName: this.labelClassName,
      property: this.prop || this.property,
      type,
      renderCell: null,
      renderHeader: this.renderHeader,
      minWidth,
      width,
      isColumnGroup,
      context: this.context,
      align: this.align ? 'is-' + this.align : null,
      headerAlign: this.headerAlign ? 'is-' + this.headerAlign : (this.align ? 'is-' + this.align : null),
      sortable: this.sortable === '' ? true : this.sortable,
      sortMethod: this.sortMethod,
      sortBy: this.sortBy,
      resizable: this.resizable,
      showOverflowTooltip: this.showOverflowTooltip || this.showTooltipWhenOverflow,
      formatter: this.formatter,
      selectable: this.selectable,
      reserveSelection: this.reserveSelection,
      fixed: this.fixed === '' ? true : this.fixed,
      filterMethod: this.filterMethod,
      filters: this.filters,
      filterable: this.filters || this.filterMethod,
      filterMultiple: this.filterMultiple,
      filterOpened: false,
      filteredValue: this.filteredValue || [],
      filterPlacement: this.filterPlacement || '',
      index: this.index,
      colIndex: this.colIndex, // ext-> 序号，辅助 tabindex时使用
      disabledTips: this.disabledTips // ext-> 禁用表单溢出和验证弹窗提示
    });

    objectAssign(column, forced[type] || {});

    this.columnConfig = column;

    let renderCell = column.renderCell;
    let _self = this;
    let hiddenExpandIcon = ''; // ext-> add

    // ext-> 添加字段名称
    if (this.prop && owner.store.states.propertys.indexOf(this.prop) < 0) {
      owner.store.states.propertys.push(this.prop);
    }

    if (type === 'expand') {
      // ext-> expand 隐藏展开图标
      if (owner.store.table.expandIconHidden) {
        column.realWidth = 1;
        hiddenExpandIcon = 'hidden-expand-icon';
      }
      owner.renderExpanded = function(h, data) {
        return _self.$scopedSlots.default
          ? _self.$scopedSlots.default(data)
          : _self.$slots.default;
      };

      column.renderCell = function(h, data) {
        return <div class={'cell ' + hiddenExpandIcon}>{ renderCell(h, data, this._renderProxy) }</div>;
      };

      return;
    }

    column.renderCell = function(h, data) {

      if (_self.$scopedSlots.default) {
        renderCell = () => _self.$scopedSlots.default(data);
      }

      if (!renderCell) {
        renderCell = DEFAULT_RENDER_CELL;
      }

      let {$index, row, column, store} = data; // ext-> 验证
      let isTooltip = _self.showOverflowTooltip || _self.showTooltipWhenOverflow;
      let isDisable = getDisabledVal(row, column, store, $index);
      let stopValidate = store.getValidateField(`row${$index + column.property}`);
      data.ctrls = {}; // ext-> 添加 控制字段对象
      data.tabrow = store.states._tabidxs[store.states.data.indexOf(row)] || {}; // tabrow.字段名 获取 tabindex

      if (column.property) {
        // ext-> ctrls、tabrow、自定义禁用和验证字段设置, 在外部 <template/> 中使用
        let disabled = store.states.disabledMap[`disabled${$index + column.property}`];
        let validate = store.getValidateField(`validate${$index + column.property}`);
        if (typeof disabled !== 'undefined') data.ctrls[`disabled${$index + column.property}`] = disabled;
        if (typeof validate !== 'undefined') data.ctrls[`validate${$index + column.property}`] = validate;
      }
      if (isDisable) store.commit('disErrCount', `row${$index + column.property}`);

      // ext-> modify
      return isDisable || stopValidate || (_self.type === 'default' && isTooltip)
        ? <div
          class={ `cell el-tooltip row${$index}${column.property}` }
          style={ `width: ${(data.column.realWidth || data.column.width) - 1}px` }>
          { renderCell(h, data, _self) }
        </div>
        : <el-table-item
          prop={ data }
          disabled-tips={ _self.disabledTips }
          ruler={ store.table.rules }
          property={ `row${$index + column.property}` }
          class={ `row${$index + column.property}` }
          value={row[column.property]}>
          { renderCell(h, data, _self) }
        </el-table-item>;
    };
  },

  destroyed() {
    if (!this.$parent) return;
    const parent = this.$parent;
    this.owner.store.commit('removeColumn', this.columnConfig, this.isSubColumn ? parent.columnConfig : null);
  },

  watch: {
    label(newVal) {
      if (this.columnConfig) {
        this.columnConfig.label = newVal;
      }
    },

    prop(newVal) {
      if (this.columnConfig) {
        this.columnConfig.property = newVal;
      }
    },

    property(newVal) {
      if (this.columnConfig) {
        this.columnConfig.property = newVal;
      }
    },

    filters(newVal) {
      if (this.columnConfig) {
        this.columnConfig.filters = newVal;
      }
    },

    filterMultiple(newVal) {
      if (this.columnConfig) {
        this.columnConfig.filterMultiple = newVal;
      }
    },

    align(newVal) {
      if (this.columnConfig) {
        this.columnConfig.align = newVal ? 'is-' + newVal : null;

        if (!this.headerAlign) {
          this.columnConfig.headerAlign = newVal ? 'is-' + newVal : null;
        }
      }
    },

    headerAlign(newVal) {
      if (this.columnConfig) {
        this.columnConfig.headerAlign = 'is-' + (newVal ? newVal : this.align);
      }
    },

    width(newVal) {
      if (this.columnConfig) {
        this.columnConfig.width = parseWidth(newVal);
        this.owner.store.scheduleLayout();
      }
    },

    minWidth(newVal) {
      if (this.columnConfig) {
        this.columnConfig.minWidth = parseMinWidth(newVal);
        this.owner.store.scheduleLayout();
      }
    },

    fixed(newVal) {
      if (this.columnConfig) {
        this.columnConfig.fixed = newVal;
        this.owner.store.scheduleLayout(true);
      }
    },

    sortable(newVal) {
      if (this.columnConfig) {
        this.columnConfig.sortable = newVal;
      }
    },

    index(newVal) {
      if (this.columnConfig) {
        this.columnConfig.index = newVal;
      }
    },

    formatter(newVal) {
      if (this.columnConfig) {
        this.columnConfig.formatter = newVal;
      }
    }
  },

  mounted() {
    const owner = this.owner;
    const parent = this.columnOrTableParent;
    let columnIndex;

    if (!this.isSubColumn) {
      columnIndex = [].indexOf.call(parent.$refs.hiddenColumns.children, this.$el);
    } else {
      columnIndex = [].indexOf.call(parent.$el.children, this.$el);
    }
    owner.store.setColIndexOrder(this.colIndex, this.prop); // ext-> add
    owner.store.commit('insertColumn', this.columnConfig, columnIndex, this.isSubColumn ? parent.columnConfig : null);
  }
};
