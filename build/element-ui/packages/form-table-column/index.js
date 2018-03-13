import ElFormTableColumn from '../form-table/src/table-column';

/* istanbul ignore next */
ElFormTableColumn.install = function(Vue) {
  Vue.component(ElFormTableColumn.name, ElFormTableColumn);
};

export default ElFormTableColumn;
