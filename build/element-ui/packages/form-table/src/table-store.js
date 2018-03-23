import Vue from 'vue';
import debounce from 'throttle-debounce/debounce';
import merge from 'element-ui/src/utils/merge';
import { orderBy, getColumnById, getRowIdentity } from './util';

const sortData = (data, states) => {
  const sortingColumn = states.sortingColumn;
  if (!sortingColumn || typeof sortingColumn.sortable === 'string') {
    return data;
  }
  return orderBy(data, states.sortProp, states.sortOrder, sortingColumn.sortMethod, sortingColumn.sortBy);
};

const getKeysMap = function(array, rowKey) {
  const arrayMap = {};
  (array || []).forEach((row, index) => {
    arrayMap[getRowIdentity(row, rowKey)] = { row, index };
  });
  return arrayMap;
};

const toggleRowSelection = function(states, row, selected) {
  let changed = false;
  const selection = states.selection;
  const index = selection.indexOf(row);
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

const toggleRowExpansion = function(states, row, expanded) {
  let changed = false;
  const expandRows = states.expandRows;
  if (typeof expanded !== 'undefined') {
    const index = expandRows.indexOf(row);
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
    const index = expandRows.indexOf(row);
    if (index === -1) {
      expandRows.push(row);
      changed = true;
    } else {
      expandRows.splice(index, 1);
      changed = true;
    }
  }

  return changed;
};

/* ext-> 比值样式计算
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
const compareChgStyl = function(table, states) {

  if (!Array.isArray(table.compareStyl) || !Array.isArray(table.data)) return;
  let data = table.data; // 表数据
  let compareMap = states.compareMap;

  function setCustomStyle(row, rowIndex, cp, styl, force) {
    let fields = cp.stylefields || cp.fields;
    fields.forEach((f) => {
      for (let prop in row) {
        if (row.hasOwnProperty && row.hasOwnProperty(prop) && prop === f ||
          typeof row[prop] !== 'undefined') {
          let st = compareMap['row' + rowIndex + f] || {};
          for (let p in styl) {
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
  // ext-> 设定表格样式
  table.compareStyl.forEach((cp)=>{
    for (let i = 0; i < data.length; i++) {
      if (cp.compare.call(null, data[i], cp.fields, i)) {
        setCustomStyle(data[i], i, cp, cp.style, true);
      } else {
        let empty = {};
        for (let p in cp.style) {
          if (cp.style.hasOwnProperty(p)) empty[p] = '';
        }
        setCustomStyle(data[i], i, cp, empty, false);
      }
    }
  });
  // ext-> 渲染样式
  let dom, input, compSty;
  for (let key in states.compareMap) {
    dom = table.$el.querySelector('.' + key);
    if (states.compareMap.hasOwnProperty(key) && dom) {
      compSty = states.compareMap[key];
      for (let p in compSty) {
        if (compSty.hasOwnProperty(p)) dom.parentNode.style[p] = compSty[p];
      }
      if (table.enableInputcolor) {
        input = dom.querySelector('input') || dom.querySelector('textarea');
        if (input) {
          for (let c in compSty) {
            if (compSty.hasOwnProperty(c)) input.style[c] = compSty[c];
          }
        }
      }
    }
  }
};

// ext-> 设置Tab index  Key/Val 值
const setTabindex = function(direction = 'vertical', startindex = 1, orginData = [], colIndexs = []) {

  if (!orginData.length) return [];

  let tabindexMap = JSON.parse(JSON.stringify(orginData));
  let colIdx = [], keyidx, len = tabindexMap.length;
  // default order map
  tabindexMap.forEach((item)=>{
    Object.keys(item).forEach((key)=>{ item[key] = 0; });
  });

  if (direction === 'vertical') {

    for (let i = 1; i < colIndexs.length; i++) {
      if (colIndexs[i]) { colIdx.push(colIndexs[i]); }
    }
    for (let k = 0; k < len; k++) {
      Object.keys(tabindexMap[k]).forEach((key)=>{
        keyidx = colIdx.indexOf(key);
        if (keyidx > -1) {
          tabindexMap[k][key] = len * keyidx + k + startindex;
        }
      });
    }
  }
  return tabindexMap;
};

// ext-> 设置最后一行或全部 Boolean 值映射
const initLastRowBoolMap = function(states, mp, initObj, initValidall) {
  let idx = states.data.length - 1;
  if (states.delStatus) return;
  if (typeof initObj === 'object' && idx > -1) {
    for (let item in initObj) {
      if (initObj.hasOwnProperty(item)) {
        if (initValidall) {
          for (let i = 0; i <= idx; i++) {
            if (/#/g.test(item)) {
              states[mp][item.replace('#', i)] = initObj[item];
            } else {
              states[mp][`row${i + item}`] = initObj[item];
            }
          }
        } else if (/#/g.test(item)) {
          states[mp][item.replace('#', idx)] = initObj[item];
        } else {
          states[mp][`row${idx + item}`] = initObj[item];
        }
      }
    }
  }
};

// 扩展-> 设置单行数据 Boolean 值映射
const setBoolMapData = function(initmap, prop, index, value /* 或 length */) {
  if (!isNaN(index) && typeof prop === 'string') {
    if (/#/g.test(prop)) {
      initmap[prop.replace('#', index)] = value;
    } else {
      initmap[`row${index + prop}`] = value;
    }
  } else if (!isNaN(index) && prop !== null && typeof prop === 'object') {
    let len = value && !isNaN(value) ? value : 1;
    for (let i = index; i > index - len; i--) {
      for (let item in prop) {
        if (prop.hasOwnProperty(item)) {
          if (/#/g.test(item)) {
            // 禁用的key格式： disabled#editabled
            initmap[item.replace('#', i)] = prop[item];
          } else {
            // 验证的Key格式： row#property
            initmap[`row ${i + item}`] = prop[item];
          }
        }
      }
    }
  }
};

const TableStore = function(table, initialState = {}) {
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
    _tabidxs: [], // ext-> Tab index 映射
    propertys: [], // ext-> 属性映射
    direction: 'vertical', // ext-> tab
    colIndexOrder: [], // ext-> tab
    errCount: {}, // ext-> 错误总数统计 {row0col:true}
    disabledMap: {}, // ext-> 单元格内容禁用控制映射
    disableField: { // ext-> 是否使用禁用字段
      field: 'disabled', // ext-> 禁用字段名称
      trueVal: '1',
      falseVal: '0'
    },
    validateMap: {}, // ext-> 验证控制映射
    delRowCount: 0, // ext-> 删除行数
    _initialData: [], // ext-> 锁定初始化数据
    modifiedMap: {}, // ext-> 数据修改比对映射，数据格式：{ row: {background: 'green' },  col: {background: 'red' } }
    compareMap: {} // ext-> 比较值样式映射
  };

  for (let prop in initialState) {
    if (initialState.hasOwnProperty(prop) && this.states.hasOwnProperty(prop)) {
      this.states[prop] = initialState[prop];
    }
  }
};

TableStore.prototype.mutations = {
  setData(states, data) {
    const dataInstanceChanged = states._data !== data;
    states._data = data;

    Object.keys(states.filters).forEach((columnId) => {
      const values = states.filters[columnId];
      if (!values || values.length === 0) return;
      const column = getColumnById(this.states, columnId);
      if (column && column.filterMethod) {
        data = data.filter((row) => {
          return values.some(value => column.filterMethod.call(null, value, row, column));
        });
      }
    });

    states.filteredData = data;
    states.data = sortData((data || []), states);

    this.updateCurrentRow();

    if (!states.reserveSelection) {
      if (dataInstanceChanged) {
        this.clearSelection();
      } else {
        this.cleanSelection();
      }
      this.updateAllSelected();
    } else {
      const rowKey = states.rowKey;
      if (rowKey) {
        const selection = states.selection;
        const selectedMap = getKeysMap(selection, rowKey);

        states.data.forEach((row) => {
          const rowId = getRowIdentity(row, rowKey);
          const rowInfo = selectedMap[rowId];
          if (rowInfo) {
            selection[rowInfo.index] = row;
          }
        });

        this.updateAllSelected();
      } else {
        console.warn('WARN: rowKey is required when reserve-selection is enabled.');
      }
    }

    const defaultExpandAll = states.defaultExpandAll;
    if (defaultExpandAll) {
      this.states.expandRows = (states.data || []).slice(0);
    }

    Vue.nextTick(() => this.table.updateScrollY());
  },

  changeSortCondition(states, options) {
    states.data = sortData((states.filteredData || states._data || []), states);

    if (!options || !options.silent) {
      this.table.$emit('sort-change', {
        column: this.states.sortingColumn,
        prop: this.states.sortProp,
        order: this.states.sortOrder
      });
    }

    Vue.nextTick(() => this.table.updateScrollY());
  },

  filterChange(states, options) {
    let { column, values, silent } = options;
    if (values && !Array.isArray(values)) {
      values = [values];
    }

    const prop = column.property;
    const filters = {};

    if (prop) {
      states.filters[column.id] = values;
      filters[column.columnKey || column.id] = values;
    }

    let data = states._data;

    Object.keys(states.filters).forEach((columnId) => {
      const values = states.filters[columnId];
      if (!values || values.length === 0) return;
      const column = getColumnById(this.states, columnId);
      if (column && column.filterMethod) {
        data = data.filter((row) => {
          return values.some(value => column.filterMethod.call(null, value, row, column));
        });
      }
    });

    states.filteredData = data;
    states.data = sortData(data, states);

    if (!silent) {
      this.table.$emit('filter-change', filters);
    }

    Vue.nextTick(() => this.table.updateScrollY());
  },

  insertColumn(states, column, index, parent) {
    let array = states._columns;
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

  removeColumn(states, column, parent) {
    let array = states._columns;
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

  setHoverRow(states, row) {
    states.hoverRow = row;
  },

  setCurrentRow(states, row) {
    const oldCurrentRow = states.currentRow;
    states.currentRow = row;

    if (oldCurrentRow !== row) {
      this.table.$emit('current-change', row, oldCurrentRow);
    }
  },

  rowSelectedChanged(states, row) {
    const changed = toggleRowSelection(states, row);
    const selection = states.selection;

    if (changed) {
      const table = this.table;
      table.$emit('selection-change', selection ? selection.slice() : []);
      table.$emit('select', selection, row);
    }

    this.updateAllSelected();
  },

  toggleAllSelection: debounce(10, function(states) {
    const data = states.data || [];
    if (data.length === 0) return;
    const selection = this.states.selection;
    // when only some rows are selected (but not all), select or deselect all of them
    // depending on the value of selectOnIndeterminate
    const value = states.selectOnIndeterminate
      ? !states.isAllSelected
      : !(states.isAllSelected || selection.length);
    let selectionChanged = false;

    data.forEach((item, index) => {
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

    const table = this.table;
    if (selectionChanged) {
      table.$emit('selection-change', selection ? selection.slice() : []);
    }
    table.$emit('select-all', selection);
    states.isAllSelected = value;
  }),

  //  ext-> 验证添加，供外部使用
  disValidateSet(states, prop, index, value) {
    // prop 参数可以是 {aa:true, bb:false} 这样的对象 或 字段名称
    setBoolMapData(states.validateMap, prop, index, value);
  },

  //  ext-> 禁用添加，供外部使用
  disInputSet(states, prop, index, value) {
    // prop 参数可以是 {aa:true, bb:false} 这样的对象 或 字段名称
    setBoolMapData(states.disabledMap, prop, index, value);
  },

  // ext-> 删除row验证和禁用状态，供外部使用
  delRowStatus(states, index) {
    let propertys = states.propertys;
    let rows = Array.isArray(index) ? index : [index];
    states.delStatus = true;
    function delStatus(index) {
      propertys.forEach(field => {
        // 删除禁用template状态
        if (typeof states.disabledMap[`disabled${index}${field}`] === 'boolean') {
          delete states.disabledMap[`disabled${index}${field}`];
        }
        // 删除禁用row状态
        if (typeof states.disabledMap[`row${index}${field}`] === 'boolean') {
          delete states.disabledMap[`row${index}${field}`];
        }
        // 删除验证状态
        if (typeof states.validateMap[`row${index}${field}`] === 'boolean') {
          delete states.validateMap[`row${index}${field}`];
        }
      });
    }

    // ext-> 重置序列
    function delOrder() {
      let idxs = [], rp, disabledMap = {}, validateMap = {};
      let re1 = /^(disabled|row)/g;
      let re2 = /[a-zA-Z]\w*/g;
      let regx = /^(disabled|row)\d+[a-zA-Z]\w*/g;

      // ext-> 添加序号
      function addIdxs(delmap) {
        for (let p in delmap) {
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
      // ext-> 序化重置状态
      for (let i = 0; i < idxs.length; i++) {
        propertys.forEach(field => {
          if (typeof states.disabledMap[`disabled${idxs[i]}${field}`] === 'boolean') {
            disabledMap[`disabled${i}${field}`] = states.disabledMap[`disabled${idxs[i]}${field}`];
          }
          if (typeof states.disabledMap[`row${idxs[i]}${field}`] === 'boolean') {
            disabledMap[`row${i}${field}`] = states.disabledMap[`row${idxs[i]}${field}`];
          }
          if (typeof states.validateMap[`row${idxs[i]}${field}`] === 'boolean') {
            validateMap[`row${i}${field}`] = states.validateMap[`row${idxs[i]}${field}`];
          }
        });
      }
      states.disabledMap = disabledMap;
      states.validateMap = validateMap;
    }

    for (let i = 0; i < rows.length; i++) {
      if (rows[i] != null && !isNaN(rows[i])) {
        delStatus(rows[i]);
      } if (rows[i] && typeof rows[i] === 'object') {
        delStatus(states.data.indexOf(rows[i]));
      }
    }
    delOrder();
  },

  //  ext-> 更新比较样式
  updateCompare(states) {
    if (Array.isArray(this.table.compareStyl)) {
      compareChgStyl.call(this, this.table, states);
    }
  },

  //  ext-> 数据比较映射删除处理
  compareDel(states, rowIndex) {

    if (!isNaN(rowIndex)) {
      if (rowIndex < states._initialData.length) {
        let k, x, n, key1, key2, item, modifiedMap = {}, compareMap = {};
        let reg = new RegExp(`row${rowIndex}[a-z]+[a-z0-9_]*$`, 'ig');
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
          if (n < rowIndex && typeof item === 'object') {
            for (key1 in item) {
              if (item.hasOwnProperty(key1)) {
                compareMap[`row${n}${key1}`] = states.compareMap[`row${n}${key1}`];
                modifiedMap[`row${n}${key1}`] = states.modifiedMap[`row${n}${key1}`];
              }
            }
          // 处理删除元素后部分
          } else if (n > rowIndex && typeof item === 'object') {

            for (key2 in item) {
              if (item.hasOwnProperty(key2)) {
                compareMap[`row${n - 1}${key2}`] = states.compareMap[`row${n}${key2}`];
                modifiedMap[`row${n - 1}${key2}`] = states.modifiedMap[`row${n}${key2}`];
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

  // ext-> 数据修改比较
  modifiedCompare(states) {
    let row, itemStyl, table = this.table;
    // 比较对象是否相等
    function isEqualObj(item$1, item$2) {

      function equalObj(item1, item2) {
        for (let p in item1) {
          if (item1.hasOwnProperty(p) && item1[p] !== item2[p]) {
            return false;
          }
        }
        return true;
      }

      if (Array.isArray(item$1) === Array.isArray(item$2)) {
        if (item$1.length === item$2.length) {
          for (let k = 0; k < item$1.length; k++) {
            if (item$1[k] !== item$2[k]) return false;
          }
          return true; // 相等
        }
        return false;
      } else if (typeof item$1 === 'object' && typeof item$2 === 'object') {
        if (equalObj(item$1, item$2) && equalObj(item$2, item$1)) {
          return true;
        }
        return false;
      }
      return false;
    }
    // 合并样式
    function mergeStyl(origin, cover) {
      if (typeof origin['col'] === 'object' && typeof cover === 'object') {
        for (let k in cover) {
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
      for (let rowindex = 0; rowindex < states._initialData.length; rowindex++) {
        row = states._initialData[rowindex];
        for (let prop in row) {
          if (row.hasOwnProperty(prop)) {
            if (typeof row[prop] !== 'object') {
              itemStyl = table.modifiedStyl.call(null, row[prop] !== states.data[rowindex][prop], states.data[rowindex], prop, rowindex, states.delRowCount);
              states.modifiedMap['row' + rowindex + prop] = mergeStyl(itemStyl, states.compareMap['row' + rowindex + prop]);
            } else if (typeof row[prop] === 'object' && row[prop] != null) {
              itemStyl = table.modifiedStyl.call(null, !isEqualObj(states.data[rowindex][prop], row[prop]), states.data[rowindex], prop, rowindex, states.delRowCount);
              states.modifiedMap['row' + rowindex + prop] = mergeStyl(itemStyl, states.compareMap['row' + rowindex + prop]);
            }
          }
        }
      }
      // 渲染样式
      let dom, rowStyl, colStyl, rowSet = {}, rowIdx;
      for (let key in states.modifiedMap) {
        dom = table.$el.querySelector('.' + key);

        if (states.modifiedMap.hasOwnProperty(key) && dom) {

          rowStyl = states.modifiedMap[key]['row'] || {};
          colStyl = states.modifiedMap[key]['col'] || {};
          for (let p in colStyl) {
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

  // ext-> 锁定初始数据用于判定是否为修改
  lockData(states) {
    states.modifiedMap = {};
    if (states.data) {
      states._initialData = JSON.parse(JSON.stringify(states.data));
    }
  },
  // ext-> 删除已选择项
  deleteSelection(states) {
    let store = this.table.store;
    let index, data = states.data || [];
    (states.selection || []).forEach(function(row) {
      index = data.indexOf(row);
      if (index !== -1) {
        data.splice(index, 1);
        store.commit('delRowStatus', index);
        store.commit('compareDel', index);
      }
    });
  },
  // ext-> 删除一行数据
  deleteRow(states, row) {
    let store = this.table.store;
    let index = states.data.indexOf(row);
    if (index !== -1) {
      states.data.splice(index, 1);
      store.updateTabindex(store.table.startTabindex);
      store.commit('delRowStatus', index);
      store.commit('compareDel', index);
    }
  },
  // ext-> 添加一行数据
  addNewRow(states, row) {
    states.data.push(row);
  },
  // ext-> 设置错误计算记录
  setErrCount(states, field) {
    states.errCount[field] = true;
  },
  // ext-> 删除错误计算记录
  disErrCount(states, field) {
    states.errCount[field] = false;
  },
  // ext-> 清空错误计算记录
  clearErrCount(states) {
    states.errCount = {};
  }
};

const doFlattenColumns = (columns) => {
  const result = [];
  columns.forEach((column) => {
    if (column.children) {
      result.push.apply(result, doFlattenColumns(column.children));
    } else {
      result.push(column);
    }
  });
  return result;
};

// ext-> 计算错误统计
TableStore.prototype.getErrCount = function(states) {
  let c = 0;
  for (let i in states.errCount) {
    if (states.errCount[i]) c++;
  }
  return c;
};

// ext-> 设置列Tab index 的值
TableStore.prototype.setColIndexOrder = function(index, columnName) {
  if (index && columnName) this.states.colIndexOrder[index] = columnName;
};

// ext-> 更新Tab index 的值
TableStore.prototype.updateTabindex = function(startindex, direction) {
  startindex = startindex || 1;
  direction = direction || this.states.direction;
  this.states._tabidxs = setTabindex(direction, startindex, this.states.data, this.states.colIndexOrder);
};

// ext-> 获取验证状态
TableStore.prototype.getValidateField = function(prop) {
  if (typeof this.states.validateMap[prop] !== 'undefined') {
    return Boolean(this.states.validateMap[prop]);
  }
  return false;
};

// ext-> 初始化最后字段验证
TableStore.prototype.initLastValidateFields = function(initValidall) {
  initLastRowBoolMap(this.states, 'validateMap', this.table.initValidfields, initValidall);
};

// ext-> 初始化最后一行禁用字段
TableStore.prototype.initLastRowDisFields = function(initValidall) {
  initLastRowBoolMap(this.states, 'disabledMap', this.table.initDisfields, initValidall);
};

TableStore.prototype.updateColumns = function() {
  const states = this.states;
  const _columns = states._columns || [];
  states.fixedColumns = _columns.filter((column) => column.fixed === true || column.fixed === 'left');
  states.rightFixedColumns = _columns.filter((column) => column.fixed === 'right');

  if (states.fixedColumns.length > 0 && _columns[0] && _columns[0].type === 'selection' && !_columns[0].fixed) {
    _columns[0].fixed = true;
    states.fixedColumns.unshift(_columns[0]);
  }

  const notFixedColumns = _columns.filter(column => !column.fixed);
  states.originColumns = [].concat(states.fixedColumns).concat(notFixedColumns).concat(states.rightFixedColumns);

  const leafColumns = doFlattenColumns(notFixedColumns);
  const fixedLeafColumns = doFlattenColumns(states.fixedColumns);
  const rightFixedLeafColumns = doFlattenColumns(states.rightFixedColumns);

  states.leafColumnsLength = leafColumns.length;
  states.fixedLeafColumnsLength = fixedLeafColumns.length;
  states.rightFixedLeafColumnsLength = rightFixedLeafColumns.length;

  states.columns = [].concat(fixedLeafColumns).concat(leafColumns).concat(rightFixedLeafColumns);
  states.isComplex = states.fixedColumns.length > 0 || states.rightFixedColumns.length > 0;
};

TableStore.prototype.isSelected = function(row) {
  return (this.states.selection || []).indexOf(row) > -1;
};

TableStore.prototype.clearSelection = function() {
  const states = this.states;
  states.isAllSelected = false;
  const oldSelection = states.selection;
  if (states.selection.length) {
    states.selection = [];
  }
  if (oldSelection.length > 0) {
    this.table.$emit('selection-change', states.selection ? states.selection.slice() : []);
  }
};

TableStore.prototype.setExpandRowKeys = function(rowKeys) {
  const expandRows = [];
  const data = this.states.data;
  const rowKey = this.states.rowKey;
  if (!rowKey) throw new Error('[Table] prop row-key should not be empty.');
  const keysMap = getKeysMap(data, rowKey);
  rowKeys.forEach((key) => {
    const info = keysMap[key];
    if (info) {
      expandRows.push(info.row);
    }
  });

  this.states.expandRows = expandRows;
};

TableStore.prototype.toggleRowSelection = function(row, selected) {
  const changed = toggleRowSelection(this.states, row, selected);
  if (changed) {
    this.table.$emit('selection-change', this.states.selection ? this.states.selection.slice() : []);
  }
};

TableStore.prototype.toggleRowExpansion = function(row, expanded) {

  function expandRow(sto) { // ext-> modify
    const changed = toggleRowExpansion(sto.states, row, expanded);
    if (changed) {
      sto.table.$emit('expand-change', row, sto.states.expandRows);
      sto.scheduleLayout();
    }
  }

  // ext-> 操作前调用
  if (typeof this.table.beforeExpand === 'function') {
    if (this.table.beforeExpand.call(
      null,
      row, // 当前操作行
      this.states.expandRows, // 已展开行集合
      this.states.expandRows.indexOf(row) > -1 // 是否已经展开
    )) {
      expandRow(this);
    }
  } else {
    expandRow(this);
  }
};

// ext-> 打开一个，其余全部关闭
TableStore.prototype.toggleOnlyOneExpand = function(row) {

  function expandOneRow(sto) {
    if (sto.states.expandRows.indexOf(row) < 0) {
      sto.states.expandRows = [];
      sto.states.expandRows.push(row);
      sto.table.$emit('expand-one-chgd', row);
    } else {
      sto.states.expandRows = [];
      sto.table.$emit('expand-one-chgd', row);
    }
  }
  // ext-> 操作前调用
  if (typeof this.table.beforeExpand === 'function') {
    if (this.table.beforeExpand.call(
      null,
      row, // 当前操作行
      this.states.expandRows, // 已展开行集合
      this.states.expandRows.indexOf(row) > -1 // 是否已经展开
    )) {
      expandOneRow(this);
    }
  } else {
    expandOneRow(this);
  }
};

TableStore.prototype.isRowExpanded = function(row) {
  const { expandRows = [], rowKey } = this.states;
  if (rowKey) {
    const expandMap = getKeysMap(expandRows, rowKey);
    return !!expandMap[getRowIdentity(row, rowKey)];
  }
  return expandRows.indexOf(row) !== -1;
};

TableStore.prototype.cleanSelection = function() {
  const selection = this.states.selection || [];
  const data = this.states.data;
  const rowKey = this.states.rowKey;
  let deleted;
  if (rowKey) {
    deleted = [];
    const selectedMap = getKeysMap(selection, rowKey);
    const dataMap = getKeysMap(data, rowKey);
    for (let key in selectedMap) {
      if (selectedMap.hasOwnProperty(key) && !dataMap[key]) {
        deleted.push(selectedMap[key].row);
      }
    }
  } else {
    deleted = selection.filter((item) => {
      return data.indexOf(item) === -1;
    });
  }

  deleted.forEach((deletedItem) => {
    selection.splice(selection.indexOf(deletedItem), 1);
  });

  if (deleted.length) {
    this.table.$emit('selection-change', selection ? selection.slice() : []);
  }
};

TableStore.prototype.clearFilter = function() {
  const states = this.states;
  const { tableHeader, fixedTableHeader, rightFixedTableHeader } = this.table.$refs;
  let panels = {};

  if (tableHeader) panels = merge(panels, tableHeader.filterPanels);
  if (fixedTableHeader) panels = merge(panels, fixedTableHeader.filterPanels);
  if (rightFixedTableHeader) panels = merge(panels, rightFixedTableHeader.filterPanels);

  const keys = Object.keys(panels);
  if (!keys.length) return;

  keys.forEach(key => {
    panels[key].filteredValue = [];
  });

  states.filters = {};

  this.commit('filterChange', {
    column: {},
    values: [],
    silent: true
  });
};

TableStore.prototype.clearSort = function() {
  const states = this.states;
  if (!states.sortingColumn) return;
  states.sortingColumn.order = null;
  states.sortProp = null;
  states.sortOrder = null;

  this.commit('changeSortCondition', {
    silent: true
  });
};

TableStore.prototype.updateAllSelected = function() {
  const states = this.states;
  const { selection, rowKey, selectable, data } = states;
  if (!data || data.length === 0) {
    states.isAllSelected = false;
    return;
  }

  let selectedMap;
  if (rowKey) {
    selectedMap = getKeysMap(states.selection, rowKey);
  }

  const isSelected = function(row) {
    if (selectedMap) {
      return !!selectedMap[getRowIdentity(row, rowKey)];
    } else {
      return selection.indexOf(row) !== -1;
    }
  };

  let isAllSelected = true;
  let selectedCount = 0;
  for (let i = 0, j = data.length; i < j; i++) {
    const item = data[i];
    const isRowSelectable = selectable && selectable.call(null, item, i);
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

TableStore.prototype.scheduleLayout = function(updateColumns) {
  if (updateColumns) {
    this.updateColumns();
  }
  this.table.debouncedUpdateLayout();
};

TableStore.prototype.setCurrentRowKey = function(key) {
  const states = this.states;
  const rowKey = states.rowKey;
  if (!rowKey) throw new Error('[Table] row-key should not be empty.');
  const data = states.data || [];
  const keysMap = getKeysMap(data, rowKey);
  const info = keysMap[key];
  if (info) {
    states.currentRow = info.row;
  }
};

TableStore.prototype.updateCurrentRow = function() {
  const states = this.states;
  const table = this.table;
  const data = states.data || [];
  const oldCurrentRow = states.currentRow;

  if (data.indexOf(oldCurrentRow) === -1) {
    states.currentRow = null;

    if (states.currentRow !== oldCurrentRow) {
      table.$emit('current-change', null, oldCurrentRow);
    }
  }
};

TableStore.prototype.commit = function(name, ...args) {
  const mutations = this.mutations;
  if (mutations[name]) {
    mutations[name].apply(this, [this.states].concat(args));
  } else {
    throw new Error(`Action not found: ${name}`);
  }
};

export default TableStore;
